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

export default function ListOfVenues() {
  const { data: venues, isLoading, isError } = useApiVenues();

  if (isLoading) {
    return <div>Loading venues...</div>;
  }

  if (isError) {
    return <div>Error loading venues...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center mx-2">
      <h1 className="text-xl sm:text-2xl md:text-4xl">Your Next Holidaze</h1>
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
