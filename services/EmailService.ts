import nodemailer from "nodemailer";

// Configuração do transportador (exemplo com Gmail)
// Recomendo usar variáveis de ambiente para credenciais
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true para 465, false para outras portas
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default class EmailService {
  static async enviarCodigoVerificacao(
    email: string,
    nome: string,
    codigo: string
  ) {
    const html = `
      <h1>Bem-vindo(a) ao SIGO, ${nome}!</h1>
      <p>Para confirmar a sua conta, utilize o código abaixo:</p>
      <h2 style="color: #2563eb; font-size: 32px;">${codigo}</h2>
      <p>Este código é válido por <strong>15 minutos</strong>.</p>
      <p>Se não solicitou este registo, ignore este email.</p>
      <hr />
      <p style="font-size: 12px; color: #666;">SIGO - Sistema Integrado de Gestão de Ocorrências</p>
    `;

    const texto = `Bem-vindo ao SIGO, ${nome}! Seu código de verificação é: ${codigo}. Válido por 15 minutos.`;

    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || "nao-responder@sigo.ao",
        to: email,
        subject: "Confirme sua conta - SIGO",
        text: texto,
        html: html,
      });
      return true;
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      throw new Error("Falha ao enviar email de verificação.");
    }
  }
}