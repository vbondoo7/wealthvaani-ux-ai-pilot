
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Facebook, Linkedin, Instagram, Calendar, User, Clock, Languages, Book } from "lucide-react";
import { toast } from "sonner";
import { blogPosts } from '@/lib/blogData';
import BlogSchemaMarkup from './BlogSchemaMarkup';
import { LanguageOption } from '@/lib/types';

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(language);
  
  // Find the blog post by slug
  const blogPost = React.useMemo(() => {
    return blogPosts.find(post => post.slug === slug);
  }, [slug]);
  
  // Set initial language
  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);
  
  // If blog post not found
  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory-white">
        <div className="wealth-card text-center">
          <Book className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">
            {language === 'en' ? "Blog Post Not Found" : 
             language === 'hi' ? "ब्लॉग पोस्ट नहीं मिला" :
             "Blog Post Nahi Mila"}
          </h1>
          <p className="mb-6 text-muted-foreground">
            {language === 'en' 
              ? "Sorry, the blog post you're looking for doesn't exist or has been removed." 
              : language === 'hi'
                ? "क्षमा करें, आप जिस ब्लॉग पोस्ट की तलाश कर रहे हैं वह मौजूद नहीं है या हटा दिया गया है।"
                : "Sorry, jis blog post ki aap talash kar rahe hain woh maujood nahi hai ya hata diya gaya hai."}
          </p>
          <Button onClick={() => navigate('/blog')} className="bg-royal-blue text-white">
            {language === 'en' ? "Back to Blog" : 
             language === 'hi' ? "ब्लॉग पर वापस जाएं" :
             "Blog Par Wapas Jaaye"}
          </Button>
        </div>
      </div>
    );
  }
  
  // Handle share functionality
  const handleShare = (platform: 'facebook' | 'linkedin' | 'twitter') => {
    const baseUrl = window.location.href;
    let shareUrl = '';
    
    const title = blogPost.title[selectedLanguage];
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(baseUrl)}&title=${encodeURIComponent(title)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(baseUrl)}&text=${encodeURIComponent(title)}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  const handleLanguageChange = (lang: LanguageOption) => {
    setSelectedLanguage(lang);
    toast.success(
      language === 'en' 
        ? `Language changed to ${lang.toUpperCase()}` 
        : language === 'hi' 
          ? `भाषा को ${lang.toUpperCase()} में बदला गया` 
          : `Language ${lang.toUpperCase()} mein change kar diya gaya`
    );
  };
  
  return (
    <div className="min-h-screen bg-ivory-white">
      {/* Add Schema.org structured data for SEO */}
      <BlogSchemaMarkup blogPost={blogPost} />
      
      {/* Navigation */}
      <nav className="py-4 px-6 bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Button 
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => navigate('/blog')}
          >
            <ArrowLeft className="h-4 w-4" />
            {language === 'en' ? "Back to Blog" : 
             language === 'hi' ? "ब्लॉग पर वापस जाएं" :
             "Blog Par Wapas Jaaye"}
          </Button>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => navigate('/login')}
            >
              {t('login')}
            </Button>
          </div>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto py-12 px-6">
        {/* Language Selector */}
        <div className="mb-6 flex justify-end">
          <div className="flex items-center gap-2 p-2 bg-white rounded-md shadow-sm">
            <Languages className="h-4 w-4 text-royal-blue" />
            <select 
              className="bg-transparent border-none text-sm focus:ring-0"
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value as LanguageOption)}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="hinglish">Hinglish</option>
            </select>
          </div>
        </div>
        
        {/* Blog Header */}
        <div className="wealth-card mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {blogPost.title[selectedLanguage]}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {blogPost.categories.map((category, index) => (
              <span 
                key={index}
                className="bg-royal-blue/10 text-royal-blue text-sm px-3 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{blogPost.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>
                {language === 'en' 
                  ? `${blogPost.readTime} min read` 
                  : language === 'hi' 
                    ? `${blogPost.readTime} मिनट का पठन`
                    : `${blogPost.readTime} minute ka read`}
              </span>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="aspect-[16/9] overflow-hidden rounded-lg mb-8 bg-gray-100">
            <img 
              src={blogPost.featuredImage} 
              alt={blogPost.imageAlt[selectedLanguage]}
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
        
        {/* Blog Content */}
        <div className="wealth-card mb-8">
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blogPost.content[selectedLanguage] }}
          />
        </div>
        
        {/* Share Section */}
        <div className="wealth-card">
          <h3 className="font-bold mb-4">
            {language === 'en' ? "Share this article" : 
             language === 'hi' ? "इस लेख को शेयर करें" :
             "Is article ko share karein"}
          </h3>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleShare('facebook')}
              className="rounded-full hover:bg-blue-50 hover:text-blue-600"
            >
              <Facebook className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleShare('linkedin')}
              className="rounded-full hover:bg-blue-50 hover:text-blue-700"
            >
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleShare('twitter')}
              className="rounded-full hover:bg-blue-50 hover:text-sky-500"
            >
              <Instagram className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-10 px-6 border-t bg-white/80 backdrop-blur-sm mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 Wealthवाणी. {language === 'en' ? "All rights reserved." : language === 'hi' ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button 
                variant="link" 
                className="text-sm text-muted-foreground p-0 h-auto"
                onClick={() => navigate('/terms')}
              >
                {language === 'en' ? "Terms & Conditions" : 
                 language === 'hi' ? "नियम और शर्तें" :
                 "Terms & Conditions"}
              </Button>
              <Button 
                variant="link" 
                className="text-sm text-muted-foreground p-0 h-auto"
                onClick={() => navigate('/careers')}
              >
                {language === 'en' ? "Careers" : 
                 language === 'hi' ? "करियर" :
                 "Careers"}
              </Button>
              <Button 
                variant="link" 
                className="text-sm text-muted-foreground p-0 h-auto"
                onClick={() => navigate('/pricing')}
              >
                {language === 'en' ? "Pricing" : 
                 language === 'hi' ? "मूल्य निर्धारण" :
                 "Pricing"}
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogDetails;
