
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";

interface BlogSearchProps {
  onSearch: (query: string) => void;
}

const BlogSearch: React.FC<BlogSearchProps> = ({ onSearch }) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={
          language === 'en' 
            ? "Search articles..." 
            : language === 'hi' 
              ? "लेख खोजें..." 
              : "Articles search karein..."
        }
        className="flex-1 p-2 border rounded-md"
      />
      <Button 
        type="submit"
        className="bg-royal-blue hover:bg-royal-blue/90 text-white"
      >
        {language === 'en' ? "Search" : language === 'hi' ? "खोजें" : "Search"}
      </Button>
    </form>
  );
};

export default BlogSearch;
