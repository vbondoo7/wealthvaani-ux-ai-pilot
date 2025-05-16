
import { Goal, LanguageOption } from './types';

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
export const isValidLanguage = (value: any): value is LanguageOption => {
  return ['en', 'hi', 'hinglish', 'bn', 'ta', 'te'].includes(value);
};

/**
 * Cast a string to LanguageOption type safely
 * @param value String to cast to LanguageOption
 * @returns Language option or default 'en' if invalid
 */
export const asLanguageOption = (value: string): LanguageOption => {
  return isValidLanguage(value) ? value : 'en';
};

/**
 * Compare a LanguageOption with a string value safely
 * This helps avoid type comparison errors in TypeScript
 */
export const isLanguage = (language: LanguageOption, value: LanguageOption): boolean => {
  return language === value;
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
  
  // Ensure content has values for all required languages
  if (content && (!content.en || Object.keys(content).length === 0)) {
    return '';
  }
  
  return content[language] || content[fallbackLanguage] || '';
};
