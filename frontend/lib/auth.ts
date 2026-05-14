/**
 * Client-side authentication utilities
 */

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'customer';
}

/**
 * Save authentication token to localStorage
 */
export const saveToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * Get authentication token from localStorage
 */
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

/**
 * Remove authentication token
 */
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

/**
 * Save user data to localStorage
 */
export const saveUser = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

/**
 * Get user data from localStorage
 */
export const getUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

/**
 * Check if user is admin
 */
export const isAdmin = (): boolean => {
  const user = getUser();
  return user?.role === 'admin';
};

/**
 * Logout user
 */
export const logout = () => {
  removeToken();
  // Redirect handled by router
};
