import React from "react"
import { Link } from "react-router-dom";

export default function BookingCard({ booking, dateFrom, dateTo, guests }) {
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

  const formattedDateFrom = dateFrom ? formatDate(dateFrom) : "Not Available";
  const formattedDateTo = dateTo ? formatDate(dateTo) : "Not Available";

    return (
        <Link to={`/VenueSpecific/${booking.id}`} className="flex transition duration-300 ease-in-out group m-2">
            <div className="relative w-auto max-h-60 aspect-[4/2]">
                <img 
                    src={booking.media[0]?.url} 
                    alt={booking.media[0]?.alt || "Product image"} 
                    className="object-cover w-full h-full rounded"
                />
                <span className="absolute inset-0 flex items-center justify-center rounded text-2xl text-white bg-gray-600 bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                VIEW
                </span>
            </div>
            <div className="flex flex-col w-full ms-3">
            <div className="mb-3">
            <h2 className="text-xl font-semibold">{booking.name}</h2>
            <h3 className="">
            {booking.location?.city || booking.location?.country
              ? `${booking.location?.city?.slice(0, 15) || ''}${booking.location?.city && booking.location?.country ? ', ' : ''}${booking.location?.country?.slice(0, 15) || ''}`
              : "Location not available"} 
            </h3>
            </div>

            <p className="text-lg mb-3">
              Number of Guests: {guests}
            </p>
        
            <div className="mb-3">
            <p className="text-lg">
              Checkin: {formattedDateFrom}
            </p>
            <p className="text-lg">
              Checkout: {formattedDateTo}
            </p>
            </div>
          
        


            <p className="text-xl font-semibold">${booking.price}</p>

           
            
           </div>
       </Link>
    )
}