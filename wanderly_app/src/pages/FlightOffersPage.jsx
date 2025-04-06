import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FlightSearchForm from '../components/FlightSearchForm';

const FlightOffersPage = () => {
  const location = useLocation();
  const { city, searchData } = location.state || {}; // From SearchPage
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch flights using IATA codes from FlightSearchForm
  const fetchFlights = async (originIata, destinationIata, departureDate, returnDate, adults) => {
    setLoading(true);
    setError(null);

    try {
      const token = await getAmadeusToken(); // Reuse your existing token function
      const response = await axios.get(
        'https://test.api.amadeus.com/v2/shopping/flight-offers',
        {
          params: {
            originLocationCode: originIata,  // e.g., "JFK"
            destinationLocationCode: destinationIata, // e.g., "PAR"
            departureDate, // e.g., "2024-07-01"
            returnDate,   // e.g., "2024-07-10"
            adults,        // e.g., 2
            max: 10,      // Limit results
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFlights(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch flights. Try again.");
      console.error("Flight API error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Flights to {city}</h1>

      {/* Search Form (converts city names → IATA codes) */}
      <FlightSearchForm
        defaultDestination={city} // Pre-fill destination from SearchPage
        defaultDeparture={searchData?.timeFrame?.leave}
        defaultReturn={searchData?.timeFrame?.return}
        onSearch={fetchFlights} // Pass IATA codes to flight search
      />

      {/* Results */}
      {loading && <p className="mt-4 text-center">Loading flights...</p>}
      
      {error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {flights.length > 0 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Available Flights</h2>
          {flights.map((flight) => (
            <div key={flight.id} className="bg-white p-4 rounded-lg shadow border">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">
                    {flight.itineraries[0].segments[0].departure.iataCode} → 
                    {flight.itineraries[0].segments.slice(-1)[0].arrival.iataCode}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Dep: {new Date(flight.itineraries[0].segments[0].departure.at).toLocaleString()} <br />
                    Arr: {new Date(flight.itineraries[0].segments.slice(-1)[0].arrival.at).toLocaleString()}
                  </p>
                  <p className="text-sm">Airline: {flight.validatingAirlineCodes[0]}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${flight.price.total}</p>
                  <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {flights.length === 0 && !loading && !error && (
        <p className="mt-4 text-center text-gray-500">No flights found. Try another search.</p>
      )}
    </div>
  );
};

export default FlightOffersPage;