// src/pages/Dashboard.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { getNextStatus } from '../utils/statusUtils';
import { loadLists, saveLists } from '../utils/localStorage';
import SearchComponent from '../components/SearchComponent';
import { normalizeTmdbData } from '../api/dataMapper';
import MediaCard from '../components/MediaCard';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
    // 1. STATE DEFINITIONS
    const [mediaList, setMediaList] = useState(() => loadLists());
    const [searchResults, setSearchResults] = useState([]);
    const [filter, setFilter] = useState('all'); 

    // 2. PERSISTENCE HOOK
    useEffect(() => {
        saveLists(mediaList);
    }, [mediaList]);

    // 3. FILTERING LOGIC
    const filteredList = useMemo(() => {
        if (filter === 'all') return mediaList;
        return mediaList.filter(item => 
            item.mediaType === filter || item.status === filter
        );
    }, [mediaList, filter]); 

    // 4. HANDLER FUNCTIONS
    const handleNewResults = (results) => setSearchResults(results);

    const handleAddItem = (rawItem) => {
        const newItem = normalizeTmdbData(rawItem);
        const isDuplicate = mediaList.some(item => item.id === newItem.id); 

        if (isDuplicate) {
            alert(`"${newItem.title}" is already in your list!`);
            return;
        }

        setMediaList(prevList => [...prevList, newItem]);
        setSearchResults([]);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setSearchResults([]); 
    };

    const handleStatusChange = (itemId) => {
        setMediaList(prevList => 
            prevList.map(item => 
                item.id === itemId 
                    ? { ...item, status: getNextStatus(item.status) } 
                    : item
            )
        );
    };

    const handleDelete = (itemId) => {
        if (!window.confirm("Delete this item?")) return;
        setMediaList(prevList => prevList.filter(item => item.id !== itemId));
    };

    const handleClearList = () => {
        if (!window.confirm("WARNING: Clear EVERYTHING?")) return;
        setMediaList([]);
        setFilter('all');
    };

    // 5. RENDERED STRUCTURE
    return (
        /* Changed bg-gray-950 to brand-dark for Figma look */
        <div className="flex min-h-screen bg-brand-dark text-white">
            
            {/* THE ONLY SIDEBAR */}
            <Sidebar 
                totalItems={mediaList.length}
                currentFilter={filter}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearList}
            />

            <main className="flex-1 p-8">
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white">Dashboard</h1>
                    <p className="text-slate-400 mt-2">Manage your media collection and tracking progress.</p>
                </header>
                
                {/* Search Section */}
                <section className="mb-12">
                    <SearchComponent onSearchResults={handleNewResults} />
                    
                    {searchResults.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-xl font-bold mb-6 text-brand-cyan-600">Search Results</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {searchResults.map((item) => (
                                    <MediaCard 
                                        key={`search-${item.id}`} 
                                        item={item} 
                                        onAdd={handleAddItem} 
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Main Media List Area */}
                <section className="pt-10 border-t border-white/10">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl font-bold">My Library</h2>
                            <p className="text-slate-500 text-sm mt-1">
                                Showing {filteredList.length} of {mediaList.length} total items
                            </p>
                        </div>
                    </div>

                    {filteredList.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 rounded-brand border border-dashed border-white/10">
                            <p className="text-slate-400">No items found for filter: <span className="text-brand-cyan-600 font-bold">{filter}</span></p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredList.map((item) => (
                                <MediaCard 
                                    key={item.id} 
                                    item={item} 
                                    isSaved={true}
                                    onStatusChange={handleStatusChange}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;