import { useQuery } from "@tanstack/react-query";

export default function useMyVenues(user) {
  const queryKey = ["venues", user?.name];
  const queryFn = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.accessToken;
    if (!token) {
      throw new Error("Access token is missing or expired.");
    }

    const response = await fetch(
      `${import.meta.env.VITE_APP_BASEURL}holidaze/profiles/${
        user.name
      }/venues?_bookings=true`,
      {
        headers: {
          "X-Noroff-API-Key": import.meta.env.VITE_APP_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch venues");
    }

    const data = await response.json();
    return data.data;
  };

  const {
    data: venues = [],
    error,
    isLoading: loading,
  } = useQuery({
    queryKey,
    queryFn,
    enabled: !!user?.name,
  });

  return { venues, loading, error };
}
