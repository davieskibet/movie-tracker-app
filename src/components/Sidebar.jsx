// src/components/Sidebar.jsx
import React from 'react';

// Define the filter categories and their display names
const FILTERS = [
    { key: 'all', label: 'All Media' },
    { key: 'movie', label: 'Movies' },
    { key: 'tv', label: 'TV Shows' },
    { key: 'book', label: 'Books' },
    { key: 'wantToWatch', label: 'Want to Watch' },
    { key: 'watching', label: 'Watching/Reading' },
    { key: 'completed', label: 'Completed' },
];

// Helper function to dynamically change button color based on selection
const getButtonClass = (filterKey, currentFilter) => 
    `w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-semibold mt-1 ${
        filterKey === currentFilter 
            ? 'bg-teal-600 text-gray-900 hover:bg-teal-500' 
            : 'text-gray-300 hover:bg-gray-700'
    }`;


const Sidebar = ({ totalItems, currentFilter, onFilterChange, onClearAll }) => {
    return (
        <aside className="w-64 bg-gray-800 p-4 shadow-xl">
            <h2 className="text-2xl font-bold">Navigation</h2>
            
            <p className="mt-4 text-sm text-gray-500">Total Items: {totalItems}</p>
            
            <div className="mt-6 space-y-2">
                {FILTERS.map(filterItem => (
                    <button
                        key={filterItem.key}
                        // Calls the function passed down from Dashboard with the key
                        onClick={() => onFilterChange(filterItem.key)}
                        className={getButtonClass(filterItem.key, currentFilter)}
                    >
                        {filterItem.label}
                    </button>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-500">List Actions</p>
                {/* Delete All button placeholder - will be implemented later */}
                <button
                    className="w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-semibold mt-2 bg-red-800 text-white hover:bg-red-700"
                    onClick={onClearAll}
                >
                    ⚠️ Delete All Data
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;