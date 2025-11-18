/**
 * Form validation utilities
 */

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password) => {
  return password && password.length >= 6 && password.length <= 100;
};

// Password confirmation validation
export const passwordsMatch = (password, passwordConfirmation) => {
  return password === passwordConfirmation;
};

// Concert notes validation
export const isValidNotes = (notes) => {
  return notes && notes.length >= 10 && notes.length <= 5000;
};

// Concert rating validation
export const isValidRating = (rating) => {
  return rating >= 1 && rating <= 5;
};

// Concert ID validation
export const isValidConcertId = (id) => {
  return id && Number.isInteger(Number(id)) && Number(id) > 0;
};

// City name validation
export const isValidCity = (city) => {
  return city && city.trim().length > 0;
};

// Venue name validation
export const isValidVenue = (venue) => {
  return venue && venue.trim().length > 0;
};

// Artist name validation
export const isValidArtist = (artist) => {
  return artist && artist.trim().length > 0;
};

// Date validation
export const isValidDate = (date) => {
  return date && !isNaN(new Date(date).getTime());
};

// Genre validation (optional but if provided, should not be empty)
export const isValidGenre = (genre) => {
  return !genre || genre.trim().length > 0;
};

// Image URL validation (optional but if provided, should be valid URL)
export const isValidImageUrl = (url) => {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
