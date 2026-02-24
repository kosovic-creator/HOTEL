import { cookies } from 'next/headers';
import { type Language, DEFAULT_LANGUAGE, LANGUAGE_COOKIE, isSupportedLanguage } from './locale.constants';

/**
 * Čita jezik iz cookies na serveru
 * @returns Trenutni jezik ('sr' ili 'en'), default je 'sr'
 */
export async function getLocale(): Promise<Language> {
  const cookieStore = await cookies();
  const lang = cookieStore.get(LANGUAGE_COOKIE)?.value;

  if (lang === 'en' || lang === 'sr') {
    return lang;
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Kompatibilna verzija sa getRequestLocale imenom
 * @returns Trenutni jezik ('sr' ili 'en'), default je 'sr'
 */
export async function getRequestLocale(): Promise<Language> {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get(LANGUAGE_COOKIE)?.value;
  return isSupportedLanguage(cookieLang) ? cookieLang : DEFAULT_LANGUAGE;
}
