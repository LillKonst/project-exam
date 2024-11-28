import { useAuth } from "../../context/AuthContext";
import useMyVenues from "../../hooks/useMyVenues";
import RegisterVenue from "../../routes/RegisterVenue/RegisterVenue";
import MyVenueCard from "../cards/MyVenueCard/MyVenueCard";
import { Link } from "react-router-dom";


export default function MyVenues() {
  const { user } = useAuth(); 
  const { venues, loading, error } = useMyVenues(user); 
  

  
  const venueCount = venues.length;

  const refreshList = async () => {
    const fetchedVenues = await fetchVenues();
    setVenues(fetchedVenues);
  };

  if (loading) {
    return <p>Loading venues...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="flex flex-col m-5">
      <div className="flex flex-col">
        <div className="flex">
          <h2 className="text-2xl font-semibold">MY VENUES ({venueCount})</h2>
          <Link to="/RegisterVenue" className="ms-auto font-semibold">REGISTER VENUE</Link>
        </div>
        <div>
        {venues.length > 0 ? (
          <div className="flex flex-wrap">
            {venues.map((venue) => (
              <MyVenueCard key={venue.id} venue={venue} bookings={venue.bookings} refreshList={refreshList} />
            ))}
          </div>
        ) : (
          <p className="text-md">No Venues</p>
        )}
        </div>
      </div>
    </div>
    
  );
}