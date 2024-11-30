import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function useExploreVenues() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filters, setFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });
  const limit = 60;

  useEffect(() => {
    fetchVenues({ search, page, sort, sortOrder, filters });
  }, [search, page, sort, sortOrder, filters]);

  const fetchVenues = async ({ pageParam = page }) => {
    const queryParams = new URLSearchParams({
      sort,
      sortOrder,
      limit,
      page: pageParam,
    });

    if (search) queryParams.append("search", search);

    Object.keys(filters).forEach((filter) => {
      if (filters[filter]) queryParams.append(filter, true);
    });

    const response = await fetch(
      `${import.meta.env.VITE_APP_BASEURL}holidaze/venues?${queryParams}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch venues");
    }
    const json = await response.json();
    return json.data || json;
  };

  const query = useQuery({
    queryKey: ["venues", page, search, sort, sortOrder, filters],
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
    search,
    setSearch,
    sort,
    setSort,
    sortOrder,
    setSortOrder,
    filters,
    setFilters,
    totalPages: Math.ceil(query.data?.totalCount / limit) || 0,
  };
}
