import ProfileInfo from "../../components/ProfileInfo/ProfileInfo"
import MyVenues from "../../components/MyVenues/MyVenues";
import MyBookings from "../../components/MyBookings/MyBookings";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { isVenueManager } = useAuth();
  return (
    <div className="flex flex-col my-3 mx-12">
       <ProfileInfo />      
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
  );
}