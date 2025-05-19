
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as Indian Rupee currency
 * @param amount - The amount to format
 * @returns Formatted currency string with ₹ symbol
 */
export function formatCurrency(amount: number | string): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) {
    return '₹0';
  }

  if (numAmount >= 100000) {
    return `₹${(numAmount / 100000).toFixed(1)}L`;
  } else if (numAmount >= 1000) {
    return `₹${(numAmount / 1000).toFixed(0)}K`;
  } else {
    return `₹${numAmount.toFixed(0)}`;
  }
}
