// src/utils/statusUtils.js

export const STATUSES = [
    'wantToWatch', 
    'watching', 
    'completed'
];

/**
 * Returns a human-readable label for a status key.
 * Used for displaying status in the UI.
 * @param {string} statusKey 
 * @returns {string} 
 */
export const getStatusLabel = (statusKey) => {
    switch (statusKey) {
        case 'wantToWatch':
            return 'Want to Watch';
        case 'watching':
            return 'Watching';
        case 'completed':
            return 'Completed';
        default:
            return 'Unknown Status';
    }
};

/**
 * Calculates the next status in the cycle.
 * @param {string} currentStatus - The status currently assigned to the item.
 * @returns {string} The next status in the STATUSES array.
 */
export const getNextStatus = (currentStatus) => {
    const currentIndex = STATUSES.indexOf(currentStatus);
    
    // If the status is unknown or the last one, cycle back to the first one ('wantToWatch').
    if (currentIndex === -1 || currentIndex === STATUSES.length - 1) {
        return STATUSES[0];
    }
    
    return STATUSES[currentIndex + 1];
};

/**
 * Returns the appropriate Tailwind class for styling the status button.
 * @param {string} statusKey 
 * @returns {string} Tailwind background and text classes.
 */
export const getStatusClass = (statusKey) => {
    switch (statusKey) {
        case 'wantToWatch':
            return 'bg-sky-700 hover:bg-sky-600 text-white'; // Blue for pending
        case 'watching':
            return 'bg-amber-500 hover:bg-amber-400 text-gray-900'; // Yellow/Amber for active
        case 'completed':
            return 'bg-emerald-600 hover:bg-emerald-500 text-white'; // Green for finished
        default:
            return 'bg-gray-600 hover:bg-gray-500 text-white';
    }
}