import { Link } from 'react-router-dom'; // Import Link for navigation

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* 1. Logo/Branding */}
      <h1 className="text-5xl font-extrabold text-teal-400">MultiTrack</h1>
      <p className="text-xl text-gray-400 mb-8">Media Hub</p>

      {/* 2. Core Statement */}
      <h2 className="text-3xl font-semibold mb-6">Your Personal Media Hub</h2>
      <p className="max-w-xl text-lg text-gray-300 mb-10">
        Organize, track, and never forget another movie, TV show, or book you want to experience. All your media in one beautiful dashboard.
      </p>

      {/* 3. Launch Button (The Navigation Trigger) */}
      <Link 
        to="/dashboard" 
        className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg transition duration-200"
      >
        Launch App
      </Link>
      {/* --- Feature Highlights Section --- */}
      <div className="mt-20 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 p-6 border-t border-gray-700 pt-10">
        
        {/* Highlight Card 1: Quick Search */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold mb-2 text-teal-400">Quick Search</h3>
          <p className="text-gray-300">Instantly find and add movies, TV shows, and books to your collection with powerful search.</p>
        </div>

        {/* Highlight Card 2: Track Progress */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold mb-2 text-teal-400">Track Progress</h3>
          <p className="text-gray-300">Keep tabs on what you want to watch or read, and mark items as completed when done.</p>
        </div>

        {/* Highlight Card 3: Organize Smart */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold mb-2 text-teal-400">Organize Smart</h3>
          <p className="text-gray-300">Beautiful grid views, filters, and collections to keep your media library perfectly organized.</p>
        </div>
      </div>

      {/* --- Final Call-to-Action Card --- */}
      <div className="mt-20 mb-10 w-full max-w-4xl p-10 bg-gray-700/50 rounded-xl shadow-2xl backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-4 text-teal-400">Ready to Organize Your Media?</h2>
        <p className="text-xl text-gray-200 mb-6">
          Start tracking your entertainment journey today. No signup required.
        </p>
        {/* Final Launch Button */}
        <Link 
          to="/dashboard" 
          className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-bold py-3 px-10 rounded-lg shadow-xl transition duration-200 text-lg"
        >
          Launch App
        </Link>
      </div>

      
    </div>
  );
};

export default HomePage;