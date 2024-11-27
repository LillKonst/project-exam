// import { useMutation } from "@tanstack/react-query";

// async function deleteVenue(id) {
//   const response = await fetch(
//     `${import.meta.env.VITE_APP_BASEURL}holidaze/venues/${id}`,
//     {
//       method: "DELETE",
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to delete venue");
//   }

//   return response;
// }

// export function useDeleteVenue() {
//   return useMutation(deleteVenue);
// }

import { useMutation } from "@tanstack/react-query";

async function deleteVenueAPI(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.accessToken; // If accessToken is stored inside the user object
  if (!token) {
    throw new Error("Access token is missing or expired.");
  }

  const response = await fetch(
    `${import.meta.env.VITE_APP_BASEURL}holidaze/venues/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": import.meta.env.VITE_APP_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete venue");
  }

  return response; // No content will be returned, but we can still return a response object for consistency
}

export function useDeleteVenue() {
  const mutation = useMutation({
    mutationFn: deleteVenueAPI,
    onError: (error) => {
      console.error("Error occurred while deleting:", error.message);
    },
  });

  return { ...mutation, mutateAsync: mutation.mutateAsync }; // Return mutateAsync alongside other properties
}
