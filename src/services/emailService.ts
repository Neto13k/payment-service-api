import nodemailer from "nodemailer";
import { IEmailPayload } from "../types";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendMail({ to, subject, text, html }: IEmailPayload): Promise<void> {
try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM, // Remetente
      to,                                                // Destinatário
      subject,                                           // Assunto
      text,                                              // Corpo em texto plano
      html,                                              // Corpo em HTML (opcional)
    });

    console.log('E-mail enviado com sucesso! ID da mensagem:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
}

async function sendWelcomeEmail(customerName: string, customerEmail: string): Promise<void> {
    try {
        await sendMail({
            to: customerEmail,
            subject: 'Bem-vindo!',
            text: `Olá ${customerName}, é um prazer ter você conosco. Acesse o sistema de pagamentos para começar.`,
            html: `<h1>Olá ${customerName}!</h1><p>é um prazer ter você conosco. Acesse o sistema de pagamentos para começar.</p>`
        });
    } catch (error) {
        console.error('Erro ao enviar e-mail de boas-vindas:', error);
    }
}


async function sendUpdateEmail(customerName: string, customerEmail: string): Promise<void> {
    try {
        await sendMail({
            to: customerEmail,
            subject: 'Atualização de Dados',
            text: `Olá ${customerName}, seus dados foram atualizados com sucesso.`,
            html: `<h1>Olá ${customerName}!</h1><p>Seus dados foram atualizados com sucesso.</p>`
        });
    } catch (error) {
        console.error('Erro ao enviar e-mail de atualização:', error);
    }
}

async function sendDeletionEmail(customerName: string, customerEmail: string): Promise<void> {
    try {
        await sendMail({
            to: customerEmail,
            subject: 'Exclusão de Dados',
            text: `Olá ${customerName}, seus dados foram excluídos permanentemente com sucesso.`,
            html: `<h1>Olá ${customerName}!</h1><p>Seus dados foram excluídos permanentemente com sucesso.</p>`
        });
    } catch (error) {
        console.error('Erro ao enviar e-mail de exclusão:', error);
    }
}

export { sendMail, sendWelcomeEmail, sendUpdateEmail, sendDeletionEmail };