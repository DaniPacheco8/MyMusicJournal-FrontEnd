import client from './client';

const CONCERT_ENDPOINTS = {
  LIST: '/concerts',
  GET_BY_ID: '/concerts/:id',
  GET_MAP: '/concerts/map',
};

/**
 * Get all concerts with optional filters
 * @param {Object} filters - Filter parameters
 * @param {number} filters.year - Filter by year
 * @param {string} filters.city - Filter by city
 * @param {string} filters.genre - Filter by genre
 * @returns {Promise<Array>} List of concerts
 */
export const getConcerts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.year) params.append('year', filters.year);
    if (filters.city) params.append('city', filters.city);
    if (filters.genre) params.append('genre', filters.genre);

    const queryString = params.toString();
    const url = queryString
      ? `${CONCERT_ENDPOINTS.LIST}?${queryString}`
      : CONCERT_ENDPOINTS.LIST;

    const response = await client.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch concerts' };
  }
};

/**
 * Get concert by ID
 * @param {number} id - Concert ID
 * @returns {Promise<Object>} Concert data
 */
export const getConcertById = async (id) => {
  try {
    const response = await client.get(
      CONCERT_ENDPOINTS.GET_BY_ID.replace(':id', id)
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch concert' };
  }
};

/**
 * Get concerts for map (user attended concerts)
 * @returns {Promise<Array>} List of concerts with coordinates
 */
export const getConcertsForMap = async () => {
  try {
    const response = await client.get(CONCERT_ENDPOINTS.GET_MAP);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch map concerts' };
  }
};
