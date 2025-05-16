
import { Goal } from './types';

/**
 * Maps legacy goal format to current format
 * Used for backward compatibility
 */
export const mapLegacyGoal = (legacyGoal: any): Omit<Goal, 'id'> => {
  const currentDate = new Date();
  const deadlineDate = new Date();
  if (legacyGoal.timelineYears) {
    deadlineDate.setFullYear(currentDate.getFullYear() + legacyGoal.timelineYears);
  }
  
  return {
    title: legacyGoal.name.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()),
    targetAmount: legacyGoal.cost || 0,
    deadline: deadlineDate.toISOString().split('T')[0],
    priority: legacyGoal.priority || "medium",
    category: legacyGoal.name || "other",
    progress: legacyGoal.progress || 0,
    savedAmount: legacyGoal.savedAmount || 0,
    description: legacyGoal.description || `Goal to ${legacyGoal.name?.replace(/_/g, ' ')}`,
    // For backwards compatibility
    name: legacyGoal.name,
    cost: legacyGoal.cost,
    timelineYears: legacyGoal.timelineYears,
    monthlySavings: legacyGoal.monthlySavings,
    investment: legacyGoal.investment
  };
};

/**
 * Helper for handling language type checking
 * @param value Language code string to check
 * @returns True if valid language code
 */
export const isValidLanguage = (value: any): value is 'en' | 'hi' | 'hinglish' | 'bn' | 'ta' | 'te' => {
  return ['en', 'hi', 'hinglish', 'bn', 'ta', 'te'].includes(value);
};

/**
 * Safe access function for localized content
 * @param content Record with localized strings
 * @param language Current language code
 * @param fallbackLanguage Fallback language code
 * @returns Content in requested language or fallback
 */
export const getLocalizedContent = (
  content: Record<string, string> | undefined, 
  language: string, 
  fallbackLanguage: string = 'en'
): string => {
  if (!content) return '';
  return content[language] || content[fallbackLanguage] || '';
};
