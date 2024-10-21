import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {APIUrl} from "./useApiVenues";

export default function useFetchProduct() {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        async function fetchProduct(APIUrl) {
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

        fetchProduct(APIUrl);

    }, [id]);

   

    return { product, isLoading, isError };
}