// src/api/dataMapper.js

/**
 * Maps raw data from the TMDB API (Movies/TV) into the unified MediaItem schema.
 * This version is resilient to both raw API responses and already-saved objects.
 */
export const normalizeTmdbData = (rawItem) => {
    // 1. Identify Media Type (Resilient check)
    const isMovie = rawItem.media_type === 'movie' || !!rawItem.title || rawItem.mediaType === 'movie';
    
    // 2. Resolve Title
    const title = (isMovie ? (rawItem.title || rawItem.original_title) : (rawItem.name || rawItem.original_name)) || 'Untitled';
    
    // 3. Resolve Poster Path (Supports raw 'poster_path' or already mapped 'posterPath')
    const pPath = rawItem.poster_path || rawItem.posterPath || rawItem.imageUrl;

    // 4. Resolve Date/Year
    const rawDate = isMovie ? (rawItem.release_date || rawItem.releaseDate) : (rawItem.first_air_date || rawItem.firstAirDate);
    const year = rawDate ? rawDate.toString().substring(0, 4) : 'N/A';

    return {
        // Unique ID: Ensures search results and library items don't conflict
        id: rawItem.id?.toString().startsWith('tmdb-') ? rawItem.id : `tmdb-${rawItem.id}`, 
        
        title: title,
        posterPath: pPath, // This is the standard field name our MediaCard uses
        
        mediaType: rawItem.media_type || (isMovie ? 'movie' : 'tv'),
        status: rawItem.status || 'wantToWatch', 
        
        year: year,
        description: rawItem.overview || 'No description available.',
        
        // Tracking info
        sourceId: rawItem.id,
        sourceAPI: 'TMDB',
        
        // Metadata placeholders
        author: null,
        runtime: rawItem.runtime || null,
    };
};

/**
 * Maps raw data from the Open Library API (Books) into the unified MediaItem schema.
 */
export const normalizeOpenLibraryData = (rawItem) => {
    // Open Library uses 'cover_i' for their image IDs
    const coverId = rawItem.cover_i;
    
    // We format it so MediaCard can easily prefix the covers.openlibrary.org URL
    const pPath = coverId ? `/b/id/${coverId}-M.jpg` : (rawItem.posterPath || null);

    return {
        // Unique ID for books
        id: rawItem.key?.startsWith('ol-') ? rawItem.key : `ol-${rawItem.key?.replace('/works/', '')}`,
        
        title: rawItem.title || 'Unknown Title',
        posterPath: pPath, 
        
        mediaType: 'book',
        status: rawItem.status || 'wantToWatch',
        
        year: rawItem.first_publish_year?.toString() || 'N/A',
        author: rawItem.author_name ? rawItem.author_name[0] : 'Unknown Author',
        description: rawItem.first_sentence ? rawItem.first_sentence[0] : 'No description available.',
        
        sourceId: rawItem.key,
        sourceAPI: 'OpenLibrary',
    };
};