/**
 * Sanitize — input helpers used before storing or submitting user text.
 */

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Strips HTML tags before persisting user-supplied strings.
export const stripHtml = (value: string): string => value.replace(/<[^>]*>/g, "").trim();

export const isValidEmail = (value: string): boolean => EMAIL_PATTERN.test(value);
