import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Routes define which component loads for a specific URL path */}
      <Routes>
        {/* Route 1: The Landing Page */}
        <Route path="/" element={<HomePage />} />

        {/* Route 2: The Main Application Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Optional: Add a 404 Not Found Page later */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;