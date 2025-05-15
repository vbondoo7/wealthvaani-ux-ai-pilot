
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { getAuthenticatedAdmin, loginAdmin, logoutAdmin } from '@/lib/adminService';
import { blogPosts, updateBlogPost, addBlogPost, deleteBlogPost } from '@/lib/blogData';
import { BlogPost, LanguageOption } from '@/lib/types';

const BlogAdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [editMode, setEditMode] = useState(false);
  
  // Form state for new/edit post
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    id: '',
    slug: '',
    author: '',
    date: '',
    category: '',
    featuredImage: '',
    keywords: [],
    title: {
      en: '',
      hi: '',
      hinglish: '',
    } as Record<LanguageOption, string>,
    content: {
      en: '',
      hi: '',
      hinglish: '',
    } as Record<LanguageOption, string>,
    excerpt: {
      en: '',
      hi: '',
      hinglish: '',
    } as Record<LanguageOption, string>,
    metaDescription: {
      en: '',
      hi: '',
      hinglish: '',
    } as Record<LanguageOption, string>
  });
  
  // Check if admin is authenticated
  useEffect(() => {
    const admin = getAuthenticatedAdmin();
    if (admin) {
      setIsAuthenticated(true);
      loadPosts();
    }
  }, []);
  
  const loadPosts = () => {
    setPosts([...blogPosts]);
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginAdmin(email, password)) {
      setIsAuthenticated(true);
      loadPosts();
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };
  
  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setSelectedPost(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };
  
  const selectPost = (post: BlogPost) => {
    setSelectedPost(post);
    setFormData(post);
    setEditMode(true);
  };
  
  const createNewPost = () => {
    setSelectedPost(null);
    setFormData({
      id: Date.now().toString(),
      slug: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      featuredImage: '',
      keywords: [],
      title: {
        en: '',
        hi: '',
        hinglish: '',
      } as Record<LanguageOption, string>,
      content: {
        en: '',
        hi: '',
        hinglish: '',
      } as Record<LanguageOption, string>,
      excerpt: {
        en: '',
        hi: '',
        hinglish: '',
      } as Record<LanguageOption, string>,
      metaDescription: {
        en: '',
        hi: '',
        hinglish: '',
      } as Record<LanguageOption, string>
    });
    setEditMode(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleLanguageInputChange = (field: string, language: string, value: string) => {
    setFormData({
      ...formData,
      [field]: {
        ...(formData[field as keyof typeof formData] as Record<string, string>),
        [language]: value
      }
    });
  };
  
  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keywordsArray = e.target.value.split(',').map(keyword => keyword.trim());
    setFormData({ ...formData, keywords: keywordsArray });
  };
  
  const handleSave = () => {
    if (!formData.title || !formData.content || !formData.slug) {
      toast({
        title: "Error",
        description: "Title, content, and slug are required",
        variant: "destructive",
      });
      return;
    }
    
    // If we're editing an existing post
    if (selectedPost) {
      updateBlogPost({
        ...selectedPost,
        ...formData as BlogPost
      });
      toast({
        title: "Success",
        description: "Post updated successfully",
      });
    } else {
      // If it's a new post
      addBlogPost(formData as BlogPost);
      toast({
        title: "Success",
        description: "New post created successfully",
      });
    }
    
    loadPosts();
    setEditMode(false);
    setSelectedPost(null);
  };
  
  const handleDelete = () => {
    if (selectedPost) {
      deleteBlogPost(selectedPost.id);
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
      loadPosts();
      setEditMode(false);
      setSelectedPost(null);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ivory-white p-8 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-royal-blue text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@wealthvani.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                <Input 
                  id="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-royal-blue hover:bg-royal-blue/90">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <button 
              onClick={() => navigate('/')} 
              className="text-sm text-royal-blue hover:underline"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-ivory-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-royal-blue">Blog Admin Panel</h1>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/blog')}
              className="border-royal-blue text-royal-blue hover:bg-royal-blue/10"
            >
              View Blog
            </Button>
            <Button 
              variant="destructive"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
        
        {!editMode ? (
          <div>
            <div className="mb-6">
              <Button 
                onClick={createNewPost}
                className="bg-saffron-orange hover:bg-saffron-orange/90"
              >
                Create New Post
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">All Posts</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 gap-4">
                  {posts.map(post => (
                    <div 
                      key={post.id}
                      className="p-4 border rounded hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                      onClick={() => selectPost(post)}
                    >
                      <div>
                        <h3 className="font-medium">{post.title.en}</h3>
                        <div className="text-sm text-gray-500">
                          {post.date} • {post.category}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`/blog/${post.slug}`, '_blank');
                        }}
                      >
                        View
                      </Button>
                    </div>
                  ))}
                  
                  {posts.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No posts found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">
              {selectedPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <Input
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="post-slug-url"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL-friendly version of the title with hyphens (e.g., my-blog-post)
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Author</label>
                <Input
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Author name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Post category"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Featured Image URL</label>
                <Input
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Keywords (comma separated)</label>
                <Input
                  value={formData.keywords ? formData.keywords.join(', ') : ''}
                  onChange={handleKeywordsChange}
                  placeholder="finance, wealth, investment"
                />
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Content in Multiple Languages</h3>
                
                {['en', 'hi', 'hinglish'].map((lang) => (
                  <div key={lang} className="mb-8 p-4 border rounded-lg">
                    <h4 className="font-medium mb-3 capitalize">{lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Hinglish'}</h4>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <Input
                        value={(formData.title as Record<string, string>)?.[lang] || ''}
                        onChange={(e) => handleLanguageInputChange('title', lang, e.target.value)}
                        placeholder={`Post title in ${lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Hinglish'}`}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Excerpt</label>
                      <Textarea
                        value={(formData.excerpt as Record<string, string>)?.[lang] || ''}
                        onChange={(e) => handleLanguageInputChange('excerpt', lang, e.target.value)}
                        placeholder={`Short excerpt in ${lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Hinglish'}`}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Content</label>
                      <Textarea
                        className="min-h-[200px]"
                        value={(formData.content as Record<string, string>)?.[lang] || ''}
                        onChange={(e) => handleLanguageInputChange('content', lang, e.target.value)}
                        placeholder={`Full content in ${lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Hinglish'}`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Meta Description</label>
                      <Textarea
                        value={(formData.metaDescription as Record<string, string>)?.[lang] || ''}
                        onChange={(e) => handleLanguageInputChange('metaDescription', lang, e.target.value)}
                        placeholder={`SEO description in ${lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Hinglish'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4 justify-end pt-4 border-t">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setEditMode(false);
                    setSelectedPost(null);
                  }}
                >
                  Cancel
                </Button>
                {selectedPost && (
                  <Button 
                    variant="destructive"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                )}
                <Button 
                  className="bg-royal-blue hover:bg-royal-blue/90"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogAdminPanel;
