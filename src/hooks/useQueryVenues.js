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

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

async function fetchVenue(id) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASEURL}holidaze/venues`
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
  });
}
