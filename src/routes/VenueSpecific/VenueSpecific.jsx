import VenueDetails from "../../components/cards/VenueDetails/VenueDetails";
import useFetchVenue from "../../hooks/useFetchVenue.js";

export default function VenueSpecific() {
  const { data: venue, isLoading, isError, error } = useFetchVenue();

  if (isLoading) {
    return <div>Loading venue details...</div>;
  }

  if (isError) {
    console.error("Error fetching venue:", error);
    return <div>Error loading venue details.</div>;
  }

  if (!venue) {
    return <div>No venue data available.</div>;
  }

  return (
    <div>
      <VenueDetails venue={venue} />
    </div>
  );
}
