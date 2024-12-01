import { useAuth } from "../../context/AuthContext";
import useMyBookings from "../../hooks/useMyBookings";
import BookingCard from "../cards/BookingCard/BookingCard";

export default function MyBookings() {
  const { user } = useAuth();
  const { bookings, loading, error } = useMyBookings(user);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col m-1 lg:m-5 w-full lg:w-3/4">
      <h2 className="text-lg justify-self-start md:text-2xl font-semibold">
        MY UPCOMING HOLIDAZE ({bookings.length})
      </h2>
      {bookings.length > 0 ? (
        <div className="flex flex-wrap items-center justify-start gap-2">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              venue={booking.venue}
            />
          ))}
        </div>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
}
