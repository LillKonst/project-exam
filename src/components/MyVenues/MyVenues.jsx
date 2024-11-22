import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import VenueLinkSm from "../cards/VenueLinkSm/VenueLinkSm";
import useMyVenues from "../../hooks/useMyVenues";


export default function MyVenues() {
  const { user } = useAuth(); 
  console.log('User in MyVenues:', user);
  const { venues, loading, error } = useMyVenues(user); 
  console.log("MyComponent rendered with user:", user);
  console.log("Venues:", venues);

  if (loading) {
    return <p>Loading venues...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="flex flex-col m-5">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">MY VENUES ({user?._count?.venues || 0})</h2>
        <div>
        {venues.length > 0 ? (
          <div className="grid grid-cols-12 gap-1">
            {venues.map((venue) => (
              <VenueLinkSm key={venue.id} venue={venue} />
            ))}
          </div>
        ) : (
          <p className="p-3 font-semibold text-lg">No Venues</p>
        )}
        </div>
      </div>
    </div>
    
  );
}