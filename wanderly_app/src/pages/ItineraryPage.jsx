import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import NavDropdown from '../components/NavDropdown';

const ItineraryPage = () => {
  const location = useLocation();
  // Initialize state with merged data from location state and localStorage
  const [itinerary, setItinerary] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('itinerary')) || [];
    const navItems = location.state?.itinerary || [];
    
    // Merge arrays and remove duplicates
    const merged = [...saved];
    navItems.forEach(item => {
      if (!merged.some(savedItem => 
        savedItem.id === item.id && savedItem.type === item.type
      )) {
        merged.push(item);
      }
    });
    return merged;
  });

  const [newDestination, setNewDestination] = useState('');

  // Save to localStorage whenever itinerary changes
  useEffect(() => {
    localStorage.setItem('itinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  // Handle new items coming from navigation
  useEffect(() => {
    if (location.state?.itinerary) {
      setItinerary(prev => {
        const newItems = location.state.itinerary.filter(item => 
          !prev.some(prevItem => 
            prevItem.id === item.id && prevItem.type === item.type
          )
        );
        return [...prev, ...newItems];
      });
    }
  }, [location.state]);

  const removeDestination = (id, type) => {
    setItinerary(prev => 
      prev.filter(item => !(item.id === id && item.type === type))
    );
  };

  const addManualDestination = () => {
    if (newDestination.trim()) {
      setItinerary(prev => [
        ...prev,
        {
          id: Date.now(),
          name: newDestination,
          type: 'manual',
          addedAt: new Date().toLocaleString()
        }
      ]);
      setNewDestination('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <NavDropdown itinerary={itinerary} /> {/* Pass current itinerary */}
          </div>
        </div>

        <h1 className="text-2xl font-bold">My Travel Itinerary</h1>
        <Link 
          to="/search-page" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Back to Search
        </Link>
      </div>

      {/* Add Destination Manually */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Add New Destination</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newDestination}
            onChange={(e) => setNewDestination(e.target.value)}
            placeholder="Enter destination name"
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addManualDestination}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>
      </div>

      {/* Itinerary List */}
      {itinerary.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {itinerary.map((item, index) => (
            <div key={`${item.type}-${item.id}`} className="border rounded-lg p-4 shadow-sm relative">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {item.type === 'manual' ? 'Custom Destination' : item.category || 'Activity'}
              </p>
              
              {item.type !== 'manual' && item.description && (
                <p className="text-gray-700 mb-2">{item.description}</p>
              )}

              {item.price?.amount && (
                <p className="font-semibold">Price: {item.price.amount} {item.price.currencyCode}</p>
              )}

              <p className="text-xs text-gray-400 mt-2">
                Added: {item.addedAt || new Date().toLocaleString()}
              </p>

              <button
                onClick={() => removeDestination(item.id, item.type)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                aria-label="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold mt-4">Your itinerary is empty</h2>
          <p className="text-gray-600 mt-2">Add destinations from search or manually above</p>
        </div>
      )}
    </div>
  );
};

export default ItineraryPage;