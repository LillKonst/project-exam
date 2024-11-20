import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import VenueLinkSm from "../cards/VenueLinkSm/VenueLinkSm";
import { useMyVenues } from "../../hooks/useMyVenues";


export default function MyVenues() {
  const { user } = useAuth(); 
  console.log('User in MyVenues:', user);
  const { venues, loading, error } = useMyVenues(user); 
  console.log("Venues:", venues);

  if (loading) {
    return <p>Loading venues...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="flex flex-col">
      <div className="flex">
        <h2 className="text-xl font-semibold">MY VENUES </h2>
        <Link to="/RegisterVenue"><button className="ms-auto border rounded-md">REGISTER VENUE</button></Link>
        <div>
        {venues.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {venues.map((venue) => (
              <VenueLinkSm key={venue.id} venue={venue} />
            ))}
          </div>
        ) : (
          <p>No Venues</p>
        )}
        </div>
      </div>
    </div>
    
  );
}