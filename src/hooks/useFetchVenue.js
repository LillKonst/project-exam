import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function useFetchVenue() {
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchVenue() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASEURL}holidaze/venues/${id}`
        );
        const data = await response.json();
        setVenue(data.data);
      } catch (error) {
        console.error("Error fetching venue:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenue();
  }, [id]);

  return { venue, isLoading, isError };
}
