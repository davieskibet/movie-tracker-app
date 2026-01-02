 Multi-Tracker: Unified Media Dashboard
Multi-Tracker is a high-fidelity, responsive web application built with React. It serves as a centralized hub for tracking movies, TV shows, and books, pulling real-time data from global APIs to provide a seamless organization experience.

 The Vision
In the modern digital age, media consumption is fragmented across dozens of platforms. Multi-Tracker eliminates the need for multiple watchlists by providing a "Single Pane of Glass" view. Whether it’s a film from TMDB or a classic novel from Open Library, users can manage their entire intellectual lifestyle in one place.

 Technical Features
1. Multi-Source API Integration
The app communicates with two distinct REST APIs:

The Movie Database (TMDB): For rich movie and television metadata including posters, release dates, and overviews.

Open Library API: For literary data, fetching book covers and author information.

2. Intelligent Data Normalization
One of the core technical achievements of this project is the Data Mapping Layer. Since different APIs return data in different shapes (e.g., poster_path vs cover_i), I implemented a normalization utility that transforms all incoming data into a strict internal MediaItem interface. This ensures the UI remains stable and predictable regardless of the data source.

3. Reactive State Management
Synchronized UI: The Sidebar and Main Grid are synced via React State. Adding an item instantly updates the "Total Items" count and the filtered views.

Persistence: Integrated localStorage allows the app to function like a desktop application, remembering user preferences and library items even after a browser restart.

4. Custom Design System
Built with Tailwind CSS, the UI follows a "Glassmorphism" aesthetic:

Deep Blue Theme: Uses a custom color palette (#030213) for a premium dark-mode feel.

Responsive Grid: A fluid layout that adjusts from mobile (2 columns) to ultra-wide monitors (5+ columns).

Interactive Feedback: Hover effects, status-badge cycling, and optimistic UI deletions provide immediate user feedback.

🛠️ Performance & Optimizations
Lazy Loading: Images are configured with loading="lazy" to optimize initial page load speed.

Memoized Logic: Used useMemo for filtering logic to ensure that large libraries don't slow down the UI during re-renders.

Error Boundaries: Implemented fallback image handling for missing API assets to prevent "broken" UI states.