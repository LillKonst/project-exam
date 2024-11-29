import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useUpdateVenue() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.accessToken;
  if (!token) {
    throw new Error("Access token is missing or expired.");
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const updateVenue = async (venueId, updatedVenue) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASEURL}holidaze/venues/${venueId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": import.meta.env.VITE_APP_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedVenue),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update venue");
      }

      const data = await response.json();
      console.log("Venue updated successfully:", data);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
      console.error("Failed to update venue:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateVenue, loading, error };
}
