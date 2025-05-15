
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { BlogPost, LanguageOption } from '@/lib/types';
import { blogPosts } from '@/lib/blogData';
import { generateId } from '@/lib/mockData';
import { getAuthenticatedAdmin } from '@/lib/adminService';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogAdminPanel: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [admin, setAdmin] = useState(getAuthenticatedAdmin());
  
  // Redirect if not admin
  useEffect(() => {
    if (!admin) {
      navigate('/blog');
      toast.error("Admin access required");
    }
  }, [admin, navigate]);
  
  // Create empty blog template with proper typing
  const createEmptyBlog = (): BlogPost => {
    return {
      id: blogPosts.length + 1,
      slug: `new-blog-${Date.now()}`,
      title: {
        en: 'New Blog Title',
        hi: 'नया ब्लॉग शीर्षक',
        hinglish: 'New Blog Title',
        bn: 'নতুন ব্লগ শিরোনাম',
        ta: 'புதிய வலைப்பதிவு தலைப்பு',
        te: 'కొత్త బ్లాగ్ శీర్షిక',
        pa: 'ਨਵਾਂ ਬਲੌਗ ਸਿਰਲੇਖ',
        gu: 'નવું બ્લોગ શીર્ષક',
        ml: 'പുതിയ ബ്ലോഗ് ശീർഷകം'
      },
      excerpt: {
        en: 'This is a new blog post.',
        hi: 'यह एक नया ब्लॉग पोस्ट है।',
        hinglish: 'Yeh ek naya blog post hai.',
        bn: 'এটি একটি নতুন ব্লগ পোস্ট।',
        ta: 'இது ஒரு புதிய வலைப்பதிவு.',
        te: 'ఇది ఒక కొత్త బ్లాగ్ పోస్ట్.',
        pa: 'ਇਹ ਇੱਕ ਨਵੀਂ ਬਲੌਗ ਪੋਸਟ ਹੈ।',
        gu: 'આ એક નવી બ્લોગ પોસ્ટ છે.',
        ml: 'ഇത് ഒരു പുതിയ ബ്ലോഗ് പോസ്റ്റ് ആണ്.'
      },
      content: {
        en: '<p>Start writing your blog content here...</p>',
        hi: '<p>अपनी ब्लॉग सामग्री यहां लिखना शुरू करें...</p>',
        hinglish: '<p>Apni blog content yahan likhna shuru karen...</p>',
        bn: '<p>এখানে আপনার ব্লগের বিষয়বস্তু লেখা শুরু করুন...</p>',
        ta: '<p>உங்கள் வலைப்பதிவு உள்ளடக்கத்தை இங்கே எழுதத் தொடங்கவும்...</p>',
        te: '<p>మీ బ్లాగ్ కంటెంట్‌ను ఇక్కడ రాయడం ప్రారంభించండి...</p>',
        pa: '<p>ਆਪਣੀ ਬਲੌਗ ਸਮੱਗਰੀ ਇੱਥੇ ਲਿਖਣਾ ਸ਼ੁਰੂ ਕਰੋ...</p>',
        gu: '<p>તમારી બ્લોગ સામગ્રી અહીં લખવાનું શરૂ કરો...</p>',
        ml: '<p>നിങ്ങളുടെ ബ്ലോഗ് ഉള്ളടക്കം ഇവിടെ എഴുതി തുടങ്ങൂ...</p>'
      },
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
      readTime: 5,
      featuredImage: '/placeholder.svg',
      imageAlt: {
        en: 'Featured image',
        hi: 'फीचर्ड इमेज',
        hinglish: 'Featured image',
        bn: 'বৈশিষ্ট্যযুক্ত ছবি',
        ta: 'சிறப்பு படம்',
        te: 'ఫీచర్డ్ ఇమేజ్',
        pa: 'ਫੀਚਰਡ ਚਿੱਤਰ',
        gu: 'ફીચર્ડ ઇમેજ',
        ml: 'ഫീച്ചർഡ് ചിത്രം'
      },
      categories: ['Uncategorized'],
      keywords: ['wealthvani'],
      metaDescription: {
        en: 'A new blog post by Wealthवाणी.',
        hi: 'Wealthवाणी द्वारा एक नई ब्लॉग पोस्ट।',
        hinglish: 'Wealthवाणी dwara ek naya blog post.',
        bn: 'Wealthवाणी দ্বারা একটি নতুন ব্লগ পোস্ট।',
        ta: 'Wealthवाणी இன் புதிய வலைப்பதிவு.',
        te: 'Wealthवाणी ద్వారా కొత్త బ్లాగ్ పోస్ట్.',
        pa: 'Wealthवाणी ਦੁਆਰਾ ਇੱਕ ਨਵੀਂ ਬਲੌਗ ਪੋਸਟ।',
        gu: 'Wealthवाणी દ્વારા એક નવી બ્લોગ પોસ્ટ.',
        ml: 'Wealthवाणी നൽകുന്ന ഒരു പുതിയ ബ്ലോഗ് പോസ്റ്റ്.'
      }
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
      setNewBlog(prev => {
        const updatedBlog = { ...prev };
        
        if (field === 'title' || field === 'content' || field === 'excerpt' || field === 'metaDescription' || field === 'imageAlt') {
          const currentFieldValue = updatedBlog[field as keyof BlogPost] as Record<LanguageOption, string>;
          
          // Create new object with updated language value
          const updatedFieldValue = {
            ...currentFieldValue,
            [editLanguage]: value
          };
          
          // Update the field in the blog
          updatedBlog[field as keyof BlogPost] = updatedFieldValue as any;
        } else if (field === 'categories') {
          updatedBlog.categories = value.split(',').map(cat => cat.trim());
        } else if (field === 'slug') {
          updatedBlog.slug = value;
        }
        
        return updatedBlog;
      });
    } else if (selectedBlog) {
      setSelectedBlog(prev => {
        if (!prev) return null;
        
        const updatedBlog = { ...prev };
        
        if (field === 'title' || field === 'content' || field === 'excerpt' || field === 'metaDescription' || field === 'imageAlt') {
          const currentFieldValue = updatedBlog[field as keyof BlogPost] as Record<LanguageOption, string>;
          
          // Create new object with updated language value
          const updatedFieldValue = {
            ...currentFieldValue,
            [editLanguage]: value
          };
          
          // Update the field in the blog
          updatedBlog[field as keyof BlogPost] = updatedFieldValue as any;
        } else if (field === 'categories') {
          updatedBlog.categories = value.split(',').map(cat => cat.trim());
        } else if (field === 'slug') {
          updatedBlog.slug = value;
        }
        
        return updatedBlog;
      });
    }
  };
  
  // If not admin, don't render the component
  if (!admin) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-ivory-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Users className="h-6 w-6 text-royal-blue" />
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
              </select>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="title">{t('blog-title')}</Label>
              <Input
                id="title"
                value={isCreatingNew 
                  ? newBlog.title[editLanguage] || ''
                  : selectedBlog?.title[editLanguage] || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={isCreatingNew ? newBlog.slug : selectedBlog?.slug || ''}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={isCreatingNew 
                  ? newBlog.excerpt[editLanguage] || ''
                  : selectedBlog?.excerpt[editLanguage] || ''}
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
                  ? newBlog.content[editLanguage] || ''
                  : selectedBlog?.content[editLanguage] || ''}
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
                  : selectedBlog?.categories.join(', ') || ''}
                onChange={(e) => handleInputChange('categories', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                value={isCreatingNew 
                  ? newBlog.metaDescription[editLanguage] || ''
                  : selectedBlog?.metaDescription[editLanguage] || ''}
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
