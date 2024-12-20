import { useQuery } from "@tanstack/react-query";

const fetchVenues = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASEURL}holidaze/venues?sort=created&sortOrder=desc&limit=9`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch venues");
  }
  const json = await response.json();
  return json.data;
};

export default function useQueryVenues() {
  return useQuery({
    queryKey: ["venues"],
    queryFn: fetchVenues,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: true,
  });
}
