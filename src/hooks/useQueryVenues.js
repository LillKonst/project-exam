// import { useQuery } from "@tanstack/react-query";
// import { fetchFilteredVenues } from "./fetchFilteredVenues";

// export default function useQueryVenues(queryParams) {
//   return useQuery({
//     queryKey: ["venues", queryParams],
//     queryFn: () => fetchFilteredVenues(queryParams),
//     staleTime: 60000,
//     cacheTime: 300000,
//   });
// }

// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";

// async function fetchVenus() {
//   const response = await fetch(
//     `${import.meta.env.VITE_APP_BASEURL}holidaze/venues`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch venues");
//   }

//   const json = await response.json();
//   return json.data || json;
// }

// // export default function useFetchVenue() {
// //   const { id } = useParams();

// //   return useQuery({
// //     queryKey: ["venue", id],
// //     queryFn: () => fetchVenue(id),
// //   });
// // }

// export default function useQueryVenues() {
//   return useQuery({
//     queryKey: ["venues"], // Simple query key for all venues
//     queryFn: fetchVenues,
//     staleTime: 0, // Force data refresh when querying
//     cacheTime: 0, // Don't cache old data
//     refetchOnWindowFocus: true, // Refetch if the window regains focus
//   });
// }

import { useQuery } from "@tanstack/react-query";

// Fetch all venues
const fetchVenues = async ({ pageParam = page }) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_APP_BASEURL
    }holidaze/venues?sort=created&sortOrder=desc&limit=${limit}&page=${pageParam}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch venues");
  }

  const json = await response.json();
  return { venues: json.data || json, totalCount: json.totalCount };
};

// Custom hook to fetch all venues
export default function useQueryVenues() {
  return useQuery({
    queryKey: ["venues"],
    queryFn: fetchVenues,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: true,
  });
}
