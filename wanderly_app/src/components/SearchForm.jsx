import { useState } from "react";
import React from 'react'

const SearchForm = ({ onSubmit }) => {
  const [city, setCity] = useState("");
  const [timeFrame, setTimeFrame] = useState({ leave: "", return: "" });
  const [maxPrice, setMaxPrice] = useState(1000);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    onSubmit({ city, timeFrame, maxPrice }).finally(() => {
      setLoading(false); // Reset loading once the API call or task is finished
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      {/* The City Form */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          What city would you like to visit?
        </label>
        <input
          type="text"
          id="city"
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
          shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter city (e.g Paris)"
          required
        />
      </div>

      {/* Time Frame date picker */}
      {/* Start Date */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Departure Date
          </label>
          <input
            type="date"
            id="departure"
            value={timeFrame.leave}
            onChange={(e) => setTimeFrame({ ...timeFrame, leave: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
            shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
      </div>
      {/* Return Date */}
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

      {/* Maximum Price Slider button */}
      <div>
        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
          Max Budget: ${maxPrice}
        </label>
        <input
          type="range"
          id="maxPrice"
          min="50"
          max="5000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          className="mt-1 block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>$50</span>
          <span>$5000</span>
        </div>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className={`w-full px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 
        ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        disabled={loading} // Disable the button when loading
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchForm;
