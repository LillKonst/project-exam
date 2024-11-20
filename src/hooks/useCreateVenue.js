export async function useCreateVenue(formData) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASEURL}holidaze/venues`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": import.meta.env.VITE_APP_API_KEY,
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create venue");
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
}
