// teste-email.js
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testarEmail() {
  console.log('🔍 SMTP_HOST:', process.env.SMTP_HOST);
  console.log('🔍 SMTP_USER:', process.env.SMTP_USER);
  console.log('🔍 SMTP_PASS:', process.env.SMTP_PASS ? '****** (definido)' : 'NÃO DEFINIDO');

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'nao-responder@sigo.ao',
      to: 'antoniojoaquimbernardo2005@gmail.com',
      subject: 'Teste SIGO - SMTP Brevo',
      text: 'Se recebeste este email, a configuração está correta! 🎉',
    });
    console.log('✅ Email enviado! ID:', info.messageId);
  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.error('Detalhes:', error);
  }
}

testarEmail();