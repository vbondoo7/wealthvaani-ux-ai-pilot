
import React from 'react';
import { BlogPost } from '@/lib/types';
import { getLocalizedContent } from '@/lib/typeUtils';

export interface BlogSchemaMarkupProps {
  blogPost: BlogPost;
}

const BlogSchemaMarkup: React.FC<BlogSchemaMarkupProps> = ({ blogPost }) => {
  // This component renders the structured data for SEO
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: getLocalizedContent(blogPost.title, 'en'),
    description: getLocalizedContent(blogPost.excerpt, 'en'),
    datePublished: blogPost.date,
    author: {
      '@type': 'Person',
      name: blogPost.author
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default BlogSchemaMarkup;
