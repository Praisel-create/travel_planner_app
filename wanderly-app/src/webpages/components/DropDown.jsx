import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHouse, FaChevronDown } from "react-icons/fa6"; // Using react-icons (Font Awesome 6)

const Dropdown = ({ buttonIconLeft, buttonText, buttonIconRight, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setSelectedItem(items.find((item) => item.text === buttonText) || null);
  }, [buttonText, items]);

  const handleClickedItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const dropdownItems = items
    .filter((item) => item.id !== selectedItem?.id)
    .sort((a, b) => a.text.localeCompare(b.text));

  return (
    <div className="relative inline-block text-left w-50">
      {/* Dropdown toggle button */}
      <button
        className={`flex items-center bg-black text-white 
          ${isOpen ? "rounded-t-[12px] border-b-0" : "rounded-[12px]"} 
          border border-white antialiased focus:outline-none`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {/* Left icon */}
        <span className="flex items-center justify-center px-2 py-1">
          {selectedItem?.icon || buttonIconLeft || <FaHouse />} {/* Fallback to house icon */}
        </span>

        {/* Button text */}
        <span className="mx-2 font-inter font-bold">
          {selectedItem?.text || buttonText}
        </span>

        {/* Right icon (chevron) */}
        <span
          className={`flex items-center justify-center px-2 py-1 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {buttonIconRight || <FaChevronDown />} {/* Fallback to chevron */}
        </span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 bg-black border border-white border-t-0 antialiased rounded-b-[12px] z-10">
          <ul className="py-2">
            {dropdownItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="flex items-center px-2 py-1 hover:bg-gray-800 cursor-pointer border-t border-gray-600 text-white"
                onClick={() => {
                  handleClickedItem(item);
                  setIsOpen(false);
                }}
              >
                {/* Item icon */}
                <span className="flex items-center justify-center px-2 py-1">
                  {item.icon}
                </span>
                {/* Item text */}
                <span className="mx-2 font-inter font-bold">{item.text}</span>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;