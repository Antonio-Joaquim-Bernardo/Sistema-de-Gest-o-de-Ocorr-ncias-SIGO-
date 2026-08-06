// services/EmailService.ts
import * as brevo from "@sendinblue/client";

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY || ""
);

export default class EmailService {
  static async enviarCodigoVerificacao(
    email: string,
    nome: string,
    codigo: string
  ) {
    if (!process.env.BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY não configurada.");
    }

    const html = `
      <h1>Bem-vindo(a) ao SIGO, ${nome}!</h1>
      <p>Para confirmar a sua conta, utilize o código abaixo:</p>
      <h2 style="color: #2563eb; font-size: 32px; letter-spacing: 4px;">${codigo}</h2>
      <p>Este código é válido por <strong>15 minutos</strong>.</p>
      <p>Se não solicitou este registo, ignore este email.</p>
      <hr />
      <p style="font-size: 12px; color: #666;">SIGO - Sistema Integrado de Gestão de Ocorrências</p>
    `;

    try {
      const sendSmtpEmail = new brevo.SendSmtpEmail();
      sendSmtpEmail.subject = "Confirme sua conta - SIGO";
      sendSmtpEmail.htmlContent = html;
      sendSmtpEmail.sender = {
        name: "SIGO",
        email: process.env.SMTP_FROM || "nao-responder@sigo.ao",
      };
      sendSmtpEmail.to = [{ email }];

      const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
      
      // A resposta está em result.body.messageId
      console.log("✅ Email enviado com sucesso. ID:", result.body?.messageId || "ID não disponível");
      return true;
    } catch (error) {
      console.error("Erro ao enviar email via API:", error);
      throw new Error("Falha ao enviar email de verificação.");
    }
  }
}