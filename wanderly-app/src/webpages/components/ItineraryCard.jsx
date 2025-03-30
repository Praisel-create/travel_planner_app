//Display of the each card Itinerary

import React from "react";

const ItineraryCard = ({ item }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      {/* Date and Title */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{item.date}</h2>
        <h3 className="text-2xl font-bold text-blue-600">{item.title}</h3>
      </div>

      {/* Activities List */}
      <ul className="space-y-2">
        {item.activities.map((activity, index) => (
          <li key={index} className="flex items-center">
            <span className="w-4 h-4 bg-blue-500 rounded-full mr-3"></span>
            <span className="text-gray-700">{activity}</span>
          </li>
        ))}
      </ul>

      {/* Optional: Edit/Delete Buttons */}
      <div className="flex gap-2 mt-4">
        <button className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">
          Edit
        </button>
        <button className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItineraryCard;