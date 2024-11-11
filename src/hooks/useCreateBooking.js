import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createBooking(newBooking) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASEURL}holidaze/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBooking),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create booking");
  }

  const json = await response.json();
  return json.data;
}

export default function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation(createBooking, {
    onSuccess: (data) => {
      // Optional: Invalidate or update relevant queries after a successful booking
      // Example: queryClient.invalidateQueries(['bookings']);
    },
  });
}
