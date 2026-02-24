// Client-safe exports only - no next/headers imports!
export { type Language, DEFAULT_LANGUAGE, LANGUAGE_COOKIE, isSupportedLanguage } from './locale.constants';

// Server-only exports - must be imported separately in server components
export { getLocale, getRequestLocale } from './locale.server';
