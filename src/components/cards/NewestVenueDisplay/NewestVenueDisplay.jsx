import VenueLinkSm from "../VenueLinkSm/VenueLinkSm";
import useQueryVenues from "../../../hooks/useQueryVenues";

export default function NewestVenueDisplay() {
  const { data: venues, isLoading, isError } = useQueryVenues();

  if (isLoading) {
    return <p>Loading venues...</p>;
  }

  if (isError || !venues || venues.length === 0) {
    return <p>Failed to load venues or no venues available.</p>;
  }

  const latestVenues = venues.slice(0, 3);
  return (
    <div className="w-full my-5 p-3">
      <h2 className="text-xl font-semibold m-3">Newly Uploaded Venues</h2>
      <div className="grid grid-cols-12 sm:grid-cols-6 md:grid-cols-12 gap-1 mx-2 sm:mx-5">
        {latestVenues && latestVenues.length > 0 ? (
          latestVenues.map((venue) => (
            <VenueLinkSm key={venue.id} venue={venue} />
          ))
        ) : (
          <p>No venues available.</p>
        )}
      </div>
    </div>
  );
}
