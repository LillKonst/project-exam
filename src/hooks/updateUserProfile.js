export async function updateUserProfileAPI(newUserData, accessToken, user) {
  console.log("User object before updating profile:", user);
  console.log("Access Token:", accessToken);

  const payload = {};
  if (newUserData.bio !== undefined) payload.bio = newUserData.bio;
  if (newUserData.avatarUrl)
    payload.avatar = { url: newUserData.avatarUrl, alt: "User Avatar" };
  if (newUserData.venueManager !== undefined)
    payload.venueManager = newUserData.venueManager;

  console.log("Payload being sent to API:", payload);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASEURL}holidaze/profiles/${user}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": import.meta.env.VITE_APP_API_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const updatedUserData = await response.json();
    return updatedUserData.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
