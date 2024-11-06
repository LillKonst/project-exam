// useApiVenues.js
import { useQuery } from "@tanstack/react-query";

// Fetch function for venues with query parameters
async function fetchVenues(queryParams) {
  const { location, checkInDate, checkOutDate, guests } = queryParams;
  const url = new URL(`${import.meta.env.VITE_APP_BASEURL}holidaze/venues`);
  const params = new URLSearchParams();

  if (location.city) params.append("city", location.city);
  if (location.address) params.append("address", location.address);
  if (location.country) params.append("country", location.country);
  if (checkInDate) params.append("checkInDate", checkInDate);
  if (checkOutDate) params.append("checkOutDate", checkOutDate);
  if (guests) params.append("guests", guests);

  if (params.toString()) {
    url.search = params.toString();
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const json = await response.json();
  return json.data || json;
}

export default function useApiVenues(queryParams) {
  return useQuery({
    queryKey: ["venues", queryParams],
    queryFn: () => fetchVenues(queryParams),
    staleTime: 60000,
    cacheTime: 300000,
  });
}
