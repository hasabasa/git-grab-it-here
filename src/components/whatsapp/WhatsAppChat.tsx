
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Phone, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  contact_phone: string
  contact_name?: string
  message_text?: string
  is_outgoing: boolean
  timestamp: string
  delivery_status?: string
}

interface WhatsAppChatProps {
  messages: Message[]
  onSendMessage: (phone: string, message: string) => void
  selectedContact?: { phone: string; name: string }
}

const WhatsAppChat = ({ messages, onSendMessage, selectedContact }: WhatsAppChatProps) => {
  const [messageText, setMessageText] = useState("")
  const [currentPhone, setCurrentPhone] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedContact) {
      setCurrentPhone(selectedContact.phone)
    }
  }, [selectedContact])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!messageText.trim() || !currentPhone.trim()) return

    onSendMessage(currentPhone, messageText)
    setMessageText("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Фильтруем сообщения для текущего контакта
  const filteredMessages = messages.filter(msg => 
    !currentPhone || msg.contact_phone === currentPhone
  )

  return (
    <div className="flex flex-col h-[600px]">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            {selectedContact ? (
              <div className="flex items-center gap-2">
                <span>{selectedContact.name}</span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {selectedContact.phone}
                </span>
              </div>
            ) : (
              "Выберите контакт или введите номер"
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Область сообщений */}
          <ScrollArea className="flex-1 px-4" ref={scrollRef}>
            <div className="space-y-3 py-4">
              {filteredMessages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Нет сообщений</p>
                  <p className="text-sm">Начните переписку, отправив первое сообщение</p>
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.is_outgoing ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-lg px-3 py-2 text-sm",
                        message.is_outgoing
                          ? "bg-green-500 text-white"
                          : "bg-muted"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.message_text}</p>
                      <div className={cn(
                        "text-xs mt-1 flex items-center gap-1",
                        message.is_outgoing ? "text-green-100" : "text-muted-foreground"
                      )}>
                        <span>{formatTime(message.timestamp)}</span>
                        {message.is_outgoing && message.delivery_status && (
                          <span>• {message.delivery_status}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Поле ввода */}
          <div className="border-t p-4 space-y-3">
            {!selectedContact && (
              <Input
                placeholder="Введите номер телефона (+77771234567)"
                value={currentPhone}
                onChange={(e) => setCurrentPhone(e.target.value)}
              />
            )}
            
            <div className="flex gap-2">
              <Input
                placeholder="Введите сообщение..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!messageText.trim() || !currentPhone.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default WhatsAppChat
