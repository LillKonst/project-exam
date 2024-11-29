import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker"; // assuming you're using this for date selection
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles
import ListOfVenues from "./ListOfVenues/ListOfVenues"; // assuming this is your list component

export default function NewCalendarSearch({ onSearchSubmit, className }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(2);
  const [location, setLocation] = useState({
    city: "",
    address: "",
    country: "",
  });

  const navigate = useNavigate();

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_APP_BASEURL}holidaze/venues`)
      .then((response) => response.json())
      .then((json) => {
        setResults(json.data);
        console.log(json); // Logging data
      })
      .catch((err) => console.error("Error fetching data:", err));
  };

  const handleSearch = (value) => {
    setQuery(value);
    if (value.length > 0) {
      fetchData(); // Fetch data based on search query
    } else {
      setResults([]); // Clear results if query is empty
    }
  };

  // Filter results based on query
  const filteredResults = results.filter((venue) => {
    const venueName = venue.name?.toLowerCase() || "";
    const city = venue.location?.city?.toLowerCase() || "";
    const country = venue.location?.country?.toLowerCase() || "";
    return (
      venueName.includes(query.toLowerCase()) ||
      city.includes(query.toLowerCase()) ||
      country.includes(query.toLowerCase())
    );
  });

  const handleVenueClick = (venueId) => {
    setQuery("");
    navigate(`/venues/${venueId}`);

    const queryParams = {
      location: {
        city: location.city,
        address: location.address,
        country: location.country,
      },
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      guests: guests,
    };

    // Log query parameters when a venue is clicked
    console.log("Search Params:", queryParams);

    // Call onSearchSubmit to pass the selected filters (props from parent)
    onSearchSubmit(queryParams);
  };

  return (
    <div className={`relative w-full md:w-fit ${className}`}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto"
      >
        {/* Location / Name Input */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="location"
            className="text-gray-700 font-semibold mb-1"
          >
            Where Do You Wanna Go
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Where to?"
            className="border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Check-in Date */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="checkInDate"
            className="text-gray-700 font-semibold mb-1"
          >
            Check-in Date
          </label>
          <DatePicker
            id="checkInDate"
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            selectsStart
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={new Date()}
            placeholderText="Select check-in date"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Check-out Date */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="checkOutDate"
            className="text-gray-700 font-semibold mb-1"
          >
            Check-out Date
          </label>
          <DatePicker
            id="checkOutDate"
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            selectsEnd
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={checkInDate}
            placeholderText="Select check-out date"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Number of Guests Dropdown */}
        <div className="flex flex-col w-full">
          <label htmlFor="guests" className="text-gray-700 font-semibold mb-1">
            Number of Guests
          </label>
          <select
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
        >
          Search
        </button>
      </form>

      <ListOfVenues venues={filteredResults} />
    </div>
  );
}

NewCalendarSearch.propTypes = {
  className: PropTypes.string,
  onSearchSubmit: PropTypes.func,
};
