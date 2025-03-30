import React, { useState } from "react";
import ItineraryCard from "./components/ItineraryCard";

const ItineraryPage = () => {
  // Sample itinerary data (replace with localStorage/API later)
  const [itinerary, setItinerary] = useState([
    {
      id: 1,
      date: "2023-10-15",
      title: "Explore Tokyo",
      activities: ["Visit Shibuya Crossing", "Lunch at Tsukiji Market"],
    },
    {
      id: 2,
      date: "2023-10-16",
      title: "Kyoto Day Trip",
      activities: ["Fushimi Inari Shrine", "Tea Ceremony"],
    },
  ]);

  // Add new itinerary item (mock function)
  const addNewItem = () => {
    const newItem = {
      id: itinerary.length + 1,
      date: "2023-10-17",
      title: "Osaka Adventure",
      activities: ["Universal Studios Japan"],
    };
    setItinerary([...itinerary, newItem]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Itinerary</h1>
        <button
          onClick={addNewItem}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          + Add Day
        </button>
      </div>

      {/* Itinerary List */}
      <div className="space-y-6">
        {itinerary.map((item) => (
          <ItineraryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItineraryPage;