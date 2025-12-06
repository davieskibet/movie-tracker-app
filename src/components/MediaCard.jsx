// src/components/MediaCard.jsx
import React from 'react';
import { getStatusLabel } from '../utils/statusUtils'; // <--- ADD THIS IMPORT
// ... (rest of imports/constants) ...

// TMDB base URL for images
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MediaCard = ({ item, onAdd, isSaved = false, onStatusChange, onDelete }) => {
  
  // Determine if it's a Movie or TV Show for the title and year
  const isMovie = item.media_type === 'movie';
  const title = isMovie ? item.title : item.name;
  const year = isMovie ? (item.release_date ? item.release_date.substring(0, 4) : 'N/A') : (item.first_air_date ? item.first_air_date.substring(0, 4) : 'N/A');
  const typeLabel = isMovie ? 'Movie' : 'TV Show';

  // Fallback image if poster is missing (though we filtered those out)
  const imageUrl = item.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  // src/components/MediaCard.jsx

// ... (Rest of the component above the return statement is CORRECT) ...

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transform hover:scale-[1.03] transition duration-300 relative">
      
      {/* 1. Media Image/Poster */}
      {/* ... (Image tag) ... */}
      <img 

        src={imageUrl} 

        alt={title} 

        className="w-full h-72 object-cover object-center" 

        loading="lazy"

      />

      {isSaved && (
        <span 
            className={`absolute top-2 left-2 z-10 ${getStatusClass(item.status)}`}
        >
            {getStatusLabel(item.status)}
        </span>
    )}
        {isSaved && (
        // ⭐️ NEW DELETE BUTTON ⭐️
        <button
            onClick={() => onDelete(item.id)}
            className="absolute top-2 right-2 p-1 bg-red-700 hover:bg-red-600 rounded-full text-white text-xs opacity-80 z-10"
            aria-label="Delete item"
        >
            {/* A simple 'X' or trash icon would be better, but we use a character for now */}
            X
        </button>
    )}
      <div className="p-4">
        
        {/* 2. Title and Year */}
        <h3 className="text-lg font-bold truncate text-teal-400" title={title}>
          {title}
        </h3>
        <p className="text-sm text-gray-400 mb-2">
          {typeLabel} • {year}
        </p>
        
        {/* ⭐️ FIX IS HERE: Conditional Button Rendering ⭐️ */}
        {isSaved ? (
            // This button displays for SAVED items (from the mediaList)
            <button
        // ⭐️ ADD onClick handler here ⭐️
        onClick={() => onStatusChange(item.id)}
        // Use getStatusLabel for better readability on the button
       className="w-full bg-teal-600 hover:bg-teal-700 text-gray-900 font-semibold py-2 rounded-lg transition duration-150 text-sm"
    >
        Cycle Status ({getStatusLabel(getNextStatus(item.status))})
    </button>
        ) : (
            // This button displays for SEARCH RESULTS
            <button
                onClick={() => onAdd(item)}
               className="w-full bg-teal-600 hover:bg-teal-700 text-gray-900 font-semibold py-2 rounded-lg transition duration-150 text-sm"
            >
                + Add to List
            </button>
        )}
        
      </div>
    </div>
  );
};



export default MediaCard;