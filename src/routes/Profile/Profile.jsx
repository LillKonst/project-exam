import ProfileInfo from "../../components/ProfileInfo/ProfileInfo"
import MyVenues from "../../components/MyVenues/MyVenues";
import MyBookings from "../../components/MyBookings/MyBookings";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { isVenueManager } = useAuth();
  return (
    <div>
      <div className="h-[70px]"></div>
      <ProfileInfo />
      {isVenueManager ? (
        <MyVenues />
      ) : (
        <MyBookings />
      )}
      
      
    </div>
  );
}