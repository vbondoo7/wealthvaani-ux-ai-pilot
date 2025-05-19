
import useUserStore from './userStore';
import { User } from './types';

/**
 * Authenticate a user with email and password
 * 
 * @param email User's email
 * @param password User's password
 * @returns The authenticated user object
 * @throws Error if authentication fails
 */
export async function loginUser(email: string, password: string): Promise<User> {
  // Get the user store state
  const userStore = useUserStore.getState();
  
  try {
    // Simulate API call with a small delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const success = userStore.login(email, password);
    if (success) {
      // Store credentials for auto-login
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', password);
      
      return userStore.currentUser as User;
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error instanceof Error ? error.message : 'Login failed';
  }
}

/**
 * Register a new user
 * 
 * @param name User's full name
 * @param email User's email
 * @param password User's password
 * @returns True if registration was successful
 * @throws Error if registration fails
 */
export async function registerUser(name: string, email: string, password: string): Promise<boolean> {
  // Get the user store state
  const userStore = useUserStore.getState();
  
  try {
    // Simulate API call with a small delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const success = userStore.register(email, password, name);
    if (success) {
      return true;
    } else {
      throw new Error('Email already registered');
    }
  } catch (error) {
    console.error('Registration failed:', error);
    throw error instanceof Error ? error.message : 'Registration failed';
  }
}

/**
 * Log out the current user
 */
export function logoutUser(): void {
  const userStore = useUserStore.getState();
  userStore.logout();
}
