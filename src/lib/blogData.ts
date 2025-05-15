
import { BlogPost, LanguageOption } from './types';

// Sample blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'understanding-mutual-funds',
    author: 'Ravi Kumar',
    date: '2025-04-10',
    category: 'Investments',
    featuredImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop',
    keywords: ['mutual funds', 'investments', 'finance', 'wealth'],
    title: {
      en: 'Understanding Mutual Funds: A Beginner\'s Guide',
      hi: 'म्यूचुअल फंड समझना: एक शुरुआती गाइड',
      hinglish: 'Mutual Funds ko Samajhna: Ek Beginner\'s Guide',
      bn: 'Understanding Mutual Funds: A Beginner\'s Guide',
      ta: 'Understanding Mutual Funds: A Beginner\'s Guide',
      te: 'Understanding Mutual Funds: A Beginner\'s Guide',
      pa: 'Understanding Mutual Funds: A Beginner\'s Guide',
      ml: 'Understanding Mutual Funds: A Beginner\'s Guide',
      gu: 'Understanding Mutual Funds: A Beginner\'s Guide'
    },
    content: {
      en: 'Mutual funds are investment vehicles that pool money from multiple investors to purchase securities like stocks, bonds, and other assets. They offer diversification, professional management, and liquidity, making them an excellent choice for beginners. When you invest in a mutual fund, you\'re buying units or shares of the fund, which represent a portion of the fund\'s holdings. Funds can be actively managed by professionals or passively track an index. Different types include equity funds, debt funds, hybrid funds, and more, each with varying risk profiles and investment objectives. Understanding your risk tolerance and investment goals is crucial before selecting a fund.',
      hi: 'म्यूचुअल फंड ऐसे निवेश वाहन हैं जो प्रतिभूतियों जैसे स्टॉक, बॉन्ड और अन्य संपत्तियों को खरीदने के लिए कई निवेशकों से धन एकत्र करते हैं। वे विविधता, पेशेवर प्रबंधन और तरलता प्रदान करते हैं, जिससे वे शुरुआती लोगों के लिए एक उत्कृष्ट विकल्प हैं। जब आप म्यूचुअल फंड में निवेश करते हैं, तो आप फंड की इकाइयां या शेयर खरीद रहे होते हैं, जो फंड की होल्डिंग्स के एक हिस्से का प्रतिनिधित्व करते हैं। फंड को पेशेवरों द्वारा सक्रिय रूप से प्रबंधित किया जा सकता है या निष्क्रिय रूप से एक इंडेक्स को ट्रैक कर सकता है। विभिन्न प्रकारों में इक्विटी फंड, डेट फंड, हाइब्रिड फंड और अन्य शामिल हैं, प्रत्येक में अलग-अलग जोखिम प्रोफाइल और निवेश उद्देश्य हैं। फंड का चयन करने से पहले अपनी जोखिम सहनशीलता और निवेश लक्ष्यों को समझना महत्वपूर्ण है।',
      hinglish: 'Mutual funds aise investment vehicles hain jo securities jaise stocks, bonds aur doosri assets ko kharidne ke liye multiple investors se paisa collect karte hain. Ye diversification, professional management, aur liquidity offer karte hain, isliye beginners ke liye ye excellent choice hain. Jab aap mutual fund mein invest karte hain, aap fund ke units ya shares kharid rahe hote hain, jo fund ki holdings ka ek portion represent karte hain. Funds ko actively professionals dwara manage kiya ja sakta hai ya passively index ko track kar sakte hain. Different types mein equity funds, debt funds, hybrid funds, aur bhi bahut kuch shamil hain, har ek mein alag-alag risk profiles aur investment objectives hote hain. Fund select karne se pehle apni risk tolerance aur investment goals ko samajhna bahut zaroori hai.',
      bn: 'Mutual funds are investment vehicles that pool money from multiple investors to purchase securities like stocks, bonds, and other assets.',
      ta: 'Mutual funds are investment vehicles that pool money from multiple investors to purchase securities like stocks, bonds, and other assets.',
      te: 'Mutual funds are investment vehicles that pool money from multiple investors to purchase securities like stocks, bonds, and other assets.',
      pa: 'Mutual funds are investment vehicles that pool money from multiple investors to purchase securities like stocks, bonds, and other assets.',
      ml: 'Mutual funds are investment vehicles that pool money from multiple investors to purchase securities like stocks, bonds, and other assets.',
      gu: 'Mutual funds are investment vehicles that pool money from multiple investors to purchase securities like stocks, bonds, and other assets.'
    },
    excerpt: {
      en: 'Learn the fundamentals of mutual funds including how they work, different types, and how to choose the right fund for your financial goals.',
      hi: 'म्यूचुअल फंड के मूल सिद्धांतों को जानें, जिसमें वे कैसे काम करते हैं, विभिन्न प्रकार, और अपने वित्तीय लक्ष्यों के लिए सही फंड कैसे चुनें।',
      hinglish: 'Mutual funds ke fundamentals janiye, including kaise work karte hain, different types, aur apne financial goals ke liye sahi fund kaise choose karen.',
      bn: 'Learn the fundamentals of mutual funds including how they work, different types, and how to choose the right fund for your financial goals.',
      ta: 'Learn the fundamentals of mutual funds including how they work, different types, and how to choose the right fund for your financial goals.',
      te: 'Learn the fundamentals of mutual funds including how they work, different types, and how to choose the right fund for your financial goals.',
      pa: 'Learn the fundamentals of mutual funds including how they work, different types, and how to choose the right fund for your financial goals.',
      ml: 'Learn the fundamentals of mutual funds including how they work, different types, and how to choose the right fund for your financial goals.',
      gu: 'Learn the fundamentals of mutual funds including how they work, different types, and how to choose the right fund for your financial goals.'
    },
    metaDescription: {
      en: 'A comprehensive guide to mutual funds for beginners - understand different types, working principles, and how to choose the right fund for your investment goals.',
      hi: 'शुरुआती लोगों के लिए म्यूचुअल फंड का एक व्यापक मार्गदर्शक - विभिन्न प्रकार, कार्य सिद्धांत, और अपने निवेश लक्ष्यों के लिए सही फंड कैसे चुनें, यह समझें।',
      hinglish: 'Beginners ke liye mutual funds ka ek comprehensive guide - samjhiye different types, working principles, aur kaise choose karein right fund apne investment goals ke liye.',
      bn: 'A comprehensive guide to mutual funds for beginners - understand different types, working principles, and how to choose the right fund for your investment goals.',
      ta: 'A comprehensive guide to mutual funds for beginners - understand different types, working principles, and how to choose the right fund for your investment goals.',
      te: 'A comprehensive guide to mutual funds for beginners - understand different types, working principles, and how to choose the right fund for your investment goals.',
      pa: 'A comprehensive guide to mutual funds for beginners - understand different types, working principles, and how to choose the right fund for your investment goals.',
      ml: 'A comprehensive guide to mutual funds for beginners - understand different types, working principles, and how to choose the right fund for your investment goals.',
      gu: 'A comprehensive guide to mutual funds for beginners - understand different types, working principles, and how to choose the right fund for your investment goals.'
    }
  }
  // Additional blog posts can be added here
];

// CRUD operations for blog posts

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const addBlogPost = (post: BlogPost): void => {
  blogPosts.push(post);
};

export const updateBlogPost = (updatedPost: BlogPost): void => {
  const index = blogPosts.findIndex(post => post.id === updatedPost.id);
  if (index !== -1) {
    blogPosts[index] = updatedPost;
  }
};

export const deleteBlogPost = (id: string): void => {
  const index = blogPosts.findIndex(post => post.id === id);
  if (index !== -1) {
    blogPosts.splice(index, 1);
  }
};
