import Amadeus from 'amadeus';
import.meta.env.VITE_API_KEY
import.meta.env.VITE_API_SECRET

// Initializing Amadeus with the crdentials
const amadeus = new Amadeus({
    clientId: import.meta.env.VITE_API_KEY,
    clientSecret: import.meta.env.VITE_API_SECRET
  });

//Ferch popular destinations
export const getPopularDestinations = async () => {
    try {
      const response = await amadeus.referenceData.locations.get({
        subType: 'CITY',
        view: 'FULL',
        sort: 'analytics.travelers.score', // Sort by popularity
        page: { limit: 6 } // Get top 6 cities
      });
  
      // Transform Amadeus data into usable format
      return response.data.map(destination => ({
        id: destination.id,
        name: destination.name,
        country: destination.address?.countryName || 'Unknown',
        travelerScore: destination.analytics?.travelers?.score || 0,
        // Fallback image (Amadeus doesn't provide images)
        imageUrl: `https://source.unsplash.com/random/600x400/?${destination.name},city`
      }));
      
    } catch (error) {
      console.error('Amadeus API Error:', error);
      return []; // Return empty array on error
    }
  };