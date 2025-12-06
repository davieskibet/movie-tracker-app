// src/utils/localStorage.js

// Key under which all user lists will be stored in the browser.
const STORAGE_KEY = 'multiTrackLists';


const DEMO_MEDIA = [
  {
    id: 'tmdb-45339',
    title: 'Furiosa: A Mad Max Saga',
    year: '2024',
    mediaType: 'movie',
    status: 'wantToWatch',
    imageUrl: 'https://image.tmdb.org/t/p/w500/iADO0H1oX8R3YqLw87oM0Wc8KqZ.jpg',
    description: 'Snatched from the Green Place of Many Mothers, young Furiosa falls into the hands of a great Biker Horde...',
    sourceId: 45339,
    sourceAPI: 'TMDB',
  },
  {
    id: 'ol-7497',
    title: 'Dune',
    year: '1965',
    mediaType: 'book',
    status: 'completed',
    imageUrl: null,
    description: 'The story of Paul Atreides, a young man who must take control of the desert planet Arrakis...',
    sourceId: 7497,
    sourceAPI: 'OpenLibrary',
    author: 'Frank Herbert',
  }
];
/**
 * Loads all user lists (wantToWatch, completed) from localStorage.
 * If no data is found, returns an empty array to prevent app errors.
 * @returns {Array} An array of MediaItem objects.
 */
export const loadLists = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    
    // If nothing is stored, return an empty array to initialize the state.
    if (serializedState === null) {
        console.log("Loading Demo Data for testing...");
      return DEMO_MEDIA;
    }
    
    // Parse the JSON string back into a JavaScript array.
    return JSON.parse(serializedState);
    
  } catch (e) {
    console.error("Could not load state from localStorage", e);
    // On error, return an empty array.
    return [];
  }
};

/**
 * Saves the current array of MediaItem objects to localStorage.
 * @param {Array} listsArray - The full array of media items from React state.
 */
export const saveLists = (listsArray) => {
  try {
    // Convert the JavaScript array into a JSON string for storage.
    const serializedState = JSON.stringify(listsArray);
    localStorage.setItem(STORAGE_KEY, serializedState);
    
  } catch (e) {
    console.error("Could not save state to localStorage", e);
    // Error logging is enough, saving is non-critical to user experience.
  }
};