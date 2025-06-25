
import { useEffect, useState } from 'react';

export default function WhatsAppAutoConnect() {
  const [status, setStatus] = useState('⏳ Подключение к WhatsApp...');
  const [qrCode, setQrCode] = useState<string | null>(null);

  const pollConnection = async () => {
    try {
      const res = await fetch('/qr');
      const data = await res.json();

      if (data.qr) {
        setQrCode(data.qr);
        setStatus('📲 Пожалуйста, отсканируйте QR-код в WhatsApp');
      } else if (data.status === 'connected') {
        setQrCode(null);
        setStatus('✅ Ваш номер успешно подключен к авторассылке');
      } else {
        setStatus('⏳ Ожидание QR-кода...');
      }
    } catch (err) {
      setStatus('❌ Ошибка подключения. Попробуйте позже.');
    }
  };

  useEffect(() => {
    pollConnection();
    const interval = setInterval(pollConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>{status}</h2>
      {qrCode && (
        <img
          src={qrCode}
          alt="QR-код WhatsApp"
          style={{ marginTop: '20px', width: '300px' }}
        />
      )}
    </div>
  );
}
