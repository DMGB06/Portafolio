import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Tipo para los parámetros del email de contacto
type ContactEmailParams = {
  name: string;
  email: string;
  message: string;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Función para enviar email de contacto
export async function sendContactEmail({
  name,
  email,
  message,
}: ContactEmailParams) {
  // Verificar variables de entorno
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY no está configurada");
  }
  if (!process.env.OWNER_EMAIL_FOR_MESSAGES) {
    throw new Error("OWNER_EMAIL_FOR_MESSAGES no está configurada");
  }

  return await resend.emails.send({
    from: "Portafolio <onboarding@resend.dev>",
    to: process.env.OWNER_EMAIL_FOR_MESSAGES,
    subject: `Nuevo mensaje de ${escapeHtml(name)}`,
    html: `
      <h2>Nuevo mensaje desde tu portafolio</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `,
  });
}
