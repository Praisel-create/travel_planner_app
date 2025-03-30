import React from 'react';

const DestinationCard = ({ destination }) => {
  // Convert traveler score (0-100) to 5-star rating
  const starRating = (destination.travelerScore / 20).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform hover:scale-[1.02]">
      {/* Destination Image */}
      <img 
        src={destination.imageUrl} 
        alt={`${destination.name}, ${destination.country}`}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src = `https://source.unsplash.com/random/600x400/?city`;
        }}
      />

      {/* Destination Info */}
      <div className="p-4">
        <h3 className="font-bold text-xl truncate">{destination.name}</h3>
        <p className="text-gray-600">{destination.country}</p>
        
        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400">
            {'★'.repeat(Math.round(starRating)).padEnd(5, '☆')}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {starRating} ({destination.travelerScore} travelers)
          </span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;