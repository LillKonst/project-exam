import { useState, useEffect } from "react";

// API URL
export const VenueURL = "https://v2.api.noroff.dev/holidaze/venues";

// Custom hook for fetching data from the API
export default function useApiVenues(VenueURL) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                console.log("Fetching data from API...");
                setIsLoading(true);
                setIsError(false);
                const response = await fetch(VenueURL);

                console.log("API Response:", response);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json();
                setData(json.data || json);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        getData();
    }, []);

    return { data, isLoading, isError };
}