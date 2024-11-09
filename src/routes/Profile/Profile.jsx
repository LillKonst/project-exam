import ProfileInfo from "../../components/ProfileInfo/ProfileInfo"
import MyVenues from "../../components/MyVenues/MyVenues";
import MyBookings from "../../components/MyBookings/MyBookings";
import { useAuth } from "../../context/AuthContext";
import EditProfile from "../../components/EditProfile/EditProfile";

export default function Profile() {
  const { isVenueManager } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-10/12">
        <ProfileInfo />
        <div className="h-[100px]"></div>
        {isVenueManager ? (
          <>
            <MyBookings />
            <MyVenues />
            {/* <BookedVenues /> */}
          </>
        ) : (
            <MyBookings />
        )}
      
      </div>
    </div>
  );
}