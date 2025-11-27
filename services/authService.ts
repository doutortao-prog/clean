import { User } from '../types';

const STORAGE_KEY = 'cleanmaster_user';

export const registerUser = (user: User, password: string): boolean => {
  // In a real app, this would hit an API.
  // We simulate saving to local storage for the demo.
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    // We strictly wouldn't store passwords in plaintext/localstorage in prod, 
    // but this simulates the successful registration flow.
    localStorage.setItem('cleanmaster_auth_token', 'mock-token-' + Date.now());
    return true;
  } catch (error) {
    console.error("Registration failed", error);
    return false;
  }
};

export const loginUser = (email: string, password: string): User | null => {
  try {
    const stored = localStorage.setItem('cleanmaster_last_login', new Date().toISOString());
    // For demo purposes, we accept any login if a user exists in storage 
    // or just return a mock user if the credentials "match" our simulation.
    // Let's check if we have a registered user.
    const userStr = localStorage.getItem(STORAGE_KEY);
    if (userStr) {
      const user = JSON.parse(userStr) as User;
      if (user.email === email) {
        localStorage.setItem('cleanmaster_auth_token', 'mock-token-' + Date.now());
        return user;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('cleanmaster_auth_token');
};

export const getCurrentUser = (): User | null => {
  const token = localStorage.getItem('cleanmaster_auth_token');
  if (!token) return null;
  
  const userStr = localStorage.getItem(STORAGE_KEY);
  return userStr ? JSON.parse(userStr) : null;
};