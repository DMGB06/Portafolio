import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { isValidEmail, isValidContactFields } from "@/lib/validation";
import { isRateLimited } from "@/lib/rate-limit";
import {
  DEFAULT_LOCALE,
  getContactApiMessages,
  resolveLocale,
  type Locale,
} from "@/i18n";

function getClientIp(request: Request): string {
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  let locale: Locale = DEFAULT_LOCALE;

  try {
    const body = await request.json();
    const { name, email, message, locale: localeInput } = body;
    locale = resolveLocale(localeInput);
    const messages = getContactApiMessages(locale);

    if (isRateLimited(getClientIp(request))) {
      return NextResponse.json({ error: messages.rateLimited }, { status: 429 });
    }

    if (!isValidContactFields({ name, email, message })) {
      return NextResponse.json({ error: messages.required }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: messages.required }, { status: 400 });
    }

    const { data, error } = await sendContactEmail({ name, email, message });

    if (error) {
      return NextResponse.json({ error: messages.send }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch {
    const messages = getContactApiMessages(locale);

    return NextResponse.json({ error: messages.send }, { status: 500 });
  }
}
