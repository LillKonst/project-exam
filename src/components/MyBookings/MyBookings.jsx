// import { useAuth } from "../../context/AuthContext";
// import { useEffect, useState } from "react";
// import BookingCard from "../cards/BookingCard/BookingCard";

// export default function MyBookings() {
//   const { user } = useAuth();
//   const [upcomingHolidaze, setUpcomingHolidaze] = useState([]);

//   useEffect(() =>{
//     if (user && user.bookings) {
//       const currentDate = new Date ();

//       const filteredBookings = user.bookings.filter((booking) => {
//         const bookingDate = new Date(booking.date);
//         return bookingDate > currentDate; 
//       });

//       setUpcomingHolidaze(filteredBookings);
//     }
//   }, [user]);

//   return (
//     <div className="flex flex-col m-5">
//       <h2 className="text-2xl font-semibold">MY UPCOMING HOLIDAZE ({user?._count?.bookings || 0})</h2>
//       {upcomingHolidaze.length > 0 ? (
//           upcomingHolidaze.map((booking) => (
//             <BookingCard key={booking.id} booking={booking}/>
//             ))
//         ) : (
//             <p className="p-3 font-semibold text-lg">No upcoming stays.</p>
//         )}
//     </div>
//   );
// }


// src/components/MyBookings/MyBookings.js

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import useMyBookings from "../../hooks/useMyBookings";
import BookingCard from "../cards/BookingCard/BookingCard";

export default function MyBookings() {
  const { user } = useAuth();
  const { bookings, loading, error } = useMyBookings(user);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col m-5">
      <h2 className="text-2xl font-semibold">MY UPCOMING HOLIDAZE ({bookings.length})</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id}>
            <p>
              From: {booking.dateFrom} To: {booking.dateTo}
            </p>
            <p>Guests: {booking.guests}</p>
          </div>
        ))
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
}
