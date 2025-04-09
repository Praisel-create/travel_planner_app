import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import NavDropdown from '../components/NavDropdown';
import { FiMapPin, FiCalendar, FiDollarSign, FiPlus, FiTrash2 } from 'react-icons/fi';

const DestinationsPage = () => {
  const location = useLocation();
  const { searchData, poi, activities, city, error } = location.state || {};
  const [itinerary, setItinerary] = useState(() => {
    const stored = localStorage.getItem("itinerary");
    return stored ? JSON.parse(stored) : [];
  });

  const toggleItineraryItem = (item, type) => {
    setItinerary(prev => {
      const exists = prev.some(i => i.id === item.id && i.type === type);
      const updated = exists
        ? prev.filter(i => !(i.id === item.id && i.type === type))
        : [...prev, { ...item, type, addedAt: new Date().toISOString() }];
      
      localStorage.setItem("itinerary", JSON.stringify(updated));
      return updated;
    });
  };

  const isInItinerary = (id, type) => {
    return itinerary.some(item => item.id === id && item.type === type);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Destinations: {city}</h1>
        <div className="relative">
          <NavDropdown itinerary={itinerary} />
        </div>
      </div>
      
      {/* Search Details */}
      <div className="mb-8 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FiCalendar className="text-blue-500" />
          Search Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Travel Dates</p>
            <p className="font-medium">
              {searchData?.timeFrame?.leave} to {searchData?.timeFrame?.return}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Max Budget</p>
            <p className="font-medium">${searchData?.maxPrice}</p>
          </div>
        </div>
      </div>
      
      {/* Activities Section */}
      <div className="mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
          <FiDollarSign className="text-blue-500" />
          Activities & Tours
        </h2>
        
        {activities && activities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {activities.map((activity) => (
              <div key={activity.id} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
                <div>
                  <img src={activity.pictures[0]}/>
                </div>
                <h3 className="font-bold text-lg mb-2">{activity.name}</h3>
                <p className="text-gray-700 mb-3 text-sm">{activity.description}</p>
                
                {activity.price?.amount ? (
                  <p className="font-semibold text-blue-600">
                    ${activity.price.amount} {activity.price.currencyCode}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm">Price not available</p>
                )}
                
                <button
                  onClick={() => toggleItineraryItem(activity, 'activity')}
                  className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm mt-3 ${
                    isInItinerary(activity.id, 'activity') 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-colors`}
                >
                  {isInItinerary(activity.id, 'activity') ? (
                    <>
                      <FiTrash2 size={14} />
                      Remove
                    </>
                  ) : (
                    <>
                      <FiPlus size={14} />
                      Add to Itinerary
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-gray-500">No activities found for this destination.</p>
          </div>
        )}
      </div>

      {/* Back to Search Link */}
      <div className="mt-8 text-center">
        <Link 
          to="/search-page" 
          className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          ← Back to Search
        </Link>
      </div>
    </div>
  );
};

export default DestinationsPage;