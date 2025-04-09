import { useState, useEffect, useRef } from "react";
import { FaHome, FaMap, FaBookmark, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavDropdown = ({ itinerary = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
      >
        Menu <FaChevronDown className="text-xs" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-20">
          <Link
            to="/search-page"
            className="flex items-center gap-2 p-3 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <FaHome /> Home
          </Link>

          <Link
            to="/itinerary-page"
            state={{ itinerary }}
            className="flex items-center gap-2 p-3 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <FaBookmark /> Itinerary
          </Link>

          <Link
            to="/flight-search-page"
            className="flex items-center gap-2 p-3 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <FaBookmark /> Flight Offers
          </Link>

          {/**
          <Link
            to="/hotels-page"
            className="flex items-center gap-2 p-3 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <FaBookmark /> Hotels
          </Link>*/}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
