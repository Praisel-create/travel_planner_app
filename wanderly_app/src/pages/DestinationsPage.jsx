import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavDropdown from '../components/NavDropdown';


const DestinationsPage = () => {
  const location = useLocation();
  const { searchData, poi, activities, city, error } = location.state || {};
  const [itinerary, setItinerary] = useState(() => {
    const stored = localStorage.getItem("itinerary");
    return stored ? JSON.parse(stored) : [];
  });

  // Add/remove items from itinerary
  const toggleItineraryItem = (item, type) => {
    setItinerary(prev => {
      const exists = prev.some(i => i.id === item.id && i.type === type);
      let updated;

      if (exists) {
        return prev.filter(i => !(i.id === item.id && i.type === type));
      } else {
        updated = [...prev, { ...item, type }];
      }

      //Save the chosen Destination to the Local storage
      localStorage.setItem("itinerary", JSON.stringify(updated));

      return updated;
    });
  };

  // Check if item is in itinerary
  const isInItinerary = (id, type) => {
    return itinerary.some(item => item.id === id && item.type === type);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header Section with NavDropdown */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Destinations: {city}</h1>
        <div className="relative">
          <NavDropdown itinerary={itinerary}/>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Rest of your existing code... */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Search Details</h2>
        <p>Dates: {searchData?.timeFrame?.leave} to {searchData?.timeFrame?.return}</p>
        <p>Max Budget: ${searchData?.maxPrice}</p>
      </div>
      
      {/* Points of Interest Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Points of Interest</h2>
        {poi && poi.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {poi.map((place, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm relative">
                <h3 className="font-bold">{place.name}</h3>
                <p>Category: {place.category}</p>
                {place.geoCode && (
                  <p>Location: {place.geoCode.latitude}, {place.geoCode.longitude}</p>
                )}
                <button
                  onClick={() => toggleItineraryItem(place, 'poi')}
                  className={`absolute bottom-2 right-2 px-3 py-1 rounded-md text-sm 
                              ${isInItinerary(place.id, 'poi') 
                                ? 'bg-red-500 hover:bg-red-600' 
                                : 'bg-blue-500 hover:bg-blue-600'} 
                              text-white transition-colors`}
                >
                  {isInItinerary(place.id, 'poi') ? '🗑️ Remove' : '+ Add'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No points of interest found.</p>
        )}
      </div>
      
      {/* Activities Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Activities</h2>
        {activities && activities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((activity, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm relative">
                <h3 className="font-bold">{activity.name}</h3>
                <p>{activity.description}</p>
                {activity.price && activity.price.amount ? 
                  <p>Price: {activity.price.amount} {activity.price.currencyCode}</p> : 
                  <p>Price: Not available</p>
                }
                <button
                  onClick={() => toggleItineraryItem(activity, 'activity')}
                  className={`absolute bottom-2 right-2 px-3 py-1 rounded-md text-sm 
                              ${isInItinerary(activity.id, 'activity') 
                                ? 'bg-red-500 hover:bg-red-600' 
                                : 'bg-blue-500 hover:bg-blue-600'} 
                              text-white transition-colors`}
                >
                  {isInItinerary(activity.id, 'activity') ? '🗑️ Remove' : '+ Add'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No activities found.</p>
        )}
      </div>

      {/* Debug Section (hidden in production) */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg hidden">
        <h3 className="font-bold">Debug: Itinerary Items</h3>
        <pre>{JSON.stringify(itinerary, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DestinationsPage;