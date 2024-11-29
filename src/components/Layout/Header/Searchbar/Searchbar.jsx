import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Searchbar({ className }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_APP_BASEURL}holidaze/venues`)
      .then((response) => response.json())
      .then((json) => {
        setResults(json.data);
        console.log(json);
      })
      .catch((err) => console.error("Error fetching data:", err));
  };

  const handleSearch = (value) => {
    setQuery(value);
    if (value.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
  };

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

  const handleProductClick = (venueId) => {
    setQuery("");
    navigate(`/venues/${venueId}`);
  };

  return (
    <div className={`relative w-full lg:w-fit ${className}`}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex justify-center lg:justify-end items-center lg:px-3"
      >
        <div className="flex items-center w-full border bg-white/50 border-gray-300 rounded-2xl m-4 lg:m-2 lg:mt-3 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search me-2"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            className="bg-transparent focus:bg-white border-none outline-none w-full"
          />
        </div>
      </form>

      {query.length > 0 && filteredResults.length > 0 && (
        <div className="absolute top-full left-0 w-screen sm:w-full bg-white shadow-lg z-50 border border-gray-200 mt-1 rounded">
          <h2 className="m-2 text-lg border-b">
            Results ({filteredResults.length})
          </h2>
          <ul className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500">
            {filteredResults.map((venue, index) => (
              <li
                key={index}
                onClick={() => handleProductClick(venue.id)}
                className="flex items-center p-2 hover:bg-gray-200 cursor-pointer border-b"
              >
                <img
                  src={venue.media[0]?.url || "default_image_url"}
                  alt={venue.media[0]?.alt || "Venue Image"}
                  className="w-12 h-12 object-cover rounded mr-4"
                />
                <span>{venue.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

Searchbar.propTypes = {
  className: PropTypes.string.isRequired,
};
