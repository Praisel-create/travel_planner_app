import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExplorePage from './webpages/ExplorePage';
import LoginPage from './webpages/LoginPage'
import ItineraryPage from './webpages/ItineraryPage';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/explore-page" element={<ExplorePage />}/>
          <Route path="/itinerary-page" element={ItineraryPage}/>
        </Routes>
      </Router>
  );
}

export default App
