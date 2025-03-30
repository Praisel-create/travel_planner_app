import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import UserProfile from './components/UserProfile';
"use client";
import DropDown from './components/DropDown';
import SearchBar from './components/SearchBar';
import DestinationCard from './components/DestinationCard';
import { getPopularDestinations } from './apis/amadeus';
import { 
        FaHome, 
        FaMap, 
        FaBookmark, 
        FaMoneyBillWaveAlt, 
        FaAngleDown } from "react-icons/fa";

const ExplorePage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);

    //Fetch the popular destinations
    useEffect(() => {
      const fetchDestinations = async () => {
        try {
          const data = await getPopularDestinations();
          setDestinations(data);
        } catch (error) {
          console.error("API Error:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDestinations();
    }, []);

    const items = [
        { 
          id: 1, 
          text: 'Home', 
          icon: <FaHome />,
          path:"/"
        },

        { 
          id: 2, 
          text: 'Itinerary', 
          icon: <FaBookmark />, 
          path:"/itinerary-page"
        },

        { 
          id: 3, 
          text: 'Interactive Map', 
          icon: <FaMap />, 
          //path: "/interactive-map"
        },

        { 
          id: 4, 
          text: 'Budget Planner', 
          icon: <FaMoneyBillWaveAlt />,
          //path: "Budget planner"
        }
    ];

    const handleSearch = (query) => {
        setSearchQuery(query);
        console.log("Searching for:", query);
    };

    return (
        <div className='min-h-screen bg-gray-100 p-6'>
          {/* Changed this div to flex justify-between */}
          <div className='flex justify-between items-center m-6'>  
            <UserProfile />
  
            <DropDown
              buttonIconLeft={<FaHome />}
              buttonText='Home'
              buttonIconRight={<FaAngleDown />}
              items={items}
            />
          </div>

          <div>
            {/**The search bar component */}
            <SearchBar onSearch={handleSearch}/>
          </div>

          <section className='mb-12'>
                <h2 className='text-2xl font-bold mb-4'>Popular Destinations</h2>
                {loading ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className='bg-white rounded-xl shadow-md h-64 animate-pulse'></div>
                        ))}
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {destinations.map((destination) => (
                            <DestinationCard 
                                key={destination.id} 
                                destination={destination} 
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* (Next: Add Activities and Cheap Flights sections here) */}

        </div>
      );
};

export default ExplorePage;