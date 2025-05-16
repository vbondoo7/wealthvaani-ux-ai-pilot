
import { adminUser } from './config';

export const loginAdmin = (email: string, password: string): boolean => {
  if (email === adminUser.email && password === adminUser.password) {
    // Store admin authentication state in local storage to persist across page reloads
    localStorage.setItem('adminLoggedIn', 'true');
    localStorage.setItem('adminUser', JSON.stringify({
      id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email,
      isAdmin: true
    }));
    return true;
  }
  return false;
};

export const isAdminLoggedIn = (): boolean => {
  return localStorage.getItem('adminLoggedIn') === 'true';
};

export const getAdminUser = () => {
  const adminData = localStorage.getItem('adminUser');
  if (adminData) {
    return JSON.parse(adminData);
  }
  return null;
};

export const logoutAdmin = (): void => {
  localStorage.removeItem('adminLoggedIn');
  localStorage.removeItem('adminUser');
};

// Admin services for blog management
export const getBlogAnalytics = () => {
  // Mock data for blog analytics
  return {
    totalPosts: 24,
    totalViews: 15632,
    popularCategories: [
      { name: 'Investment', count: 8, views: 6245 },
      { name: 'Saving', count: 6, views: 4120 },
      { name: 'Retirement', count: 5, views: 2876 },
      { name: 'Tax', count: 3, views: 1523 },
      { name: 'Insurance', count: 2, views: 868 }
    ],
    recentComments: [
      { user: 'Rahul S.', post: 'How to Plan for Retirement', content: 'This was very helpful!', date: '2025-05-15' },
      { user: 'Priya M.', post: 'Tax Saving Tips', content: 'I learned so much from this.', date: '2025-05-14' },
      { user: 'Vikram J.', post: 'Investment Strategies', content: 'Great advice for beginners.', date: '2025-05-13' }
    ]
  };
};
