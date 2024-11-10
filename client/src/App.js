import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import ReconstructFood from './pages/ReconstructFood'; // Import your page component
import RecipeDetail from './pages/RecipeDetail'; // Import a new page if needed

function App() {
  return (
    <Router> {/* Wrap your app in Router */}
      <div className="App">
        <Routes>
          <Route path="/" element={<ReconstructFood />} /> 
          <Route path="/recipe/:title" element={<ReconstructFood />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
