import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {APIUrl} from "./useApiVenues";

export const VenueURL = "https://v2.api.noroff.dev/holidaze/venues";

export default function useFetchProduct() {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        async function fetchProduct(VenueURL) {
            try {
                setIsLoading(true);
                setIsError(false);
                const response = await fetch(`${APIUrl}/${id}`);
                const data = await response.json();
                setProduct(data.data);
            } catch (error) {
                console.error("Error fetching product:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProduct(VenueURL);

    }, [id]);

   

    return { product, isLoading, isError };
}