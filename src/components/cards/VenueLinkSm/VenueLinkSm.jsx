import React from "react";
import { Link } from "react-router-dom";
import venueDefaultImg from "../../../images/venue-default-img.png";

export default function VenueLinkSm({ venue }) {
  return (
    <Link
      to={`/VenueSpecific/${venue.id}`}
      className="block border rounded-lg hover:shadow-lg transition duration-300 ease-in-out group col-span-12 sm:col-span-6 md:col-span-4 m-2"
    >
      <div className="relative w-full aspect-[5/3]">
        <img
          src={venue.media[0]?.url || venueDefaultImg}
          alt={venue.media[0]?.alt || "Product image"}
          className="object-cover w-full h-full rounded"
        />
        <span className="absolute inset-0 flex items-center justify-center rounded text-2xl text-white bg-gray-600 bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
          VIEW
        </span>
      </div>
      <div className="flex p-1 relative">
        <div>
          <h2 className="text-lg ms-1 font-semibold">{venue.name}</h2>
          <h3 className="ms-1">
            {venue.location?.city || venue.location?.country
              ? `${venue.location?.city?.slice(0, 15) || ""}${venue.location?.city && venue.location?.country ? ", " : ""}${venue.location?.country?.slice(0, 15) || ""}`
              : "Location not available"}
          </h3>
          <div className="flex ms-1">
            <p className="text-lg font-semibold me-1">${venue.price}</p>
            <p className="text-lg text-gray-600">night</p>
          </div>
        </div>

        <div className="ms-auto flex">
          {venue.rating >= 0 && venue.rating <= 1 ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                className="bi bi-star text-customYellow ms-2 h-5 w-5 sm:w-6 sm-h-6"
                viewBox="0 0 16 16"
              >
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
              </svg>
              <p className="mx-1">{venue.rating}</p>
            </>
          ) : (
            <>
              {venue.rating >= 2 && venue.rating <= 3 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-star-half text-customYellow ms-2 h-5 w-5 sm:w-6 sm-h-6"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
                </svg>
              ) : (
                venue.rating >= 4 &&
                venue.rating <= 5 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-star-fill text-customYellow ms-2 h-5 w-5 sm:w-6 sm-h-6"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                )
              )}
              <p className="mx-1">{venue.rating}</p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
