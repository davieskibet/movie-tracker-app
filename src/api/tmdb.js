// src/api/tmdb.js

// The base URL for the TMDB API
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Access the key securely from the environment variables
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

/**
 * Searches TMDB for movies and TV shows based on a query.
 * @param {string} query The search term entered by the user.
 * @returns {Array} An array of raw search result objects from TMDB.
 */
export const searchTMDB = async (query) => {
  if (!API_KEY) {
    console.error("TMDB API key is missing. Please check your .env file.");
    return []; // Return an empty array if the key is missing
  }

  // The 'multi' search endpoint searches both movies and TV shows simultaneously
  const url = `${TMDB_BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Throw an error if the HTTP status is not 2xx
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // TMDB returns an object with a 'results' array
    return data.results; 

  } catch (error) {
    console.error("Error fetching data from TMDB:", error);
    return []; // Return an empty array on error
  }
};