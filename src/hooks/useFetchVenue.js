import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

async function fetchVenue(id) {
  const response = await fetch(
    `${
      import.meta.env.VITE_APP_BASEURL
    }holidaze/venues/${id}?_bookings=true&_owner=true`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const json = await response.json();
  console.log("API Response:", json);
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
