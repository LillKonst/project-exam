import { useAuth } from "../../context/AuthContext";
import CreateVenue from "../CreateVenue";

export default function MyVenues() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col">
      <div className="flex">
        <h2 className="text-xl font-semibold">MY VENUES ({user?._count?.venues || 0})</h2>
        <button className="ms-auto border rounded-md">REGISTER VENUE</button>
        <div>
          <CreateVenue />
        </div>
      </div>
     
      <p>No upcoming stays.</p>
    </div>
    
  );
}