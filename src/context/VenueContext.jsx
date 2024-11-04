import React, { createContext, useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'react-router-dom';

const VenueContext = createContext();

async function fetchVenue(id) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASEURL}holidaze/venues/${id}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const json = await response.json();
  return json.data || json;
}

export const VenueProvider = ({ children }) => {
  const { id } = useParams();
  const { data: venue, isLoading, isError } = useQuery({
    queryKey: ["venue", id],
    queryFn: () => fetchVenue(id),
    enabled: !!id,
});


return (
    <VenueContext.Provider value={{ venue, isLoading, isError }}>
      {children}
    </VenueContext.Provider>
  );
};

export const useVenue = () => {
  return useContext(VenueContext);
};
