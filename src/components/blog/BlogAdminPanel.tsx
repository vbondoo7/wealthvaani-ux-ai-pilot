
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { BlogPost, LanguageOption } from '@/lib/types';
import { blogPosts } from '@/lib/blogData';
import { generateId } from '@/lib/mockData';

const BlogAdminPanel: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  
  // Create empty blog template
  const createEmptyBlog = (): BlogPost => {
    const languageOptions: LanguageOption[] = ['en', 'hi', 'hinglish', 'bn', 'ta', 'te'];
    
    const emptyMultiLangField = (defaultText = '') => {
      return languageOptions.reduce((acc, lang) => {
        acc[lang] = defaultText;
        return acc;
      }, {} as Record<LanguageOption, string>);
    };
    
    return {
      id: blogPosts.length + 1,
      slug: `new-blog-${Date.now()}`,
      title: emptyMultiLangField('New Blog Title'),
      excerpt: emptyMultiLangField('This is a new blog post.'),
      content: emptyMultiLangField('<p>Start writing your blog content here...</p>'),
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
      readTime: 5,
      featuredImage: '/placeholder.svg',
      imageAlt: emptyMultiLangField('Featured image'),
      categories: ['Uncategorized'],
      keywords: ['wealthvani'],
      metaDescription: emptyMultiLangField('A new blog post by Wealthवाणी.')
    };
  };
  
  const [newBlog, setNewBlog] = useState<BlogPost>(createEmptyBlog());
  const [editLanguage, setEditLanguage] = useState<LanguageOption>('en');
  
  const handleCreateNew = () => {
    setIsCreatingNew(true);
    setNewBlog(createEmptyBlog());
    setSelectedBlog(null);
  };
  
  const handleSelectBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsCreatingNew(false);
  };
  
  const handleSaveNewBlog = () => {
    // This is a mock implementation - in a real app, you would save to a database
    toast.success(language === 'en' 
      ? "Blog created successfully!" 
      : language === 'hi' 
        ? "ब्लॉग सफलतापूर्वक बनाया गया!" 
        : "Blog successfully create ho gaya!");
        
    // In a real app, we would persist this to a database
    console.log('New blog to save:', newBlog);
    setIsCreatingNew(false);
  };
  
  const handleUpdateBlog = () => {
    // This is a mock implementation - in a real app, you would update in a database
    if (!selectedBlog) return;
    
    toast.success(language === 'en' 
      ? "Blog updated successfully!" 
      : language === 'hi' 
        ? "ब्लॉग सफलतापूर्वक अपडेट किया गया!" 
        : "Blog successfully update ho gaya!");
        
    // In a real app, we would persist this to a database
    console.log('Blog to update:', selectedBlog);
  };
  
  const handleDeleteBlog = () => {
    // This is a mock implementation - in a real app, you would delete from a database
    if (!selectedBlog) return;
    
    const confirmDelete = window.confirm(
      language === 'en' 
        ? "Are you sure you want to delete this blog?" 
        : language === 'hi' 
          ? "क्या आप वाकई इस ब्लॉग को हटाना चाहते हैं?" 
          : "Kya aap pakka is blog ko delete karna chahte hain?"
    );
    
    if (confirmDelete) {
      toast.success(language === 'en' 
        ? "Blog deleted successfully!" 
        : language === 'hi' 
          ? "ब्लॉग सफलतापूर्वक हटाया गया!" 
          : "Blog successfully delete ho gaya!");
          
      // In a real app, we would delete from a database
      console.log('Blog to delete:', selectedBlog.id);
      setSelectedBlog(null);
    }
  };
  
  const handleInputChange = (field: string, value: string) => {
    if (isCreatingNew) {
      setNewBlog(prev => ({
        ...prev,
        [field]: field === 'title' || field === 'content' || field === 'excerpt' || field === 'metaDescription' || field === 'imageAlt'
          ? { ...prev[field as keyof BlogPost], [editLanguage]: value }
          : value
      }));
    } else if (selectedBlog) {
      setSelectedBlog(prev => ({
        ...prev,
        [field]: field === 'title' || field === 'content' || field === 'excerpt' || field === 'metaDescription' || field === 'imageAlt'
          ? { ...prev[field as keyof BlogPost], [editLanguage]: value }
          : value
      }));
    }
  };
  
  return (
    <div className="min-h-screen bg-ivory-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {t('admin-dashboard')} - {t('manage-blogs')}
        </h1>
        
        <div className="flex mb-6">
          <Button 
            onClick={handleCreateNew}
            className="bg-royal-blue hover:bg-royal-blue/90 text-white"
          >
            {t('add-blog')}
          </Button>
        </div>
        
        {!isCreatingNew && !selectedBlog ? (
          <div className="wealth-card">
            <h2 className="text-lg font-bold mb-4">
              {language === 'en' 
                ? "Select a blog to edit" 
                : language === 'hi' 
                  ? "संपादित करने के लिए ब्लॉग चुनें" 
                  : "Edit karne ke liye blog select karein"}
            </h2>
            <div className="space-y-4">
              {blogPosts.map(blog => (
                <div 
                  key={blog.id}
                  className="p-4 border rounded-md hover:bg-ivory-white/50 cursor-pointer"
                  onClick={() => handleSelectBlog(blog)}
                >
                  <h3 className="font-bold">{blog.title[language]}</h3>
                  <p className="text-sm text-muted-foreground">{blog.date}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="wealth-card">
            <h2 className="text-lg font-bold mb-4">
              {isCreatingNew ? t('add-blog') : t('edit-blog')}
            </h2>
            
            <div className="mb-4">
              <Label>
                {language === 'en' 
                  ? "Edit Language" 
                  : language === 'hi' 
                    ? "भाषा संपादित करें" 
                    : "Language Edit Karein"}
              </Label>
              <select 
                className="w-full rounded-md border p-2 mt-1"
                value={editLanguage}
                onChange={(e) => setEditLanguage(e.target.value as LanguageOption)}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="hinglish">Hinglish</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="te">తెలుగు (Telugu)</option>
              </select>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="title">{t('blog-title')}</Label>
              <Input
                id="title"
                value={isCreatingNew 
                  ? newBlog.title[editLanguage] 
                  : selectedBlog?.title[editLanguage]}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={isCreatingNew ? newBlog.slug : selectedBlog?.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={isCreatingNew 
                  ? newBlog.excerpt[editLanguage] 
                  : selectedBlog?.excerpt[editLanguage]}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="content">{t('blog-content')}</Label>
              <Textarea
                id="content"
                value={isCreatingNew 
                  ? newBlog.content[editLanguage] 
                  : selectedBlog?.content[editLanguage]}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="mt-1 font-mono"
                rows={10}
              />
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'en' 
                  ? "You can use HTML formatting" 
                  : language === 'hi' 
                    ? "आप HTML फॉर्मेटिंग का उपयोग कर सकते हैं" 
                    : "Aap HTML formatting use kar sakte hain"}
              </p>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="categories">
                {language === 'en' 
                  ? "Categories (comma separated)" 
                  : language === 'hi' 
                    ? "श्रेणियां (कॉमा द्वारा अलग की गई)" 
                    : "Categories (comma se separate)"}
              </Label>
              <Input
                id="categories"
                value={isCreatingNew 
                  ? newBlog.categories.join(', ') 
                  : selectedBlog?.categories.join(', ')}
                onChange={(e) => handleInputChange('categories', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                value={isCreatingNew 
                  ? newBlog.metaDescription[editLanguage] 
                  : selectedBlog?.metaDescription[editLanguage]}
                onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                className="mt-1"
                rows={2}
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreatingNew(false);
                  setSelectedBlog(null);
                }}
              >
                {t('cancel')}
              </Button>
              
              {isCreatingNew ? (
                <Button
                  onClick={handleSaveNewBlog}
                  className="bg-royal-blue hover:bg-royal-blue/90 text-white"
                >
                  {t('save-changes')}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleDeleteBlog}
                    variant="destructive"
                  >
                    {t('delete-blog')}
                  </Button>
                  <Button
                    onClick={handleUpdateBlog}
                    className="bg-royal-blue hover:bg-royal-blue/90 text-white"
                  >
                    {t('save-changes')}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogAdminPanel;
