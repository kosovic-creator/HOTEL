import { cookies } from "next/headers";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_COOKIE,
  isSupportedLanguage,
  type Language,
} from "@/lib/localeShared";

export { DEFAULT_LANGUAGE, LANGUAGE_COOKIE };
export type { Language };

export async function getRequestLocale(): Promise<Language> {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get(LANGUAGE_COOKIE)?.value;
  return isSupportedLanguage(cookieLang) ? cookieLang : DEFAULT_LANGUAGE;
}
