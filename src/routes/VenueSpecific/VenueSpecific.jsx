
import useFetchVenue from "../../hooks/useFetchVenue.js";
import VenueDetails from "../../components/cards/VenueDetails/VenueDetails"
import { useVenue } from "../../context/VenueContext.jsx";
import BookVenue from "../../components/cards/VenueDetails/BookVenue.jsx";

export default function VenueSpecific() {
    // const { venue, isLoading, isError } = useFetchVenue();
    const { venue, isLoading, isError } = useVenue();
    
    
    

    if (isLoading) {
        return <div>Loading venue details...</div>;
    }

    if (isError) {
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