import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Verificar API Key
    if (!process.env.RESEND_API_KEY) {
      console.error("ERROR: RESEND_API_KEY no está configurada");
      return NextResponse.json(
        { error: "API Key no configurada" },
        { status: 500 }
      );
    }

    const { name, email, message } = await request.json();

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: "Portafolio <onboarding@resend.dev>",
      to: "2201010141@undc.edu.pe",
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Nuevo mensaje desde tu portafolio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Error de Resend:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Email enviado exitosamente:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error en API contact:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}
