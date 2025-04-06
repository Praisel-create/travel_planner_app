import React, { useState } from 'react';
import { getIataCode } from '../apis/amadeus';
import NavDropdown from '../components/NavDropdown';

const FlightSearchForm = ({ 
  defaultDestination = "", 
  defaultDeparture = "", 
  defaultReturn = "", 
  onSearch,
  onSubmit 
}) => {
  const [originCity, setOriginCity] = useState(""); // User's origin city name
  const [destinationCity, setDestinationCity] = useState(defaultDestination); // Pre-filled from SearchPage
  const [departureDate, setDepartureDate] = useState(defaultDeparture);
  const [returnDate, setReturnDate] = useState(defaultReturn);
  const [adults, setAdults] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeFrame, setTimeFrame] = useState({leave: "", return: ""});
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    onSubmit({ timeFrame });

    try {
      // Convert both cities to IATA codes
      const [originIata, destinationIata] = await Promise.all([
        getIataCode(originCity),
        getIataCode(destinationCity),
      ]);

      if (!originIata || !destinationIata) {
        throw new Error("Could not find IATA codes for one or both cities.");
      }

      // Pass IATA codes + dates to parent (FlightPage)
      await onSearch({
        origin: originIata,
        destination: destinationIata,
        departureDate,
        returnDate,
        adults,
      });

    } catch (err) {
      setError(err.message || "Failed to search flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
        {/* Header Section with NavDropdown */}
        <div className="flex justify-between items-center mb-4">
            <div className="relative">
            <NavDropdown />
            </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Find Flights</h2>
        
        {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
            <label className="block text-sm font-medium mb-1">Leaving From (City)</label>
            <input
                type="text"
                value={originCity}
                onChange={(e) => setOriginCity(e.target.value)}
                placeholder="e.g., New York"
                className="w-full p-2 border rounded"
                required
            />
            </div>
            
            <div>
            <label className="block text-sm font-medium mb-1">Going To (City)</label>
            <input
                type="text"
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                placeholder="e.g., Paris"
                className="w-full p-2 border rounded"
                required
            />
            </div>
        </div>

        {/**Start Date*/}
        <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        Travel Depature Date
                    </label>
                    <input 
                        type="date"
                        id="departure"
                        value={timeFrame.leave}
                        onChange={(e) => setTimeFrame({ ...timeFrame, leave: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                        shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required/>
                </div>
            </div>
            {/**Return Date*/}
            <div>
                <label htmlFor="return" className="block text-sm font-medium text-gray-700">
                    Return Date
                </label>
                <input
                type="date"
                id="return"
                value={timeFrame.return}
                onChange={(e) => setTimeFrame({ ...timeFrame, return: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
            />
            </div>

        {/* ... (Keep date and adults inputs unchanged) ... */}

        <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white transition-colors ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
        >
            {loading ? 'Searching...' : 'Search Flights'}
        </button>
        </form>
        </div>
    );
};

export default FlightSearchForm;