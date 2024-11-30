import VenueLinkSm from "../cards/VenueLinkSm/VenueLinkSm";
import useExploreVenues from "../../hooks/useExploreVenues";
import { useState, useEffect } from "react";

export default function ExploreVenuesList() {
  const {
    data: venues,
    isLoading,
    isError,
    page,
    setPage,
    search,
    setSearch,
    sort,
    setSort,
    sortOrder,
    setSortOrder,
    filters,
    setFilters,
    totalPages,
  } = useExploreVenues();

  const [searchQuery, setSearchQuery] = useState(search);

  const handleSearch = () => {
    console.log("Setting search:", searchQuery);
    setSearch(searchQuery);
  };

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  const handleSortChange = (e) => {
    const [newSort, newSortOrder] = e.target.value.split("-");
    setSort(newSort);
    setSortOrder(newSortOrder);
  };

  const handleFilterChange = (e) => {
    const { name } = e.target;
    setFilters((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const filteredVenues = venues?.filter((venue) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      venue.name.toLowerCase().includes(query) ||
      venue.location?.city?.toLowerCase().includes(query) ||
      venue.location?.country?.toLowerCase().includes(query);

    const passesFilters = Object.entries(filters).every(
      ([filterKey, isActive]) => !isActive || venue.meta?.[filterKey],
    );

    return matchesSearch && passesFilters;
  });

  useEffect(() => {
    console.log("Filtered venues:", filteredVenues);
  }, [filteredVenues]);

  if (isLoading && page === 1) {
    return <div>Loading venues...</div>;
  }

  if (isError) {
    return <div>Error loading venues...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center my-5 mx-8">
      <div className="flex w-full items-center justify-start">
        <h1 className="text-2xl">EXPLORE VENUES</h1>
        <div className="ms-auto mb-4 flex items-center gap-2">
          <p>Sort by:</p>
          <select
            value={`${sort}-${sortOrder}`}
            onChange={handleSortChange}
            className="p-2 border rounded"
          >
            <option value="created-desc">Newest</option>
            <option value="created-asc">Oldest</option>
            <option value="rating-desc">Best Rating</option>
            <option value="rating-asc">Worst Rating</option>
          </select>
        </div>
      </div>
      {/* Search Bar */}
      <div className="w-full mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by location, address, city, country, or continent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>
      <div className="w-full">
        <div className="flex gap-4 mb-4">
          {["wifi", "parking", "breakfast", "pets"].map((filter) => (
            <button
              key={filter}
              onClick={() =>
                setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }))
              }
              className={`px-2 py-1 rounded border ${
                filters[filter]
                  ? "bg-customRed text-white border-customRed"
                  : "bg-customWhite text-gray-800 border-gray-400"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {/* Venue List */}
      <div className="grid grid-cols-12 gap-1 w-full mx-2">
        {filteredVenues && filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <VenueLinkSm key={venue.id} venue={venue} />
          ))
        ) : (
          <p>No venues available.</p>
        )}
      </div>
      ;{/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="mx-4 text-lg font-medium">Page {page}</span>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
