import React from "react"
import { Link } from "react-router-dom";

export default function VenueLinkSm({ venue }) {
    // if (!venue || !venue.id) {
    //     return null; // Skip rendering if the venue is not properly defined
    // }
    return (
        <Link to={`/venue/${venue.id}`}>
            <div className="w-full aspect-w-3 aspect-h-4">
                <img 
                    src={venue.media.url} 
                    alt={venue.media.alt || "Product image"} 
                    className="object-cover w-full h-full rounded"
                />
                <span className="absolute inset-0 flex items-center justify-center rounded text-2xl text-white bg-gray-600 bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                VIEW
                </span>
            </div>
            <h2 className="text-md ms-1">{venue.name}</h2>
            <div className="flex ms-1">
            <p className="text-xl">${venue.price}</p>
            </div>
       </Link>
    )
}