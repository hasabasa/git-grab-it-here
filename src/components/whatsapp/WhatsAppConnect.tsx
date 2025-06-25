
import { useEffect, useState } from 'react';

export default function WhatsAppConnect() {
  const [qrCode, setQrCode] = useState(null);
  const [status, setStatus] = useState('⏳ Проверка статуса...');

  const fetchQR = async () => {
    try {
      const res = await fetch('http://localhost:3000/qr');
      const data = await res.json();

      if (data.qr) {
        setQrCode(data.qr);
        setStatus('📲 Сканируйте QR-код через WhatsApp');
      } else if (data.status === 'connected') {
        setQrCode(null);
        setStatus('✅ WhatsApp подключен');
      } else {
        setStatus('⏳ Ожидание QR-кода...');
      }
    } catch (err) {
      setStatus('❌ Ошибка подключения к серверу');
    }
  };

  useEffect(() => {
    fetchQR();
    const interval = setInterval(fetchQR, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Подключение WhatsApp</h2>
      <p>{status}</p>
      {qrCode && <img src={qrCode} alt="QR-код для подключения" />}
    </div>
  );
}
