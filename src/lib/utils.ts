
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Indian Rupees currency
 */
export function formatCurrency(amount: number | undefined): string {
  if (amount === undefined || amount === null) return '₹0';
  
  // Format as Indian currency (with commas as per Indian numbering system)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
