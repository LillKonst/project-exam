import { useAuth } from "../../context/AuthContext";
import useMyVenues from "../../hooks/useMyVenues";
import MyVenueCard from "../cards/MyVenueCard/MyVenueCard";
import ShowBooking from "../cards/ShowBooking/ShowBooking";
import { useState } from "react";

export default function MyVenues() {
  const { user } = useAuth();
  const { venues, loading, error } = useMyVenues(user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookings, setSelectedBookings] = useState(null);

  const venueCount = venues.length;

  const openModal = (bookings) => {
    setSelectedBookings(bookings);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBookings(null);
  };

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
      <div className="flex w-full">
        <h2 className="text-2xl font-semibold">MY VENUES ({venueCount})</h2>{" "}
      </div>
      <div>
        {venues.length > 0 ? (
          <div className="flex flex-wrap items-center justify-start gap-2">
            {venues.map((venue) => (
              <MyVenueCard
                key={venue.id}
                venue={venue}
                bookings={venue.bookings}
                refreshList={refreshList}
                openModal={openModal}
              />
            ))}
          </div>
        ) : (
          <p className="text-md">No Venues</p>
        )}
      </div>
      {isModalOpen && (
        <div className="overlay">
          <div className="overlay-content">
            <ShowBooking bookings={selectedBookings} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
