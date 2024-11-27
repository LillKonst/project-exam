import React from "react"
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

  const formattedDateFrom = booking.dateFrom ? formatDate(booking.dateFrom) : "Not Available";
  const formattedDateTo = booking. dateTo ? formatDate(booking.dateTo) : "Not Available";

  return (
    <Link to={`/VenueSpecific/${venue.id}`} className="flex gap-2 transition duration-300 ease-in-out group m-2">
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
              ? `${venue.location?.city?.slice(0, 15) || ''}${venue.location?.city && booking.location?.country ? ', ' : ''}${booking.location?.country?.slice(0, 15) || ''}`
              : "Location not available"} 
          </h3>
        </div>

        <p className="">
          Number of Guests: {venue.maxGuests}
        </p>
        
        <div className="mb-2">
          <p className="">
            Checkin: {formattedDateFrom}
          </p>
          <p className="">
            Checkout: {formattedDateTo}
          </p>
        </div>
    
        <p className="text-xl font-semibold">${venue.price}</p>              
      </div>
    </Link>
    )
}