
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface WhatsAppSession {
  id: string
  session_name: string
  qr_code?: string
  is_connected: boolean
  last_activity?: string
}

interface WhatsAppMessage {
  id: string
  session_id: string
  contact_phone: string
  contact_name?: string
  message_text?: string
  message_type: string
  is_outgoing: boolean
  timestamp: string
  delivery_status?: string
}

export const useWhatsAppConnection = () => {
  const [session, setSession] = useState<WhatsAppSession | null>(null)
  const [messages, setMessages] = useState<WhatsAppMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)

  const createSession = async () => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase.functions.invoke('whatsapp-bot', {
        body: { action: 'create_session' }
      })

      if (error) throw error

      setSession({
        id: data.session_id,
        session_name: `Session ${new Date().toLocaleString()}`,
        qr_code: data.qr_code,
        is_connected: false
      })
      
      setQrCode(data.qr_code)
      toast.success('Сессия WhatsApp создана')
      
      // Симулируем подключение через 10 секунд
      setTimeout(() => {
        setSession(prev => prev ? { ...prev, is_connected: true } : null)
        setQrCode(null)
        toast.success('WhatsApp подключен!')
      }, 10000)
      
    } catch (error: any) {
      toast.error(`Ошибка создания сессии: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (phone: string, message: string) => {
    if (!session?.id) {
      toast.error('Нет активной сессии WhatsApp')
      return
    }

    try {
      const { data, error } = await supabase.functions.invoke('whatsapp-bot', {
        body: {
          action: 'send_message',
          session_id: session.id,
          phone,
          message
        }
      })

      if (error) throw error

      // Добавляем сообщение в локальный стейт
      const newMessage: WhatsAppMessage = {
        id: data.message_id,
        session_id: session.id,
        contact_phone: phone,
        message_text: message,
        message_type: 'text',
        is_outgoing: true,
        timestamp: new Date().toISOString(),
        delivery_status: 'sent'
      }

      setMessages(prev => [...prev, newMessage])
      toast.success('Сообщение отправлено')

    } catch (error: any) {
      toast.error(`Ошибка отправки: ${error.message}`)
    }
  }

  const loadMessages = async () => {
    if (!session?.id) return

    try {
      const { data, error } = await supabase.functions.invoke('whatsapp-bot', {
        body: { action: 'get_messages', session_id: session.id }
      })

      if (error) throw error
      setMessages(data.messages || [])

    } catch (error: any) {
      console.error('Ошибка загрузки сообщений:', error.message)
    }
  }

  useEffect(() => {
    if (session?.is_connected) {
      loadMessages()
    }
  }, [session?.is_connected])

  return {
    session,
    messages,
    loading,
    qrCode,
    createSession,
    sendMessage,
    loadMessages
  }
}
