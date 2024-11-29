import { useState } from "react";

export default function FilterButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    wifi: false,
    breakfast: false,
    parking: false,
    pets: false,
  });

  const toggleFilterVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleFilterClick = (filter) => {
    // Toggle the selected filter's value
    setActiveFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [filter]: !prevFilters[filter] };
      onFilterChange(newFilters);  // Pass the updated filters to the parent component
      return newFilters;
    });
  };

  return (
    <div className="flex ms-auto">
      <button 
      onClick={toggleFilterVisibility}
      className="mx-2 my-1 border border-gray-300 rounded-xl p-2 text-sm font-semibold"
      >
        FILTER
      </button>
      {isVisible && (  
        <div className="flex mx-1">
        <button
          className={`m-1 border border-gray-400 rounded-xl p-2 ${
              activeFilters.wifi ? "bg-yellow-300" : ""
            }`} 
          onClick={() => handleFilterClick("wifi")}
        >
          WIFI
        </button>
        <button
          className="m-1 border border-gray-400 rounded-xl p-2"
          onClick={() => handleFilterClick("breakfast")}
        >
          BREAKFAST
        </button>
        <button
          className="m-1 border border-gray-400 rounded-xl p-2"
          onClick={() => handleFilterClick("parking")}
        >
          PARKING
        </button>
        <button
          className="m-1 border border-gray-400 rounded-xl p-2"
          onClick={() => handleFilterClick("pets")}
        >
          PETS ALLOWED
        </button>
      </div>
      )}
    </div> 
  );
}