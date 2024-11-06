// AllVenues.jsx
import { useState } from "react";
import CalendarForm from "../../components/calendarForm/CalendarForm";
import ListOfVenues from "../../components/ListOfVenues/ListOfVenues";
import useApiVenues from "../../hooks/useApiVenues";

export default function AllVenues() {
  const [searchParams, setSearchParams] = useState({
    location: {
      address: "",
      city: "",
      country: "",
    },
    checkInDate: null,
    checkOutDate: null,
    guests: 2,
  });

  // Use the search parameters to fetch venues with the useApiVenues hook
  const { data: venues, isLoading, isError } = useApiVenues(searchParams);

  // Handle search submit (when the user submits the CalendarForm)
  const handleSearchSubmit = (newParams) => {
    setSearchParams(newParams);
  };

  return (
    <div>
      <h1>Find your next vacation spot</h1>

      {/* Calendar Form */}
      <div className="w-10/12 bg-blue-400 rounded-2xl m-12 p-4">
        <CalendarForm onSearchSubmit={handleSearchSubmit} />
      </div>

      <div>
        <h2>Search Results</h2>
        <ListOfVenues venues={venues} isLoading={isLoading} isError={isError} />
      </div>
    </div>
  );
}
