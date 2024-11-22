import ProfileInfo from "../../components/ProfileInfo/ProfileInfo"
import MyVenues from "../../components/MyVenues/MyVenues";
import MyBookings from "../../components/MyBookings/MyBookings";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { isVenueManager } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center my-3 mx-12">
      <div className="w-full mx-10 mt-3">
        <ProfileInfo />        <div className="flex justify-center w-full gap-2">
        <button className="bg-yellow-400 p-2 rounded w-full m-4">BOOK A HOLIDAY</button>
        <Link to="/RegisterVenue" className="bg-yellow-400 p-2 rounded w-full m-4 text-center font-semibold"><button>REGISTER A VENUE</button></Link>
      </div>
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