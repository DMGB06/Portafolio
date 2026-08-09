export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidContactFields(fields: {
  name: unknown;
  email: unknown;
  message: unknown;
}): fields is { name: string; email: string; message: string } {
  const { name, email, message } = fields;
  return (
    typeof name === "string" &&
    typeof email === "string" &&
    typeof message === "string" &&
    name.length > 0 &&
    name.length <= 100 &&
    email.length <= 254 &&
    message.length > 0 &&
    message.length <= 5000
  );
}
