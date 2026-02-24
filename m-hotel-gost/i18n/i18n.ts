import fs from 'fs';
import path from 'path';

/**
 * Async verzija - za server i browser
 * @param lang Jezik (npr. "sr", "en")
 * @param namespace Naziv json fajla bez ekstenzije (npr. "common")
 */
export async function getLocaleMessages(lang: string, namespace: string): Promise<Record<string, any>> {
  // If running on the server, use fs
  if (typeof window === 'undefined') {
    const filePath = path.join(process.cwd(), 'i18n/locales', lang, `${namespace}.json`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  }
  // If running in the browser, use dynamic import
  const messages = await import(`./locales/${lang}/${namespace}.json`);
  return messages.default || messages;
}