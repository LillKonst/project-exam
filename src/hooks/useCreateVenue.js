export async function useCreateVenue(formData) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.accessToken; // If accessToken is stored inside the user object
  if (!token) {
    throw new Error("Access token is missing or expired.");
  }

  console.log("Authorization Token:", token);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASEURL}holidaze/venues`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": import.meta.env.VITE_APP_API_KEY,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create venue");
    }

    const json = await response.json();
    console.log("Created Venue Response:", json);
    return json.data;
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
}
