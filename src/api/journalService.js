import client from './client';

const JOURNAL_ENDPOINTS = {
  LIST: '/journal',
  GET_BY_ID: '/journal/:id',
  CREATE: '/journal',
  UPDATE: '/journal/:id',
  DELETE: '/journal/:id',
};

/**
 * Get all journal entries for the authenticated user
 * @param {Object} filters - Filter parameters
 * @param {number} filters.year - Filter by concert year
 * @param {string} filters.city - Filter by concert city
 * @param {string} filters.genre - Filter by concert genre
 * @returns {Promise<Array>} List of journal entries
 */
export const getJournalEntries = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.year) params.append('year', filters.year);
    if (filters.city) params.append('city', filters.city);
    if (filters.genre) params.append('genre', filters.genre);

    const queryString = params.toString();
    const url = queryString
      ? `${JOURNAL_ENDPOINTS.LIST}?${queryString}`
      : JOURNAL_ENDPOINTS.LIST;

    const response = await client.get(url);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: 'Failed to fetch journal entries' }
    );
  }
};

/**
 * Get a specific journal entry
 * @param {number} id - Journal entry ID
 * @returns {Promise<Object>} Journal entry data
 */
export const getJournalEntryById = async (id) => {
  try {
    const response = await client.get(
      JOURNAL_ENDPOINTS.GET_BY_ID.replace(':id', id)
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch journal entry' };
  }
};

/**
 * Create a new journal entry
 * @param {Object} entry - Journal entry data
 * @param {number} entry.concertId - Concert ID (required)
 * @param {string} entry.personalNotes - Personal notes (required, 10-5000 chars)
 * @param {number} entry.rating - Rating 1-5 (required)
 * @param {string} entry.backgroundImage - Image URL (optional)
 * @returns {Promise<Object>} Created journal entry
 */
export const createJournalEntry = async (entry) => {
  try {
    const response = await client.post(JOURNAL_ENDPOINTS.CREATE, {
      concertId: entry.concertId,
      personalNotes: entry.personalNotes,
      rating: entry.rating,
      backgroundImage: entry.backgroundImage || null,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create journal entry' };
  }
};

/**
 * Update a journal entry
 * @param {number} id - Journal entry ID
 * @param {Object} entry - Updated journal entry data
 * @param {number} entry.concertId - Concert ID
 * @param {string} entry.personalNotes - Personal notes
 * @param {number} entry.rating - Rating 1-5
 * @param {string} entry.backgroundImage - Image URL (optional)
 * @returns {Promise<Object>} Updated journal entry
 */
export const updateJournalEntry = async (id, entry) => {
  try {
    const response = await client.put(
      JOURNAL_ENDPOINTS.UPDATE.replace(':id', id),
      {
        concertId: entry.concertId,
        personalNotes: entry.personalNotes,
        rating: entry.rating,
        backgroundImage: entry.backgroundImage || null,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update journal entry' };
  }
};

/**
 * Delete a journal entry
 * @param {number} id - Journal entry ID
 * @returns {Promise<void>}
 */
export const deleteJournalEntry = async (id) => {
  try {
    await client.delete(JOURNAL_ENDPOINTS.DELETE.replace(':id', id));
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete journal entry' };
  }
};
