import NavDropdown from '../components/NavDropdown';
import SearchForm from '../components/SearchForm';
import { pointsOfInterest, activities } from '../apis/amadeus';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getCoordinates } from '../apis/cityGeocode';

const SearchPage = () => {
    const user = JSON.parse(localStorage.getItem("user")) || { name: 'Guest' };
    const profilepic = "https://www.kindpng.com/picc/m/106-1068191_transparent-avatar-clipart-hd-png-download.png"
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchSubmit = async (searchData) => {
      setIsLoading(true);
    
      try {
        const city = searchData.city;
        const { latitude, longitude } = await getCoordinates(city);
        
        const [poiResponse, activitiesResponse] = await Promise.all([
          pointsOfInterest(latitude, longitude).catch(e => ({ data: [] })),
          activities(latitude, longitude).catch(e => ({ data: [] }))
        ]);

        const errorMessage = [
          poiResponse.data?.length ? '' : 'Could not load points of interest',
          activitiesResponse.data?.length ? '' : 'Could not load activities'
        ].filter(Boolean).join('. ');

        navigate('/destinations-page', {
          state: {
            searchData,
            poi: poiResponse.data || [],
            activities: activitiesResponse.data || [],
            city,
            error: errorMessage || null,
          }
        });
      } catch (error) {
        console.error("Search Error:", error);
        alert("Failed to fetch destination data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Responsive Background */}
      <video 
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
      >
        <source src="/src/pictures/bg-video2.mp4" type="video/mp4" />
        <img src="/src/pictures/bg-fallback.jpg" alt="Background" className="w-full h-full object-cover" />
      </video>

      <div className="relative z-10 min-h-screen flex flex-col p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className='flex justify-between items-center mb-6 sm:mb-8'>
          <div className="flex items-center gap-3">
            <img
              src={profilepic}
              alt="Profile"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-blue-500"
            />
            <span className="font-bold text-white text-sm sm:text-base">
              Welcome {user.name}, where would you like to go?
            </span>
          </div>
          <NavDropdown />
        </div>

        {/* Search Form Container */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md mx-auto p-4 sm:p-6 lg:p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
            <SearchForm onSubmit={handleSearchSubmit} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;