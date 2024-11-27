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
    <div className="flex flex-col m-5 w-3/4">
      <h2 className="text-2xl font-semibold">MY UPCOMING HOLIDAZE ({bookings.length})</h2>
      {bookings.length > 0 ? (
        <div className="flex flex-wrap">
        {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} venue={booking.venue} />
        ))}
        </div>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
}
