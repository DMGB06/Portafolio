import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Enviar email usando lib/email.ts
    const { data, error } = await sendContactEmail({ name, email, message });

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
