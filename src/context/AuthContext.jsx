import { createContext, useState, useCallback, useEffect } from 'react';
import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getUser,
  setUser,
  removeUser,
} from '../utils/localStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [token, setTokenState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = getAuthToken();
    const storedUser = getUser();

    if (storedToken && storedUser) {
      setTokenState(storedToken);
      setUserState(storedUser);
    }

    setIsLoading(false);
  }, []);

  const login = useCallback((userData, authToken) => {
    setUserState(userData);
    setTokenState(authToken);
    setUser(userData);
    setAuthToken(authToken);
    setError(null);
  }, []);

  const register = useCallback((userData, authToken) => {
    setUserState(userData);
    setTokenState(authToken);
    setUser(userData);
    setAuthToken(authToken);
    setError(null);
  }, []);

  const logout = useCallback(() => {
    setUserState(null);
    setTokenState(null);
    removeUser();
    removeAuthToken();
    setError(null);
  }, []);

  const updateUser = useCallback((updatedUser) => {
    setUserState(updatedUser);
    setUser(updatedUser);
  }, []);

  const setAuthError = useCallback((errorMessage) => {
    setError(errorMessage);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    logout,
    updateUser,
    setAuthError,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
