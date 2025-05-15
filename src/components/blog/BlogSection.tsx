
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Facebook, Linkedin, Instagram } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '@/lib/blogData';
import BlogCard from './BlogCard';
import BlogSearch from './BlogSearch';
import BlogCategories from './BlogCategories';
import { cn } from '@/lib/utils';

const BlogSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory ? post.categories.includes(selectedCategory) : true;
    const matchesSearch = searchQuery.trim() === "" || 
      post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  return (
    <div className="min-h-screen bg-ivory-white">
      {/* Header */}
      <header className="py-4 px-6 bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-royal-blue"
            onClick={() => navigate('/marketing')}
          >
            <ArrowLeft className="h-4 w-4" />
            {language === 'en' 
              ? "Back to Home" 
              : language === 'hi' 
                ? "होम पर वापस जाएं" 
                : "Home pe wapas jayein"}
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <a href="#" className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Instagram className="h-4 w-4 text-royal-blue" />
              </a>
              <a href="#" className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Linkedin className="h-4 w-4 text-royal-blue" />
              </a>
              <a href="#" className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Facebook className="h-4 w-4 text-royal-blue" />
              </a>
            </div>
          </div>
        </div>
      </header>
      
      {/* Blog Hero */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            {language === 'en' 
              ? "Financial Wisdom for Every Indian Family" 
              : language === 'hi' 
                ? "हर भारतीय परिवार के लिए वित्तीय ज्ञान" 
                : "Har Indian Family Ke Liye Financial Wisdom"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'en'
              ? "Insights, tips and guidance to help you make better financial decisions."
              : language === 'hi'
                ? "बेहतर वित्तीय निर्णय लेने में आपकी मदद करने के लिए अंतर्दृष्टि, युक्तियाँ और मार्गदर्शन।"
                : "Behtar financial decisions lene mein aapki help karne ke liye insights, tips aur guidance."}
          </p>
          
          {/* Search */}
          <div className="mt-8 max-w-md mx-auto">
            <BlogSearch onSearch={handleSearch} />
          </div>
        </div>
      </section>
      
      {/* Blog Content */}
      <section className="py-8 px-6 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-3">
            <BlogCategories 
              selectedCategory={selectedCategory} 
              onCategorySelect={handleCategorySelect} 
            />
            
            <div className="wealth-card mt-6">
              <h3 className="font-bold text-lg mb-3 text-charcoal">
                {language === 'en' 
                  ? "Subscribe to Updates" 
                  : language === 'hi' 
                    ? "अपडेट्स के लिए सदस्यता लें" 
                    : "Updates ke liye subscribe karein"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'en'
                  ? "Stay updated with our latest financial tips and insights."
                  : language === 'hi'
                    ? "हमारी नवीनतम वित्तीय युक्तियों और अंतर्दृष्टियों के साथ अपडेट रहें।"
                    : "Hamari latest financial tips aur insights ke saath updated rahein."}
              </p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder={language === 'en' ? "Your email address" : language === 'hi' ? "आपका ईमेल पता" : "Aapka email address"} 
                  className="w-full p-2 border rounded-md"
                />
                <Button className="w-full bg-royal-blue hover:bg-royal-blue/90 text-white">
                  {language === 'en' ? "Subscribe" : language === 'hi' ? "सदस्यता लें" : "Subscribe"}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Blog Posts */}
          <div className="md:col-span-9">
            <h2 className={cn(
              "text-xl font-bold mb-6",
              selectedCategory ? "text-royal-blue" : "text-charcoal"
            )}>
              {selectedCategory 
                ? (language === 'en' 
                  ? `Category: ${selectedCategory}` 
                  : language === 'hi' 
                    ? `श्रेणी: ${selectedCategory}` 
                    : `Category: ${selectedCategory}`)
                : (language === 'en' 
                  ? "Latest Articles" 
                  : language === 'hi' 
                    ? "नवीनतम लेख" 
                    : "Latest Articles")}
            </h2>
            
            {filteredPosts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-muted-foreground">
                  {language === 'en' 
                    ? "No articles found. Try a different search." 
                    : language === 'hi' 
                      ? "कोई लेख नहीं मिला। एक अलग खोज का प्रयास करें।" 
                      : "Koi articles nahi mile. Different search try karein."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogSection;
