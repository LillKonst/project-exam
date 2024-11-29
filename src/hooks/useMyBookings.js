import { useQuery } from "@tanstack/react-query";

export default function useMyBookings(user) {
  const queryKey = ["bookings", user?.name];
  const queryFn = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.accessToken; // If accessToken is stored inside the user object
    if (!token) {
      throw new Error("Access token is missing or expired.");
    }

    const response = await fetch(
      `${import.meta.env.VITE_APP_BASEURL}holidaze/profiles/${
        user.name
      }/bookings?_venue=true`,
      {
        headers: {
          "X-Noroff-API-Key": import.meta.env.VITE_APP_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch bookings");
    }

    const data = await response.json();
    return data.data;
  };

  // React Query with object form
  const {
    data: bookings = [], // default to empty array
    error,
    isLoading: loading,
  } = useQuery({
    queryKey,
    queryFn,
    enabled: !!user?.name, // Prevent running the query if user.name is not available
  });

  return { bookings, loading, error };
}
