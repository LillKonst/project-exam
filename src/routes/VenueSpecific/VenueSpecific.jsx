
import useFetchVenue from "../../hooks/useFetchVenue.js";
import VenueDetails from "../../components/cards/VenueDetails/VenueDetails"
import { useVenue } from "../../context/VenueContext.jsx";

export default function VenueSpecific() {
    // const { venue, isLoading, isError } = useFetchVenue();
    const { venue, isLoading, isError } = useVenue();

    if (isLoading) {
        return <div>Loading product details...</div>;
    }

    if (isError) {
        return <div>Error loading product details.</div>;
    }

    if (!venue) {
        return <div>No product data available.</div>;
    }
    
    return (
        <div>
            <div className="h-[70px]"></div>
            <VenueDetails venue={venue} />
        </div>
    );
}