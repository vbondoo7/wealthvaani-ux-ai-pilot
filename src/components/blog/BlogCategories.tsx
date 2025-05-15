
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from "@/lib/utils";

const categories = [
  "Personal Finance",
  "Investments",
  "Retirement",
  "Tax Planning",
  "Family Finance",
  "Budget Tips",
  "Financial Literacy"
];

interface BlogCategoriesProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({ 
  selectedCategory, 
  onCategorySelect 
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="wealth-card">
      <h3 className="font-bold text-lg mb-3 text-charcoal">
        {language === 'en' 
          ? "Categories" 
          : language === 'hi' 
            ? "श्रेणियाँ" 
            : "Categories"}
      </h3>
      <ul className="space-y-1">
        <li>
          <button
            onClick={() => onCategorySelect(null)}
            className={cn(
              "w-full text-left py-1 px-2 rounded-md transition-colors",
              selectedCategory === null 
                ? "bg-royal-blue/10 text-royal-blue font-medium" 
                : "hover:bg-gray-100"
            )}
          >
            {language === 'en' 
              ? "All Articles" 
              : language === 'hi' 
                ? "सभी लेख" 
                : "All Articles"}
          </button>
        </li>
        {categories.map(category => (
          <li key={category}>
            <button
              onClick={() => onCategorySelect(category)}
              className={cn(
                "w-full text-left py-1 px-2 rounded-md transition-colors",
                selectedCategory === category 
                  ? "bg-royal-blue/10 text-royal-blue font-medium" 
                  : "hover:bg-gray-100"
              )}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogCategories;
