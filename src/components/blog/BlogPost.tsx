
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BlogDetails from './BlogDetails';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }
  
  return <BlogDetails />;
};

export default BlogPost;
