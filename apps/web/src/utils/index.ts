import messages from "../content/messages.json" assert { type: "json" };
import { DEFAULT_LOCALE, LOCALES, type TLocale } from "../constants/index";

export const dayMonthYearTimeFormat = Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
});

/**
 * Retrieves a localized message by key.
 * @param key The message key
 * @param locale The locale code (e.g., "de-de", "en-us")
 * @returns The localized message
 */
export const m = (
  key: keyof typeof messages,
  locale: string | undefined = "de-de"
) => {
  if (!LOCALES.some((l) => l === locale)) {
    return messages[key][DEFAULT_LOCALE];
  }
  return messages[key][locale as TLocale];
};
