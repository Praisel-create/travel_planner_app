import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import DestinationsPage from './pages/DestinationsPage';
import FlightOffersPage from './pages/FlightOffersPage';
import ItineraryPage from './pages/ItineraryPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/search-page' element={<SearchPage />}/>
        <Route path='/destinations-page' element={<DestinationsPage />}/>
        <Route path='/flight-search-page' element={<FlightOffersPage/>}/>
        <Route path='/itinerary-page' element={<ItineraryPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}