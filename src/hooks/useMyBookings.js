import { useQuery } from "@tanstack/react-query";

export default function useMyBookings(user) {
  const queryKey = ["bookings", user?.name];
  const queryFn = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.accessToken;
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
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch bookings");
    }

    const data = await response.json();
    return data.data;
  };

  const {
    data: bookings = [],
    error,
    isLoading: loading,
  } = useQuery({
    queryKey,
    queryFn,
    enabled: !!user?.name,
  });

  return { bookings, loading, error };
}
