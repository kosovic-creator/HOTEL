// Client-safe exports
export { DEFAULT_LANGUAGE, LANGUAGE_COOKIE, type Language, isSupportedLanguage } from '@/i18n/locale';

// Server-only exports - must be imported separately in server components
export { getLocale, getRequestLocale } from '@/i18n/locale.server';
