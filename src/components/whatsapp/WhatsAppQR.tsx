
import { useEffect } from 'react';

const WhatsAppQR = () => {
  useEffect(() => {
    // Загружаем библиотеку QRCode
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Функция для получения QR-кода
      const fetchQR = async () => {
        try {
          const res = await fetch('http://localhost:3000/qr');
          const data = await res.json();
          const qrcodeDiv = document.getElementById('qrcode');
          const statusDiv = document.getElementById('status');
          
          if (data.qr && qrcodeDiv && statusDiv) {
            statusDiv.innerText = '';
            qrcodeDiv.innerHTML = '';
            
            // Создаем canvas для QR-кода
            const canvas = document.createElement('canvas');
            qrcodeDiv.appendChild(canvas);
            
            // Генерируем QR-код с помощью библиотеки
            (window as any).QRCode.toCanvas(canvas, data.qr, { width: 256 }, function (error: any) {
              if (error) console.error(error);
            });
          } else {
            if (statusDiv) statusDiv.innerText = 'Ожидание QR-кода...';
            if (qrcodeDiv) qrcodeDiv.innerHTML = '';
          }
        } catch (error) {
          console.error('Ошибка при получении QR-кода:', error);
          const statusDiv = document.getElementById('status');
          if (statusDiv) statusDiv.innerText = 'Ошибка подключения к серверу';
        }
      };

      // Запускаем получение QR-кода
      fetchQR();
      const interval = setInterval(fetchQR, 2000);

      // Очищаем интервал при размонтировании компонента
      return () => {
        clearInterval(interval);
      };
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Сканируйте QR-код для подключения WhatsApp</h2>
      <div id="qrcode" style={{ margin: '20px auto', display: 'flex', justifyContent: 'center' }}></div>
      <div id="status" style={{ marginTop: '20px', fontSize: '16px', color: '#666' }}></div>
    </div>
  );
};

export default WhatsAppQR;
