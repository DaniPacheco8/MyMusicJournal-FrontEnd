import client from './client';

const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
};

/**
 * Register a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} passwordConfirmation - Password confirmation
 * @returns {Promise<Object>} User data
 */
export const registerUser = async (email, password, passwordConfirmation) => {
  try {
    const response = await client.post(AUTH_ENDPOINTS.REGISTER, {
      email,
      password,
      passwordConfirmation,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Token and user data
 */
export const loginUser = async (email, password) => {
  try {
    const response = await client.post(AUTH_ENDPOINTS.LOGIN, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

/**
 * Logout user
 * @returns {Promise<Object>} Logout response
 */
export const logoutUser = async () => {
  try {
    const response = await client.post(AUTH_ENDPOINTS.LOGOUT);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Logout failed' };
  }
};
