// src/api/dataMapper.js

/**
 * Maps raw data from the TMDB API response into the unified MediaItem schema.
 * @param {Object} rawItem - The raw JSON object from the TMDB API.
 * @returns {Object} A unified MediaItem object.
 */
export const normalizeTmdbData = (rawItem) => {
  
  const isMovie = rawItem.media_type === 'movie';
  const itemTitle = isMovie ? rawItem.title : rawItem.name;
  const itemYear = isMovie ? rawItem.release_date : rawItem.first_air_date;

  return {
    // CRITICAL: Ensure unique ID by prefixing the source (e.g., tmdb-12345)
    id: `tmdb-${rawItem.id}`, 
    
    title: itemTitle || 'Untitled',
    year: itemYear ? itemYear.substring(0, 4) : 'N/A', // Extract year
    
    mediaType: rawItem.media_type === 'movie' ? 'movie' : 'tv',
    status: 'wantToWatch', // Default status upon adding
    
    // Poster path only—the base URL is prefixed in MediaCard.jsx
    imageUrl: rawItem.poster_path, 
    
    sourceId: rawItem.id,
    sourceAPI: 'TMDB',
    
    description: rawItem.overview || 'No description available.',
    // Set book-specific fields to null
    author: null,
    runtime: null, 
  };
};

// ... (Other functions like normalizeOpenLibraryData)

/**
 * Placeholder for Open Library normalization function.
 */
export const normalizeOpenLibraryData = (rawItem) => {
    // You will implement this later after fetching book data.
    return {
        id: `ol-XXXX`,
        title: rawItem.title,
        mediaType: 'book',
        status: 'wantToWatch',
        // etc.
    };
};