// src/utils/statusUtils.js

export const STATUSES = [
    'wantToWatch', 
    'watching', 
    'completed'
];

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

// Function to get a friendly display name (optional but helpful for UI)
export const getStatusLabel = (statusKey) => {
    switch (statusKey) {
        case 'wantToWatch':
            return `${base} bg-sky-700 text-white`; // Blue for pending
        case 'watching':
            return `${base} bg-amber-500 text-gray-900`; // Yellow/Amber for active
        case 'completed':
            return `${base} bg-emerald-600 text-white`; // Green for finished
        default:
            return `${base} bg-gray-600 text-white`;
    }
}