import { useAuth } from "../../context/AuthContext"

export default function ProfileInfo() {
  const { user, isVenueManager } = useAuth();

  if (!user) {
    return <div>No user information available.</div>
  }

  const userData = user.data; 

  return (
    <div>
      {userData.avatar && userData.avatar.url && (
        <img
        src={userData.avatar.url}
        alt={userData.avatar.alt || "User Avatar"}
        className="w-16 h-16 rounded-full mb-4"
        />
      )}

      <div>
        <p>{userData.name}</p>
        {isVenueManager && (
          <p>Venue Manager</p>
        )}
      </div>

      <div>
      <strong>Email:</strong> {userData.email}
      </div>

      <div>
        <strong>Bio:</strong> {userData.bio}
      </div>
    </div>
  );
}