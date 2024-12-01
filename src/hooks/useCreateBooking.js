import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createBooking(newBooking) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.accessToken;
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
    },
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(
      `Failed to create booking: ${
        errorResponse.message || response.statusText
      }`,
    );
  }

  const json = await response.json();
  return json.data;
}

export default function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error creating booking:", error);
    },
  });
}
