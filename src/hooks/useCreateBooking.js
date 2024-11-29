import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createBooking(newBooking) {
  console.log("Creating booking with the following data:", newBooking);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.accessToken;
  console.log("Using token:", token);
  if (!token) {
    throw new Error("Access token is missing or expired.");
  }

  const response = await fetch(
    `${import.meta.env.VITE_APP_BASEURL}holidaze/bookings?_venue=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": import.meta.env.VITE_APP_API_KEY,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBooking),
    }
  );

  if (!response.ok) {
    // Log the status and error details for debugging
    const errorResponse = await response.json();
    console.log("Error response:", errorResponse);
    throw new Error(
      `Failed to create booking: ${
        errorResponse.message || response.statusText
      }`
    );
  }

  const json = await response.json();
  return json.data;
}

export default function useCreateBooking() {
  const queryClient = useQueryClient();

  // Use the mutation with mutationFn as the first argument
  return useMutation({
    mutationFn: createBooking, // pass the function in this format for React Query v4+
    onSuccess: (data) => {
      // Optional: Invalidate or update relevant queries after a successful booking
      console.log("Booking successful", data);
      // For example, you can invalidate queries related to bookings
      // queryClient.invalidateQueries(['bookings']);
    },
    onError: (error) => {
      // Optional: Handle errors
      console.error("Error creating booking:", error);
    },
  });
}
