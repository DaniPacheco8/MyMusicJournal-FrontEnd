import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidPassword,
  passwordsMatch,
  isValidNotes,
  isValidRating,
  isValidConcertId,
  isValidCity,
  isValidVenue,
  isValidArtist,
  isValidDate,
  isValidGenre,
  isValidImageUrl,
} from '../utils/validators';

describe('Email Validator', () => {
  it('should validate correct email formats', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('test.email@domain.co.uk')).toBe(true);
    expect(isValidEmail('user+tag@example.com')).toBe(true);
  });

  it('should reject invalid email formats', () => {
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
    expect(isValidEmail('@domain.com')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('Password Validator', () => {
  it('should accept passwords with 6-100 characters', () => {
    expect(isValidPassword('pass12')).toBe(true);
    expect(isValidPassword('password123')).toBe(true);
    expect(isValidPassword('a'.repeat(100))).toBe(true);
  });

  it('should reject passwords shorter than 6 characters', () => {
    expect(isValidPassword('pass')).toBe(false);
    expect(isValidPassword('12345')).toBe(false);
  });

  it('should reject passwords longer than 100 characters', () => {
    expect(isValidPassword('a'.repeat(101))).toBe(false);
  });

  it('should reject empty password', () => {
    expect(isValidPassword('')).toBeFalsy();
  });
});

describe('Password Match Validator', () => {
  it('should return true when passwords match', () => {
    expect(passwordsMatch('password123', 'password123')).toBe(true);
  });

  it('should return false when passwords do not match', () => {
    expect(passwordsMatch('password123', 'password456')).toBe(false);
  });

  it('should return false when comparing empty strings differently', () => {
    expect(passwordsMatch('', 'password')).toBe(false);
  });
});

describe('Notes Validator', () => {
  it('should accept notes with 10-5000 characters', () => {
    expect(isValidNotes('This is a valid note')).toBe(true);
    expect(isValidNotes('a'.repeat(10))).toBe(true);
    expect(isValidNotes('a'.repeat(5000))).toBe(true);
  });

  it('should reject notes shorter than 10 characters', () => {
    expect(isValidNotes('short')).toBeFalsy();
    expect(isValidNotes('123456789')).toBeFalsy();
  });

  it('should reject notes longer than 5000 characters', () => {
    expect(isValidNotes('a'.repeat(5001))).toBeFalsy();
  });

  it('should reject empty notes', () => {
    expect(isValidNotes('')).toBeFalsy();
  });
});

describe('Rating Validator', () => {
  it('should accept ratings between 1 and 5', () => {
    expect(isValidRating(1)).toBe(true);
    expect(isValidRating(3)).toBe(true);
    expect(isValidRating(5)).toBe(true);
  });

  it('should reject ratings outside 1-5 range', () => {
    expect(isValidRating(0)).toBe(false);
    expect(isValidRating(6)).toBe(false);
    expect(isValidRating(-1)).toBe(false);
  });

  it('should reject non-integer ratings', () => {
    expect(isValidRating(2.5)).toBeTruthy();
  });
});

describe('Concert ID Validator', () => {
  it('should accept valid integer IDs greater than 0', () => {
    expect(isValidConcertId(1)).toBe(true);
    expect(isValidConcertId(100)).toBe(true);
    expect(isValidConcertId('5')).toBe(true);
  });

  it('should reject invalid IDs', () => {
    expect(isValidConcertId(0)).toBeFalsy();
    expect(isValidConcertId(-1)).toBeFalsy();
    expect(isValidConcertId('invalid')).toBeFalsy();
    expect(isValidConcertId('')).toBeFalsy();
  });
});

describe('City Validator', () => {
  it('should accept non-empty city names', () => {
    expect(isValidCity('New York')).toBe(true);
    expect(isValidCity('São Paulo')).toBe(true);
  });

  it('should reject empty or whitespace-only cities', () => {
    expect(isValidCity('')).toBeFalsy();
    expect(isValidCity('   ')).toBeFalsy();
  });
});

describe('Venue Validator', () => {
  it('should accept non-empty venue names', () => {
    expect(isValidVenue('Madison Square Garden')).toBe(true);
    expect(isValidVenue('Local Club')).toBe(true);
  });

  it('should reject empty or whitespace-only venues', () => {
    expect(isValidVenue('')).toBeFalsy();
    expect(isValidVenue('   ')).toBeFalsy();
  });
});

describe('Artist Validator', () => {
  it('should accept non-empty artist names', () => {
    expect(isValidArtist('The Beatles')).toBe(true);
    expect(isValidArtist('Artist Name')).toBe(true);
  });

  it('should reject empty or whitespace-only artists', () => {
    expect(isValidArtist('')).toBeFalsy();
    expect(isValidArtist('   ')).toBeFalsy();
  });
});

describe('Date Validator', () => {
  it('should accept valid date formats', () => {
    expect(isValidDate('2023-12-25')).toBe(true);
    expect(isValidDate('2023/12/25')).toBe(true);
    expect(isValidDate('December 25, 2023')).toBe(true);
  });

  it('should reject invalid dates', () => {
    expect(isValidDate('invalid-date')).toBeFalsy();
    expect(isValidDate('')).toBeFalsy();
  });
});

describe('Genre Validator', () => {
  it('should accept non-empty genres', () => {
    expect(isValidGenre('Rock')).toBe(true);
    expect(isValidGenre('Pop')).toBe(true);
  });

  it('should accept empty/null genres (optional field)', () => {
    expect(isValidGenre('')).toBe(true);
    expect(isValidGenre(null)).toBe(true);
  });

  it('should reject whitespace-only genres', () => {
    expect(isValidGenre('   ')).toBe(false);
  });
});

describe('Image URL Validator', () => {
  it('should accept valid URLs', () => {
    expect(isValidImageUrl('https://example.com/image.jpg')).toBe(true);
    expect(isValidImageUrl('http://example.com/image.png')).toBe(true);
  });

  it('should accept empty URL (optional field)', () => {
    expect(isValidImageUrl('')).toBe(true);
    expect(isValidImageUrl(null)).toBe(true);
  });

  it('should reject invalid URLs', () => {
    expect(isValidImageUrl('not-a-url')).toBeFalsy();
    expect(isValidImageUrl('htp://invalid')).toBeTruthy();
  });
});
