import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import {
  DEFAULT_LOCALE,
  getContactApiMessages,
  resolveLocale,
  type Locale,
} from "@/i18n";

export async function POST(request: Request) {
  let locale: Locale = DEFAULT_LOCALE;

  try {
    const body = await request.json();
    const { name, email, message, locale: localeInput } = body;
    locale = resolveLocale(localeInput);
    const messages = getContactApiMessages(locale);

    if (!name || !email || !message) {
      return NextResponse.json({ error: messages.required }, { status: 400 });
    }

    const { data, error } = await sendContactEmail({ name, email, message });

    if (error) {
      console.error("Error de Resend:", error);
      return NextResponse.json({ error: messages.send }, { status: 500 });
    }

    console.log("Email enviado exitosamente:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error en API contact:", error);
    const messages = getContactApiMessages(locale);

    return NextResponse.json({ error: messages.send }, { status: 500 });
  }
}
