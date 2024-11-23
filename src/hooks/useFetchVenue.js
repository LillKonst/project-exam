// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// export default function useFetchVenue() {
//   const [venue, setVenue] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const { id } = useParams();

//   useEffect(() => {
//     async function fetchVenue() {
//       try {
//         setIsLoading(true);
//         setIsError(false);
//         const response = await fetch(
//           `${import.meta.env.VITE_APP_BASEURL}holidaze/venues/${id}`
//         );
//         const data = await response.json();
//         setVenue(data.data);
//       } catch (error) {
//         console.error("Error fetching venue:", error);
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchVenue();
//   }, [id]);

//   return { venue, isLoading, isError };
// }

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

async function fetchVenue(id) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASEURL}holidaze/venues/${id}?_bookings=true`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const json = await response.json();
  return json.data || json;
}

export default function useFetchVenue() {
  const { id } = useParams();

  return useQuery({
    queryKey: ["venue", id],
    queryFn: () => fetchVenue(id),
    enabled: !!id,
  });
}
