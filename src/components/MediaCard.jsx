// src/components/MediaCard.jsx
import React from 'react';
import { getStatusLabel, getStatusClass, getNextStatus } from '../utils/statusUtils';
import { HiOutlinePlus, HiOutlineTrash, HiOutlineArrowPath, HiOutlineBookOpen } from 'react-icons/hi2';

// src/components/MediaCard.jsx

const MediaCard = ({ item, onAdd, isSaved = false, onStatusChange, onDelete }) => {
    
    // DEBUG: This will show you exactly what data the card is receiving
    // console.log("Rendering Card for:", item.title, item);

    const getImageUrl = () => {
    // 1. Log the item to your browser console so we can see what's inside
    console.log("Card Data for:", item.title, "Path is:", item.posterPath || item.poster_path);

    const path = item.posterPath || item.poster_path || item.imageUrl;
    
    // 2. Check if the path is actually there
    if (!path || path === "null" || path === "undefined") {
        return 'https://placehold.co/500x750/090b49/ffffff?text=No+Poster';
    }

    if (item.mediaType === 'book' || item.sourceAPI === 'OpenLibrary') {
        return `https://covers.openlibrary.org${path}`;
    }

    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `https://image.tmdb.org/t/p/w500${cleanPath}`;
};

    const imageUrl = getImageUrl();

    // 2. DATA NORMALIZATION
    const title = item.title || item.name;
    const year = item.year || (item.release_date || item.first_air_date)?.substring(0, 4) || 'N/A';
    const typeLabel = item.mediaType === 'movie' ? 'Movie' : item.mediaType === 'tv' ? 'TV Show' : 'Book';

    return (
        <div className="group bg-deep-blue/30 rounded-brand overflow-hidden border border-white/5 hover:border-brand-cyan-600/40 transition-all duration-300 shadow-xl relative flex flex-col h-full">
            
            {/* --- Status Badge & Delete (Saved Only) --- */}
            {isSaved && (
                <>
                    <div className="absolute top-3 left-3 z-20">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border shadow-sm uppercase tracking-wider ${getStatusClass(item.status)}`}>
                            {getStatusLabel(item.status)}
                        </span>
                    </div>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="absolute top-3 right-3 p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-full transition-all z-20 backdrop-blur-md border border-red-500/20"
                    >
                        <HiOutlineTrash size={16} />
                    </button>
                </>
            )}

            {/* --- Image Section --- */}
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-900">
                <img 
    src={imageUrl} 
    alt={title} 
    className="w-full h-full object-cover block" // Added 'block' to ensure it takes up space
    style={{ minHeight: '300px' }} // Force it to have height so you can see it
    loading="lazy"
/>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-60" />
            </div>

            {/* --- Content Section --- */}
            <div className="p-4 flex flex-col flex-grow justify-between">
                <div className="mb-4">
                    <h3 className="text-sm font-bold truncate text-white group-hover:text-brand-cyan-600 transition-colors" title={title}>
                        {title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        {item.mediaType === 'book' && <HiOutlineBookOpen className="text-brand-cyan-600" />}
                        <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                            {typeLabel} • {year}
                        </p>
                    </div>
                    {item.author && (
                        <p className="text-[11px] text-slate-400 italic mt-1 truncate">By {item.author}</p>
                    )}
                </div>
                
                {isSaved ? (
                    <button
                        onClick={() => onStatusChange(item.id)}
                        className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-brand-cyan-600 text-slate-300 hover:text-white font-bold py-2.5 rounded-brand transition-all duration-200 border border-white/10 hover:border-brand-cyan-600 text-xs uppercase tracking-widest"
                    >
                        <HiOutlineArrowPath className="text-lg" />
                        {getStatusLabel(getNextStatus(item.status))}
                    </button>
                ) : (
                    <button
                        onClick={() => onAdd(item)}
                        className="w-full flex items-center justify-center gap-2 bg-brand-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 rounded-brand transition-all duration-200 shadow-lg shadow-cyan-900/20 text-xs uppercase tracking-widest"
                    >
                        <HiOutlinePlus className="text-lg" />
                        Add to List
                    </button>
                )}
            </div>
        </div>
    );
};

export default MediaCard;