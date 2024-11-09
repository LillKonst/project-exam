import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import BookingCard from "../cards/BookingCard/BookingCard";

export default function MyBookings() {
  const { user } = useAuth();
  const [upcomingHolidaze, setUpcomingHolidaze] = useState([]);

  useEffect(() =>{
    if (user && user.bookings) {
      const currentDate = new Date ();

      const filteredBookings = user.bookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return bookingDate > currentDate; 
      });

      setUpcomingHolidaze(filteredBookings);
    }
  }, [user]);

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold">MY UPCOMING HOLIDAZE ({user?._count?.bookings || 0})</h2>
      {upcomingHolidaze.length > 0 ? (
          upcomingHolidaze.map((booking) => (
            <BookingCard key={booking.id} booking={booking}/>
            ))
        ) : (
            <p>No upcoming stays.</p>
        )}
    </div>
  );
}