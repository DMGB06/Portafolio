/** Replace `{key}` placeholders in a localized string. */
export function fillTemplate(
  template: string | undefined,
  values: Record<string, string | number>
): string {
  if (typeof template !== "string") {
    return "";
  }

  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template
  );
}
