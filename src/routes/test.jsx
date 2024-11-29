import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_APP_BASEURL;

export default function VenuesList() {
  const [venues, setVenues] = useState([]); // Store fetched venues
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // Function to fetch venues from the API
  const fetchVenues = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}holidaze/venues`); // Make API call
      if (!response.ok) {
        throw new Error("Failed to fetch venues");
      }

      const data = await response.json();
      setVenues(data.data || []); // Update state with venues
    } catch (err) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Fetch venues on component mount
  useEffect(() => {
    fetchVenues();
  }, []);

  // Render the component
  if (loading) {
    return <div>Loading venues...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="venues-list">
      <h1>Your Next Holidaze</h1>
      <div className="venues-grid">
        {venues.length > 0 ? (
          venues.map((venue) => (
            <div key={venue.id} className="venue-card">
              <h2>{venue.name}</h2>
              <p>{venue.description}</p>
              <p>Price: ${venue.price}</p>
              <p>Max Guests: {venue.maxGuests}</p>
              <p>Rating: {venue.rating}</p>
              <img
                src={venue.media?.[0]?.url || "https://via.placeholder.com/150"}
                alt={venue.media?.[0]?.alt || "Venue image"}
                className="venue-image"
              />
            </div>
          ))
        ) : (
          <p>No venues available.</p>
        )}
      </div>
    </div>
  );
}
