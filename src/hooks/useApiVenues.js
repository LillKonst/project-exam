// import { useState, useEffect } from "react";

// // Custom hook for fetching data from the API
// export default function useApiVenues() {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     async function getData() {
//       try {
//         console.log("Fetching data from API...");
//         setIsLoading(true);
//         setIsError(false);
//         const response = await fetch(
//           `${import.meta.env.VITE_APP_BASEURL}holidaze/venues`
//         );

//         console.log("API Response:", response);

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const json = await response.json();
//         setData(json.data || json);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     getData();
//   }, []);

//   return { data, isLoading, isError };
// }

import { useQuery } from "@tanstack/react-query";

// Fetch function for venues
async function fetchVenues() {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASEURL}holidaze/venues`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const json = await response.json();
  return json.data || json;
}

export default function useApiVenues() {
  return useQuery({
    queryKey: ["venues"],
    queryFn: fetchVenues,
    staleTime: 60000,
    cacheTime: 300000,
  });
}
