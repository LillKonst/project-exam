import VenueLinkSm from "../cards/VenueLinkSm/VenueLinkSm"
import useApiVenues from "../../hooks/useApiVenues";

export default function ListOfVenues() {
    const { data: venues, isLoading, isError } = useApiVenues("https://v2.api.noroff.dev/holidaze/venues");

    if (isLoading) {
        return <div>Loading venues...</div>;
      }
    
      if (isError) {
        return <div>Error loading venues...</div>;
      }


    return (
        <div>
            {venues && venues.length > 0 ? (
                venues.map((venue) => <VenueLinkSm key={venue.id} venue={venue} />)
            ) : (
                <p>No venues available.</p>
            )}
        </div>
    );
}