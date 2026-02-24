import fs from 'fs';
import path from 'path';

/**
 * Synchronous verzija - samo za server (server actions, API routes, itd)
 * @param lang Jezik (npr. "sr", "en")
 * @param namespace Naziv json fajla bez ekstenzije (npr. "proizvodi")
 */
export function getLocaleMessagesSync(lang: string, namespace: string) {
  const filePath = path.join(process.cwd(), 'i18n/locales', lang, `${namespace}.json`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Async verzija - za server i browser
 * @param lang Jezik (npr. "sr", "en")
 * @param namespace Naziv json fajla bez ekstenzije (npr. "proizvodi")
 */
export async function getLocaleMessages(lang: string, namespace: string) {
  // If running on the server, use fs
  if (typeof window === 'undefined') {
    return getLocaleMessagesSync(lang, namespace);
  }
  // If running in the browser, use dynamic import
  const messages = await import(`../i18n/locales/${lang}/${namespace}.json`);
  return messages.default || messages;
}
