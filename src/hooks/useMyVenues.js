import { useState, useEffect } from "react";

export async function useMyVenues(user) {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.name) {
      setLoading(false);
      return;
    }

    async function fetchUserVenues() {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASEURL}holidaze/profiles/${
            user.name
          }/venues`,
          {
            headers: {
              "X-Noroff-API-Key": import.meta.env.VITE_APP_API_KEY,
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch venues");
        }

        const data = await response.json();
        console.log("Fetched venues data:", data);
        setVenues(data.data || []); // Set venues from response
      } catch (err) {
        console.error("Error fetching venues:", err);
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Finish loading
      }
    }

    fetchUserVenues();
  }, [user]);
  return { venues, loading, error };
}
