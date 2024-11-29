import VenueLinkSm from "../cards/VenueLinkSm/VenueLinkSm";
import useQueryVenues from "../../hooks/useQueryVenues";
import Searchbar from "../Layout/Header/Searchbar/Searchbar";
import usePaginatedVenues from "../../hooks/usePaginatedVenues";

export default function ListOfVenues() {
  const {
    data: venues,
    isLoading,
    isError,
    page,
    setPage,
  } = usePaginatedVenues();

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading && page === 1) {
    return <div>Loading venues...</div>;
  }

  if (isError) {
    return <div>Error loading venues...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center mx-8">
      <div className="flex items-center justify-start w-full px-5">
        {/* <h1 className=" text-xl sm:text-2xl md:text-4xl">Your Next Holidaze</h1>
              <Searchbar className="ms-auto"/> */}
      </div>
      <div className="grid grid-cols-12 gap-1 w-full mx-2">
        {venues && venues.length > 0 ? (
          venues.map((venue) => <VenueLinkSm key={venue.id} venue={venue} />)
        ) : (
          <p>No venues available.</p>
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        {/* Previous Button */}
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={handlePreviousPage}
          disabled={page === 1} // Disable when on the first page
        >
          Previous
        </button>

        {/* Page Indicator */}
        <span className="mx-4 text-lg font-medium">Page {page}</span>

        {/* Next Button */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleNextPage}
          disabled={isLoading} // Optional: Prevent multiple clicks during loading
        >
          Next
        </button>
      </div>
    </div>
  );
}

// import VenueLinkSm from "../cards/VenueLinkSm/VenueLinkSm";
// import useQueryVenues from "../../hooks/useQueryVenues";
// import FilterButton from "../Buttons/FilterButton";
// import { useState } from "react";

// export default function ListOfVenues({queryParams}) {
//   const { data: venues, isLoading, isError } = useQueryVenues(queryParams);

//   if (isLoading) {
//     return <div>Loading venues...</div>;
//   }

//   if (isError) {
//     return <div>Error loading venues...</div>;
//   }

//   const filteredVenues = venues.filter((venue) => {
//     const meta = venue.meta || {};
//     return (
//       (!filters.wifi || meta.wifi) &&
//       (!filters.breakfast || meta.breakfast) &&
//       (!filters.parking || meta.parking) &&
//       (!filters.pets || meta.pets)
//     );
//   });

//   return (
//     <div className="flex flex-col justify-center items-center">
//       <div className="w-10/12 p-6 flex flex-col justify-center items-center">
//         <div className="flex justify-center items-center w-full">
//           <h2 className=" mx-3 text-3xl">Search Input Number of Results</h2>
//           <div className="ms-auto">
//             <FilterButton onFilterChange={handleFilterChange}/>
//           </div>
//       </div>

//       <div className="grid grid-cols-12 gap-1 w-full mx-2">
//       {filteredVenues && filteredVenues.length > 0 ? (
//             filteredVenues.map((venue) => (
//               <VenueLinkSm key={venue.id} venue={venue} />
//             ))
//           ) : (
//             <p>No venues available.</p>
//           )}
//       </div>
//       </div>
//     </div>
//   );
// }
