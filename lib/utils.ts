import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(fullName?: string): string {
  if (!fullName) return ''

  // Split the full name into an array of words
  const nameParts = fullName.split(' ');

  // Map each word to its first character, then join them together
  const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');

  return initials;
}