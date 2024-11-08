export async function updateUserProfileAPI(newUserData, accessToken, user) {
  console.log("User object before updating profile:", user);

  const payload = {
    bio: newUserData.bio,
    avatar: {
      url: newUserData.avatarUrl,
      alt: "User Avatar",
    },
    venueManager: newUserData.venueManager,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASEURL}holidaze/profiles/${user}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
