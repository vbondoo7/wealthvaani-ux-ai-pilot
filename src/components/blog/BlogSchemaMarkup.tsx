
import React from 'react';
import { BlogPost } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogSchemaMarkupProps {
  post: BlogPost;
}

const BlogSchemaMarkup: React.FC<BlogSchemaMarkupProps> = ({ post }) => {
  const { language } = useLanguage();
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title[language],
    "description": post.excerpt[language],
    "image": post.featuredImage,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wealthवाणी",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wealthvani.com/logo.png" // Replace with actual logo URL
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://wealthvani.com/blog/${post.slug}`
    },
    "keywords": post.keywords.join(", ")
  };
  
  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaData)}
    </script>
  );
};

export default BlogSchemaMarkup;
