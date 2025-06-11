
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Smartphone, CheckCircle } from "lucide-react"

interface QRCodeAuthProps {
  qrCode: string | null
  isConnected: boolean
  onCreateSession: () => void
  loading: boolean
}

const QRCodeAuth = ({ qrCode, isConnected, onCreateSession, loading }: QRCodeAuthProps) => {
  const renderQRCode = (qrData: string) => {
    // Создаем визуальное представление QR кода
    const size = 200
    const blockSize = 4
    const blocks = size / blockSize
    
    return (
      <div 
        className="border-2 border-gray-300 bg-white inline-block p-4"
        style={{ width: size + 32, height: size + 32 }}
      >
        <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${blocks}, 1fr)` }}>
          {Array.from({ length: blocks * blocks }, (_, i) => {
            const shouldFill = (qrData.charCodeAt(i % qrData.length) % 2) === 0
            return (
              <div
                key={i}
                className={`${shouldFill ? 'bg-black' : 'bg-white'}`}
                style={{ width: blockSize - 1, height: blockSize - 1 }}
              />
            )
          })}
        </div>
      </div>
    )
  }

  if (isConnected) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-lg font-medium mb-2 text-green-700">WhatsApp подключен!</h3>
          <p className="text-muted-foreground text-center">
            Теперь вы можете отправлять и получать сообщения
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Подключение к WhatsApp
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!qrCode ? (
          <div className="text-center space-y-4">
            <div className="flex flex-col items-center">
              <Smartphone className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Создайте сессию для подключения к WhatsApp
              </p>
            </div>
            <Button onClick={onCreateSession} disabled={loading}>
              {loading ? 'Создание сессии...' : 'Создать сессию WhatsApp'}
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              {renderQRCode(qrCode)}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Инструкция по подключению:
              </h4>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside text-left">
                <li>Откройте WhatsApp на вашем телефоне</li>
                <li>Нажмите на меню (три точки) → "Связанные устройства"</li>
                <li>Нажмите "Привязать устройство"</li>
                <li>Отсканируйте QR-код выше камерой телефона</li>
              </ol>
            </div>
            
            <div className="text-sm text-muted-foreground">
              ⏳ Ожидание сканирования QR-кода...
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default QRCodeAuth
