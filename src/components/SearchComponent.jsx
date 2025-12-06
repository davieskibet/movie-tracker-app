// src/components/SearchComponent.jsx
import React, { useState } from 'react';
import { searchTMDB } from '../api/tmdb'; // <--- ADD THIS IMPORT
// ... other code

// Define the available media types for the toggle buttons
const MEDIA_TYPES = ['movie/tv', 'book'];

const SearchComponent = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [mediaType, setMediaType] = useState('movie/tv'); // Default search type
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  // This function will handle the API call logic later
  // This function will handle the API call logic
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Check if the current search type is for TMDB
    if (mediaType === 'movie/tv') {
      setIsLoading(true);
      try {
        // 1. CALL THE API HANDLER
        const rawResults = await searchTMDB(query);
        
        // 2. Filter out items without titles or posters (like person results)
        const filteredResults = rawResults.filter(
          item => (item.media_type === 'movie' || item.media_type === 'tv') && item.title !== undefined && item.poster_path
        );
        
        // 3. Pass the raw, filtered results up to the Dashboard state
        onSearchResults(filteredResults);

      } catch (error) {
        console.error("Search failed:", error);
        onSearchResults([]); // Clear results on error
      } finally {
        setIsLoading(false);
      }
    } else {
      // TODO: Open Library search logic will go here
      console.log("Book search is not yet implemented.");
      onSearchResults([]);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-lg">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        
        {/* 1. Search Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${mediaType === 'book' ? 'books' : 'movies or TV shows'}...`}
          className="flex-1 p-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
          disabled={isLoading}
        />

        {/* 2. Media Type Toggle Buttons */}
        <div className="flex bg-gray-700 rounded-lg p-1 space-x-1">
          {MEDIA_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setMediaType(type)}
              className={`py-2 px-4 rounded-md transition duration-150 text-sm font-medium ${
                mediaType === type
                  ? 'bg-teal-500 text-gray-900 shadow-md'
                  : 'text-gray-300 hover:bg-gray-600'
              }`}
            >
              {type.toUpperCase().replace('/', ' / ')}
            </button>
          ))}
        </div>

        {/* 3. Search Button */}
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md transition duration-200 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;