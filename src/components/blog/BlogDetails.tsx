
import React from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPostBySlug } from '@/lib/blogData';
import { BlogPost as BlogPostType } from '@/lib/types';

interface BlogDetailsProps {
  slug?: string;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ slug }) => {
  // If slug is not provided as prop, try to get it from URL params
  const { slug: urlSlug } = useParams<{ slug: string }>();
  const postSlug = slug || urlSlug;
  
  // Fetch blog post data
  const blogPost = getBlogPostBySlug(postSlug || '');
  
  if (!blogPost) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold">Blog post not found</h1>
        <p>The blog post you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{blogPost.title.en}</h1>
      <div className="prose max-w-none">
        {/* Use dangerouslySetInnerHTML to render HTML content */}
        <div dangerouslySetInnerHTML={{ __html: blogPost.content.en }} />
      </div>
    </div>
  );
};

export default BlogDetails;
