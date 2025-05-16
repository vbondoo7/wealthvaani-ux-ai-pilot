
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBlogPostBySlug } from '@/lib/blogData';
import { BlogPost } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import BlogSchemaMarkup from './BlogSchemaMarkup';
import { getLocalizedContent } from '@/lib/typeUtils';

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const post = getBlogPostBySlug(slug);
      if (post) {
        setBlogPost(post);
      }
      setIsLoading(false);
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-10"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-ivory-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'en'
              ? 'Blog post not found'
              : language === 'hi'
                ? 'ब्लॉग पोस्ट नहीं मिला'
                : 'Blog post nahi mila'}
          </h1>
          <Button
            variant="outline"
            onClick={() => navigate('/blog')}
            className="mt-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'en'
              ? 'Back to Blog'
              : language === 'hi'
                ? 'ब्लॉग पर वापस जाएँ'
                : 'Blog par wapas jayen'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/blog')}
          className="mb-8 text-royal-blue flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === 'en'
            ? 'Back to Blog'
            : language === 'hi'
              ? 'ब्लॉग पर वापस जाएँ'
              : 'Blog par wapas jayen'}
        </Button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {blogPost.featuredImage && (
            <div className="h-[300px] w-full overflow-hidden">
              <img
                src={blogPost.featuredImage}
                alt={getLocalizedContent(blogPost.title, language)}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal">
              {getLocalizedContent(blogPost.title, language)}
            </h1>

            <div className="flex items-center text-muted-foreground mb-8">
              <span>{blogPost.date}</span>
              <span className="mx-2">•</span>
              <span>{blogPost.author}</span>
              <span className="mx-2">•</span>
              <span>{blogPost.category}</span>
            </div>

            <div className="prose max-w-none">
              <p className="text-lg mb-6">{getLocalizedContent(blogPost.excerpt, language)}</p>
              
              {/* Render content - assuming content is plain text for now */}
              {getLocalizedContent(blogPost.content, language).split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t">
              <div className="flex flex-wrap gap-2">
                {blogPost.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Schema markup for SEO */}
        <BlogSchemaMarkup blogPost={blogPost} />
      </div>
    </div>
  );
};

export default BlogDetails;
