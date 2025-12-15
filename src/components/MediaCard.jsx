// src/components/MediaCard.jsx
import React from 'react';
import { getStatusLabel, getStatusClass, getNextStatus } from '../utils/statusUtils';

// TMDB base URL for images
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MediaCard = ({ item, onAdd, isSaved = false, onStatusChange, onDelete }) => {
    
    // Determine if it's a Movie or TV Show for the title and year
    const isMovie = item.media_type === 'movie';
    const title = isMovie ? item.title : item.name;
    const year = isMovie ? (item.release_date ? item.release_date.substring(0, 4) : 'N/A') : (item.first_air_date ? item.first_air_date.substring(0, 4) : 'N/A');
    const typeLabel = isMovie ? 'Movie' : 'TV Show';

    // Fallback image if poster is missing
    const imageUrl = item.poster_path 
        ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=No+Image';

    return (
        // Outer container: Must be relative for absolute positioning of badge/delete button
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transform hover:scale-[1.03] transition duration-300 relative">
            
            {/* ⭐️ FINAL: Status Badge at Top Left ⭐️ */}
            {isSaved && (
                <span 
                    // This combines the badge styling with the status-specific color class
                    className={`absolute top-2 left-2 z-10 text-xs font-bold px-2 py-0.5 rounded-full ${getStatusClass(item.status)}`}
                >
                    {getStatusLabel(item.status)}
                </span>
            )}
            
            {/* ⭐️ FINAL: Delete Button at Top Right ⭐️ */}
            {isSaved && (
                <button
                    onClick={() => onDelete(item.id)}
                    className="absolute top-2 right-2 p-1 bg-red-700 hover:bg-red-600 rounded-full text-white text-xs opacity-80 z-10 shadow-lg"
                    aria-label="Delete item"
                >
                    X
                </button>
            )}

            {/* 1. Media Image/Poster */}
            <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-72 object-cover object-center" 
                loading="lazy"
            />

            <div className="p-4">
                
                {/* 2. Title and Year */}
                <h3 className="text-lg font-bold truncate text-teal-400" title={title}>
                    {title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                    {typeLabel} • {year}
                </p>
                
                {/* 3. Conditional Button Rendering */}
                {isSaved ? (
                    // This button cycles the status for SAVED items
                    <button
                        onClick={() => onStatusChange(item.id)}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-gray-900 font-semibold py-2 rounded-lg transition duration-150 text-sm"
                    >
                        Cycle Status (Next: {getStatusLabel(getNextStatus(item.status))})
                    </button>
                ) : (
                    // This button adds the item for SEARCH RESULTS
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