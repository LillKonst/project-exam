// import VenueLinkSm from "../cards/VenueLinkSm/VenueLinkSm"
// import useApiVenues from "../../hooks/useApiVenues";

// export default function ListOfVenues() {
//     const { data: venues, isLoading, isError } = useApiVenues();

//     if (isLoading) {
//         return <div>Loading venues...</div>;
//       }
    
//       if (isError) {
//         return <div>Error loading venues...</div>;
//       }


//     return (
//         <div className="flex flex-col justify-center items-center mx-2">
//             <h1 className=" text-xl sm:text-2xl md:text-4xl">Your Next Holidaze</h1>
//             <div className="grid grid-cols-12 gap-1 w-full mx-2">
//                 {venues && venues.length > 0 ? (
//                     venues.map((venue) => <VenueLinkSm key={venue.id} venue={venue} />)
//                 ) : (
//                     <p>No venues available.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

import VenueLinkSm from "../cards/VenueLinkSm/VenueLinkSm";
import useApiVenues from "../../hooks/useApiVenues";
import Searchbar from "../Layout/Header/Searchbar/Searchbar";

export default function ListOfVenues({ venues, isLoading, isError }) {
  // const { data: venues, isLoading, isError } = useApiVenues();
 
  if (isLoading) {
    return <div>Loading venues...</div>;
  }

  if (isError) {
    return <div>Error loading venues...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-customWhite w-11/12 my-12 p-6 rounded-lg flex flex-col justify-center items-center mx-2">
      <div className="w-full flex justify-start items-center m-2">
      <h1 className="text-xl sm:text-2xl md:text-4xl">Your Next Holidaze</h1>
      <button className="border bg-white/50 rounded-2xl py-2 px-3 ms-auto">FILTER</button>
      {/* <Searchbar /> */}
      </div>
      
      
      <div className="grid grid-cols-12 gap-1 w-full mx-2">
        {venues && venues.length > 0 ? (
          venues.map((venue) => <VenueLinkSm key={venue.id} venue={venue} />)
        ) : (
          <p>No venues available.</p>
        )}
      </div>
      </div>
    </div>
  );
}
