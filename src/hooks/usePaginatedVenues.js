import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function usePaginatedVenues() {
  const [page, setPage] = useState(1);
  const limit = 60;

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
    return json.data || json;
  };

  const query = useQuery({
    queryKey: ["venues", page],
    queryFn: () => fetchVenues({ pageParam: page }),
    keepPreviousData: true,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    page,
    limit,
    setPage,
    totalPages: Math.ceil(query.data?.totalCount / limit) || 0, // Calculate total pages
  };
}
