import React, { useState } from 'react';
import { getIataCode } from '../apis/amadeus';
import NavDropdown from '../components/NavDropdown';
import { FiSearch, FiCalendar, FiUsers } from 'react-icons/fi';

const FlightSearchForm = ({ 
  defaultDestination = "", 
  defaultDeparture = "", 
  defaultReturn = "", 
  onSearch,
  onSubmit 
}) => {
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState(defaultDestination);
  const [timeFrame, setTimeFrame] = useState({
    leave: defaultDeparture,
    return: defaultReturn
  });
  const [adults, setAdults] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    onSubmit({ timeFrame });

    try {
      const [originIata, destinationIata] = await Promise.all([
        getIataCode(originCity),
        getIataCode(destinationCity),
      ]);

      if (!originIata || !destinationIata) {
        throw new Error("Could not find airport codes for the cities entered.");
      }

      await onSearch({
        origin: originIata,
        destination: destinationIata,
        departureDate: timeFrame.leave,
        returnDate: timeFrame.return,
        adults,
      });

    } catch (err) {
      setError(err.message || "Failed to search flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <NavDropdown />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Find Flights</h2>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* City Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-700">Leaving From</label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={originCity}
                onChange={(e) => setOriginCity(e.target.value)}
                placeholder="City or Airport"
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-700">Going To</label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                placeholder="City or Airport"
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Date Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-700">Departure Date</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={timeFrame.leave}
                onChange={(e) => setTimeFrame({...timeFrame, leave: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-700">Return Date</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={timeFrame.return}
                onChange={(e) => setTimeFrame({...timeFrame, return: e.target.value})}
                min={timeFrame.leave || new Date().toISOString().split('T')[0]}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                disabled={!timeFrame.leave}
              />
            </div>
          </div>
        </div>

        {/* Passengers */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700">Passengers</label>
          <div className="relative">
            <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value))}
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </span>
          ) : 'Search Flights'}
        </button>
      </form>
    </div>
  );
};

export default FlightSearchForm;