import VenueLinkSm from "../cards/VenueLinkSm/VenueLinkSm";
import useBestRankedVenues from "../../hooks/useBestRankedVenues";

export default function BestRankedVenueDisplay() {
  const { data: venues, isLoading, isError } = useBestRankedVenues();

  if (isLoading) {
    return <p>Loading venues...</p>;
  }

  if (isError || !venues || venues.length === 0) {
    return <p>Failed to load venues or no venues available.</p>;
  }

  return (
    <div className="w-full my-5 p-3">
      <h2 className="text-xl font-semibold m-3">Top 3 Ranked Venues</h2>
      <div className="grid grid-cols-12 sm:grid-cols-6 md:grid-cols-12 gap-1 mx-2 sm:mx-5">
        {venues && venues.length > 0 ? (
          venues.map((venue) => <VenueLinkSm key={venue.id} venue={venue} />)
        ) : (
          <p>No venues available.</p>
        )}
      </div>
    </div>
  );
}
