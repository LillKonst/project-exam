import { useQuery } from "@tanstack/react-query";

const fetchBestRankedVenues = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASEURL}holidaze/venues?sort=rating&sortOrder=desc&limit=3`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch venues");
  }
  const json = await response.json();
  return json.data;
};

export default function useQueryBestRankedVenues() {
  return useQuery({
    queryKey: ["best-ranked-venues"],
    queryFn: fetchBestRankedVenues,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: true,
  });
}
