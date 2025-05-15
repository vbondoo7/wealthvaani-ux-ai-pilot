
import { AdminUser } from './types';

// Admin user credentials (in a real app, this would be stored in a secure database)
const adminUser: AdminUser = {
  email: "admin@wealthvani.com",
  password: "Vishal#123",
  isAdmin: true
};

// Check if user is an admin
export const isAdminUser = (email: string, password: string): boolean => {
  return email === adminUser.email && password === adminUser.password;
};

// In a real app, we would have more secure methods for handling admin authentication
export const getAuthenticatedAdmin = (): AdminUser | null => {
  const storedAdmin = localStorage.getItem('wealthvani-admin');
  if (storedAdmin) {
    return JSON.parse(storedAdmin) as AdminUser;
  }
  return null;
};

export const loginAdmin = (email: string, password: string): boolean => {
  if (isAdminUser(email, password)) {
    const adminData = { email, isAdmin: true };
    localStorage.setItem('wealthvani-admin', JSON.stringify(adminData));
    return true;
  }
  return false;
};

export const logoutAdmin = (): void => {
  localStorage.removeItem('wealthvani-admin');
};
