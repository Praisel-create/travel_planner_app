import NavDropdown from '../components/NavDropdown';
import SearchForm from '../components/SearchForm';
import { pointsOfInterest, activities } from '../apis/amadeus';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getCoordinates } from '../apis/cityGeocode';

const SearchPage = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const profilepic = "https://www.kindpng.com/picc/m/106-1068191_transparent-avatar-clipart-hd-png-download.png"
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchSubmit = async (searchData) => {
      setIsLoading(true);
      console.log("Search Data:", searchData);
    
      try {
        const city = searchData.city;
    
        // Getting the geocode for the city
        const { latitude, longitude } = await getCoordinates(city);
        console.log('Coordinates for', city, ':', latitude, longitude);
    
        // Getting the Point of interest from Amadeus using the geocode
        let poiData = [];
        try {
          const poiResponse = await pointsOfInterest(latitude, longitude);
          poiData = poiResponse.data || [];
        } catch (poiError) {
          console.error("POI API Error:", poiError);
        }
    
        // Getting Tours and Activities using the geocode
        let activitiesData = [];
        try {
          const activitiesResponse = await activities(latitude, longitude);
          activitiesData = activitiesResponse.data || [];
        } catch (actError) {
          console.error("Activities API Error:", actError);
        }
    
        // Handle empty results and create an error message
        let errorMessage = '';
        if (poiData.length === 0) errorMessage += "Could not load points of interest. ";
        if (activitiesData.length === 0) errorMessage += "Could not load activities. ";
    
        // Navigate to the destinations page with serializable data
        navigate('/destinations-page', {
          state: {
            searchData, // Pass the search data (city, timeFrame, maxPrice)
            poi: poiData, // Points of interest data
            activities: activitiesData, // Activities data
            city, // City for the search
            error: errorMessage || null, // Error message if any
          }
        });
    
      } catch (error) {
        console.error("Search Chain Error:", error);
        alert("Failed to fetch destination data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
  return (
  <div className="relative min-h-screen overflow-hidden">
    {/* Background video */}
    <video 
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source src="/pictures/bg-video2.mp4" type="video/mp4" />
    </video>

    {/**The user profile and Dropdown*/}
      <div className='relative z-10 min-h-screen flex flex-col p-6' >
        <div className='flex justify-between items-center mb-8'>
          <div>
          <img
            src={profilepic}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
          />
          <span className="font-bold text-white-800">Welcome {user.name} where would you like to go?</span>
          </div>
          <NavDropdown />
          </div>

          <div className="mt-8 max-w-md mx-auto w-full p-6 rounded-lg">
            <SearchForm onSubmit={handleSearchSubmit} />
        </div>
      </div>
  </div>

  );
};

export default SearchPage;