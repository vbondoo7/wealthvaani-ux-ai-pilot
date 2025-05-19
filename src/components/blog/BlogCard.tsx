
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BlogPost } from '@/lib/types';
import { getLocalizedContent, isLanguage } from '@/lib/typeUtils';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const handleClick = () => {
    navigate(`/blog/${post.slug}`);
  };
  
  // Ensure we have localized content or provide fallbacks
  const title = getLocalizedContent(post.title, language);
  const excerpt = getLocalizedContent(post.excerpt, language);
  const imageAlt = post.imageAlt ? getLocalizedContent(post.imageAlt, language) : 'Blog post image';
  
  // Safely access categories with null check
  const categories = post.categories || [];
  
  return (
    <div className="wealth-card hover:shadow-lg transition-shadow">
      <div className="aspect-video rounded-md overflow-hidden bg-gray-100 mb-4">
        <img 
          src={post.featuredImage} 
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="mb-2 flex gap-2">
        {categories && categories.length > 0 ? 
          categories.slice(0, 2).map(category => (
            <span 
              key={category} 
              className="text-xs py-0.5 px-2 bg-royal-blue/10 text-royal-blue rounded-full"
            >
              {category}
            </span>
          ))
          : 
          <span className="text-xs py-0.5 px-2 bg-royal-blue/10 text-royal-blue rounded-full">
            {post.category || "General"}
          </span>
        }
      </div>
      
      <h3 className="text-lg font-bold text-charcoal line-clamp-2 mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
        {excerpt}
      </p>
      
      <Button 
        variant="link" 
        className="p-0 text-saffron-orange hover:text-saffron-orange/80"
        onClick={handleClick}
      >
        {isLanguage(language, 'en')
          ? "Read More" 
          : isLanguage(language, 'hi')
            ? "और पढ़ें" 
            : isLanguage(language, 'hinglish')
              ? "Aur Padhein"
              : isLanguage(language, 'bn')
                ? "আরো পড়ুন"
                : isLanguage(language, 'ta')
                  ? "மேலும் படிக்க"
                  : "మరింత చదవండి"}
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default BlogCard;
