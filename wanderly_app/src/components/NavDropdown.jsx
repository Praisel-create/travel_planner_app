import { FaHome, FaMap, FaBookmark, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavDropdown = ({ itinerary = [] }) => {
  console.log("NavDropdown itinerary:", itinerary);
  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg">
        Menu <FaChevronDown className="text-xs" />
      </button>
      <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-20">
        <Link to="/search-page" className="flex items-center gap-2 p-3 hover:bg-gray-100">
          <FaHome /> Home
        </Link>

        <Link 
          to="/itinerary-page" 
          state={{ itinerary }} // Pass current itinerary
          className="flex items-center gap-2 p-3 hover:bg-gray-100"
        >
          <FaBookmark /> Itinerary
        </Link>

        <Link to="/flight-search-page" className="flex items-center gap-2 p-3 hover:bg-gray-100">
          <FaBookmark /> Flight Offers
        </Link>
      </div>
    </div>
  );
};

export default NavDropdown;