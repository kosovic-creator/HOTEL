// Client-safe exports
export { DEFAULT_LANGUAGE, LANGUAGE_COOKIE, type Language, isSupportedLanguage } from '@/i18n/constants';

// Server-only exports - must be imported separately in server components
export { getServerLanguage as getLocale, getRequestLanguage as getRequestLocale } from '@/i18n/i18n.server';
