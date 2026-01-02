// src/components/Sidebar.jsx
import React from 'react';
import { 
  HiOutlineSquares2X2, 
  HiOutlineFilm, 
  HiOutlineTv, 
  HiOutlineBookOpen, 
  HiOutlineClock, 
  HiOutlinePlay, 
  HiOutlineCheckCircle, 
  HiOutlineTrash 
} from 'react-icons/hi2';

const FILTERS = [
    { key: 'all', label: 'All Media', icon: HiOutlineSquares2X2 },
    { key: 'movie', label: 'Movies', icon: HiOutlineFilm },
    { key: 'tv', label: 'TV Shows', icon: HiOutlineTv },
    { key: 'book', label: 'Books', icon: HiOutlineBookOpen },
];

const STATUS_FILTERS = [
    { key: 'wantToWatch', label: 'Want to Watch', icon: HiOutlineClock },
    { key: 'watching', label: 'Watching/Reading', icon: HiOutlinePlay },
    { key: 'completed', label: 'Completed', icon: HiOutlineCheckCircle },
];

const Sidebar = ({ currentFilter, onFilterChange, onClearAll }) => {
    
    const getButtonClass = (filterKey) => 
        `w-full flex items-center gap-3 py-2.5 px-4 rounded-brand transition-all duration-200 text-sm font-medium mt-1 ${
            filterKey === currentFilter 
                ? 'bg-brand-cyan-600 text-white shadow-lg shadow-cyan-900/40' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
        }`;

    return (
        <aside className="w-64 bg-brand-dark border-r border-white/10 min-h-[calc(100vh-72px)] p-6 flex flex-col justify-between">
            <div className="space-y-8">
                
                {/* 1. Media Type Filters (No "Navigation" header) */}
                <div className="space-y-1">
                    {FILTERS.map(item => (
                        <button
                            key={item.key}
                            onClick={() => onFilterChange(item.key)}
                            className={getButtonClass(item.key)}
                        >
                            <item.icon className="text-xl" />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* 2. Status Filters */}
                <div>
                    <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-3">
                        Status
                    </h2>
                    <div className="space-y-1">
                        {STATUS_FILTERS.map(item => (
                            <button
                                key={item.key}
                                onClick={() => onFilterChange(item.key)}
                                className={getButtonClass(item.key)}
                            >
                                <item.icon className="text-xl" />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. List Actions */}
            <div className="pt-6 border-t border-white/10">
                <button
                    className="w-full flex items-center gap-3 py-2.5 px-4 rounded-brand transition-all text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-500"
                    onClick={onClearAll}
                >
                    <HiOutlineTrash className="text-xl" />
                    Delete All Data
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;