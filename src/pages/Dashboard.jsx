// src/pages/Dashboard.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { getNextStatus } from '../utils/statusUtils'; // <--- ADD THIS IMPORT
// ... other imports ...
import { loadLists, saveLists } from '../utils/localStorage';
import SearchComponent from '../components/SearchComponent';
import { normalizeTmdbData } from '../api/dataMapper';
import MediaCard from '../components/MediaCard';
import Sidebar from '../components/Sidebar'; // <--- ADD THIS IMPORT

const Dashboard = () => {
    // 1. STATE DEFINITIONS
    const [mediaList, setMediaList] = useState(() => {
        return loadLists();
    });
    
    const [searchResults, setSearchResults] = useState([]);
    
    // ⭐️ NEW STATE: Controls what items are displayed in the main list
    // Manually set to 'movie' here for testing. Change back to 'all' after test.
    const [filter, setFilter] = useState('all'); 

    // 2. PERSISTENCE HOOK
    useEffect(() => {
        saveLists(mediaList);
    }, [mediaList]);

    // ⭐️ NEW LOGIC: Computes the list to display based on the filter ⭐️
    const filteredList = useMemo(() => {
        if (filter === 'all') {
            return mediaList;
        }
        
        // Filter by media type or status (assuming filter string matches item.mediaType or item.status)
        return mediaList.filter(item => 
            item.mediaType === filter || item.status === filter
        );
    }, [mediaList, filter]); 

    // 3. HANDLER FUNCTIONS
    const handleNewResults = (results) => {
        setSearchResults(results);
    };

    const handleAddItem = (rawItem) => {
        const newItem = normalizeTmdbData(rawItem);
        
        // Check for duplicates before adding
        const isDuplicate = mediaList.some(item => item.id === newItem.id); 

        if (isDuplicate) {
            console.warn(`Item already in list: ${newItem.title}`);
            return;
        }

        setMediaList(prevList => [...prevList, newItem]);
        setSearchResults([]);
        console.log(`Added ${newItem.title} to the list!`);
    };

    const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSearchResults([]); // Clear search results whenever the filter changes
};

const handleStatusChange = (itemId) => {
    setMediaList(prevList => 
        prevList.map(item => 
            item.id === itemId 
                ? { ...item, status: getNextStatus(item.status) } 
                : item
        )
    );
    console.log(`Status changed for item ID: ${itemId}`);
};
// ⭐️ NEW HANDLER: Removes an item from the list ⭐️
const handleDelete = (itemId) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");

    if (!confirmed) return; // Stop if the user cancels the confirmation

    setMediaList(prevList => 
        // Filters out the item that matches the given itemId
        prevList.filter(item => item.id !== itemId)
    );
    console.log(`Item deleted: ${itemId}`);
};

// ⭐️ NEW HANDLER: Clears the entire list ⭐️
const handleClearList = () => {
    const confirmed = window.confirm(
        "WARNING: This will permanently delete ALL items from your tracker. Are you sure?"
    );

    if (!confirmed) return;

    setMediaList([]); // Resets the list state to an empty array
    setFilter('all');  // Optionally reset the filter
    setSearchResults([]); // Optionally clear search results
    console.warn("ALL media items have been permanently deleted.");
};


    // 4. RENDERED DASHBOARD STRUCTURE
    return (
        <div className="flex min-h-screen bg-gray-950 text-white">
            <aside className="w-64 bg-gray-800 p-4 shadow-xl">
                <h2 className="text-2xl font-bold">Navigation</h2>
                <p className="text-gray-400 mt-2">Sidebar links will filter the list.</p>
                <p className="mt-4 text-sm text-gray-500">Total Items: {mediaList.length}</p>
                {/* Sidebar links will be added here in the next step */}
            </aside>

            <Sidebar 
            totalItems={mediaList.length}
            currentFilter={filter}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearList}
        />
            <main className="flex-1 p-8">
                <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
                <p className="text-gray-400 mb-6">Items Loaded from Storage: {mediaList.length}</p>
                
                <SearchComponent onSearchResults={handleNewResults} />

                {/* Search Results Area */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Search Results ({searchResults.length})</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {searchResults.map((item) => (
                            <MediaCard 
                                key={`search-${item.id}-${item.media_type}`} 
                                item={item} 
                                onAdd={handleAddItem} 
                            />
                        ))}
                    </div>
                    
                    {searchResults.length === 0 && (
                        <p className="text-gray-400 mt-4">Start searching for movies and TV shows!</p>
                    )}
                </div>

                {/* USER'S MAIN MEDIA LIST DISPLAY AREA (Uses filteredList) */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                    {/* Show filtered count vs total count */}
                    <h2 className="text-3xl font-bold mb-6">My Tracked Media ({filteredList.length} of {mediaList.length})</h2>

                    {filteredList.length === 0 ? (
                        <p className="text-gray-400">No items found matching the current filter: **{filter}**.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {/* ⭐️ MAPPING OVER filteredList ⭐️ */}
                            {filteredList.map((item) => (
                                <MediaCard 
                                    key={item.id} 
                                    item={item} 
                                    isSaved={true}
                                    onStatusChange={handleStatusChange} // <--- PASS THE NEW HANDLER
                                    onDelete={handleDelete}
                                    onAdd={() => console.log('Item is already in the list.')} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;