
import React from 'react';
import { BlogPost } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

export interface BlogSchemaMarkupProps {
  blogPost: BlogPost;
}

const BlogSchemaMarkup: React.FC<BlogSchemaMarkupProps> = ({ blogPost }) => {
  const { language } = useLanguage();
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blogPost.title[language],
    "description": blogPost.excerpt[language],
    "image": blogPost.featuredImage,
    "author": {
      "@type": "Person",
      "name": blogPost.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wealthवाणी",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wealthvani.com/logo.png" // Replace with actual logo URL
      }
    },
    "datePublished": blogPost.date,
    "dateModified": blogPost.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://wealthvani.com/blog/${blogPost.slug}`
    },
    "keywords": blogPost.keywords.join(", ")
  };
  
  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaData)}
    </script>
  );
};

export default BlogSchemaMarkup;
