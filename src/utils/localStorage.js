/**
 * LocalStorage utility functions for managing app data
 */

const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  REFRESH_TOKEN: 'refreshToken',
};

// Auth Token
export const setAuthToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const removeAuthToken = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
};

// User Data
export const setUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Clear all auth data
export const clearAuthData = () => {
  removeAuthToken();
  removeUser();
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return Boolean(getAuthToken());
};
