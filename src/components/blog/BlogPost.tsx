
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Facebook, Linkedin, Instagram, Calendar, User, Clock } from "lucide-react";
import { blogPosts } from '@/lib/blogData';
import { BlogPost as BlogPostType } from '@/lib/types';
import BlogSchemaMarkup from './BlogSchemaMarkup';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {language === 'en' 
            ? "Article not found" 
            : language === 'hi' 
              ? "लेख नहीं मिला" 
              : "Article nahi mila"}
        </h1>
        <Button 
          onClick={() => navigate('/blog')}
          className="bg-royal-blue hover:bg-royal-blue/90 text-white"
        >
          {language === 'en' 
            ? "Back to Blog" 
            : language === 'hi' 
              ? "ब्लॉग पर वापस जाएं" 
              : "Blog pe wapas jayein"}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-ivory-white">
      {/* Add Schema.org markup for SEO */}
      <BlogSchemaMarkup post={post} />
      
      {/* Header */}
      <header className="py-4 px-6 bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-royal-blue"
            onClick={() => navigate('/blog')}
          >
            <ArrowLeft className="h-4 w-4" />
            {language === 'en' 
              ? "Back to Articles" 
              : language === 'hi' 
                ? "लेखों पर वापस जाएं" 
                : "Articles pe wapas jayein"}
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
      
      {/* Blog Content */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            {post.title[language]}
          </h1>
          
          <div className="flex flex-wrap gap-3 mb-4">
            {post.categories.map(category => (
              <span 
                key={category} 
                className="text-xs py-1 px-2 bg-royal-blue/10 text-royal-blue rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={post.featuredImage} 
            alt={post.imageAlt[language]} 
            className="w-full h-auto"
          />
        </div>
        
        {/* Article Content */}
        <div className="wealth-card mb-10">
          <div className="prose prose-lg max-w-none">
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content[language] }} 
            />
          </div>
        </div>
        
        {/* Social Share */}
        <div className="wealth-card">
          <h3 className="font-bold text-lg mb-3">
            {language === 'en' 
              ? "Share this article" 
              : language === 'hi' 
                ? "इस लेख को साझा करें" 
                : "Is article ko share karein"}
          </h3>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
