
import useFetchVenue from "../hooks/useFetchVenue";
import VenueDetails from "../../components/cards/VenueDetails/VenueDetails"

export default function VenueSpecific() {
    const { product, isLoading, isError } = useFetchVenue();

    if (isLoading) {
        return <div>Loading product details...</div>;
    }

    if (isError) {
        return <div>Error loading product details.</div>;
    }

    if (!product) {
        return <div>No product data available.</div>;
    }
    
    return (
        <div>
            <div className="h-[110px] md:h-[70px]"></div>
           <VenueDetails venue={venue} />
        </div>
    );
}