
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getBlogPostBySlug } from '@/lib/blogData';
import BlogDetails from './BlogDetails';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }
  
  const blogPost = getBlogPostBySlug(slug);
  
  if (!blogPost) {
    return <Navigate to="/blog" replace />;
  }
  
  return <BlogDetails slug={slug} />;
};

export default BlogPost;
