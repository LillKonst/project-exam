import VenueLinkSm from "../cards/VenueLinkSm/VenueLinkSm"
import useQueryVenues from "../../hooks/useQueryVenues";

export default function ListOfVenues() {
    const { data: venues, isLoading, isError } = useQueryVenues();

    if (isLoading) {
        return <div>Loading venues...</div>;
      }
    
      if (isError) {
        return <div>Error loading venues...</div>;
      }


    return (
        <div className="flex flex-col justify-center items-center mx-2">
            <h1 className=" text-xl sm:text-2xl md:text-4xl">Your Next Holidaze</h1>
            <div className="grid grid-cols-12 gap-1 w-full mx-2">
                {venues && venues.length > 0 ? (
                    venues.map((venue) => <VenueLinkSm key={venue.id} venue={venue} />)
                ) : (
                    <p>No venues available.</p>
                )}
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
