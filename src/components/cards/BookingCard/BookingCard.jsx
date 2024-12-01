import React from "react";
import { Link } from "react-router-dom";

export default function BookingCard({ booking, venue }) {
  if (!booking) {
    return <p>Booking details not available.</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formattedDateFrom = booking.dateFrom
    ? formatDate(booking.dateFrom)
    : "Not Available";
  const formattedDateTo = booking.dateTo
    ? formatDate(booking.dateTo)
    : "Not Available";

  return (
    <Link
      to={`/VenueSpecific/${venue.id}`}
      className="flex flex-col lg:flex-row gap-2 m-1 lg:m-2"
    >
      <div className="flex flex-col lg:flex-row transition duration-300 ease-in-out group">
        <div className="relative w-auto max-h-44 aspect-[4/2]">
          <img
            src={venue.media[0]?.url}
            alt={venue.media[0]?.alt || "Product image"}
            className="object-cover w-full h-full rounded"
          />
          <span className="absolute inset-0 flex items-center justify-center rounded text-2xl text-white bg-gray-600 bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            VIEW
          </span>
        </div>
        <div className="flex flex-col p-2 w-full">
          <div className="mb-2">
            <h2 className="text-xl font-semibold">{venue.name}</h2>
            <h3 className="">
              {venue.location?.city || venue.location?.country
                ? `${venue.location?.city?.slice(0, 15) || ""}${venue.location?.city && booking.location?.country ? ", " : ""}${booking.location?.country?.slice(0, 15) || ""}`
                : "Location not available"}
            </h3>
          </div>

          <p className="">Number of Guests: {booking.guests}</p>

          <div className="mb-2">
            <p className="">Checkin: {formattedDateFrom}</p>
            <p className="">Checkout: {formattedDateTo}</p>
          </div>

          <div className="flex">
            <p className="text-xl font-semibold me-1">${venue.price}</p>
            <p className="text-xl text-gray-600">night</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
