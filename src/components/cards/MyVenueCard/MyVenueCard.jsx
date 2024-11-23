import React from "react"
import { Link } from "react-router-dom";

export default function MyVenueCard({ venue, bookings }) {
  return (
    <Link to={`/VenueSpecific/${venue.id}`} className="flex transition duration-300 ease-in-out group m-2">
            <div className="relative w-auto max-h-60 aspect-[4/2]">
                <img 
                    src={venue.media[0]?.url} 
                    alt={venue.media[0]?.alt || "Product image"} 
                    className="object-cover w-full h-full rounded"
                />
                <span className="absolute inset-0 flex items-center justify-center rounded text-2xl text-white bg-gray-600 bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                VIEW
                </span>
            </div>
            <div className="flex flex-col w-full ms-3">
            <div className="mb-3">
            <h2 className="text-xl font-semibold">{venue.name}</h2>
            <h3 className="">
            {venue.location?.city || venue.location?.country
              ? `${venue.location?.city?.slice(0, 15) || ''}${venue.location?.city && venue.location?.country ? ', ' : ''}${venue.location?.country?.slice(0, 15) || ''}`
              : "Location not available"} 
            </h3>
            </div>

            <p className="text-lg mb-3">Capasity: {venue.maxGuests} guests</p>
            
            <div className="flex">
            <p className="text-xl font-semibold me-1">${venue.price}</p>
            <p className="text-xl text-gray-600">night</p>
            </div>

            <p className="text-lg">This venue has been booked {bookings.length} times</p>

            
            </div>
       </Link>
  );
}