
export async function sendWhatsAppMessage(phone: string, message: string) {
  try {
    const res = await fetch('http://localhost:3000/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, message }),
    });

    const data = await res.json();
    if (data.status === 'ok') {
      console.log('✅ Сообщение отправлено');
    } else {
      console.warn('❌ Ошибка при отправке:', data.error);
    }
  } catch (err) {
    console.error('❌ Ошибка сети:', err);
  }
}
