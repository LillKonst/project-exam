import React from "react";
import { Link } from "react-router-dom";
import ConfirmDelete from "../../modal/ConfirmDelete/ConfirmDelete";
import { useDeleteVenue } from "../../../hooks/useDeleteVenue";
import { useState } from "react";

export default function MyVenueCard({
  venue,
  bookings,
  refreshList,
  openModal,
}) {
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { mutateAsync: deleteVenue, isLoading, isError } = useDeleteVenue();

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteVenue(venue.id);
      setShowModal(false);
      setSuccessMessage("Venue successfully deleted!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting venue:", error);
      setErrorMessage("Failed to delete the venue.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };
  return (
    <div className="flex flex-col lg:flex-row gap-2 m-1 lg:m-2 rounded w-auto">
      <Link
        to={`/VenueSpecific/${venue.id}`}
        className="flex flex-col lg:flex-row transition duration-300 ease-in-out group"
      >
        <div className="relative w-auto max-h-44 aspect-[4/2]">
          <img
            src={venue.media[0]?.url}
            alt={venue.media[0]?.alt || "Product image"}
            className="object-cover w-full h-full rounded"
          />
          <span className="absolute inset-0 flex items-center justify-center rounded text-xl text-white bg-gray-600 bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            VIEW VENUE
          </span>
        </div>
        <div className="flex flex-col p-2">
          <div>
            <h2 className="text-xl font-semibold">{venue.name}</h2>
            <h3 className="">
              {venue.location?.city || venue.location?.country
                ? `${venue.location?.city?.slice(0, 15) || ""}${venue.location?.city && venue.location?.country ? ", " : ""}${venue.location?.country?.slice(0, 15) || ""}`
                : "Location not available"}
            </h3>
          </div>

          <p className="text-md mb-3">Capasity: {venue.maxGuests} guests</p>

          <div className="flex">
            <p className="text-xl font-semibold me-1">${venue.price}</p>
            <p className="text-xl text-gray-600">night</p>
          </div>

          <p className="text-lg flex gap-2 items-center mt-auto">
            This venue has been booked {bookings.length} times
          </p>
        </div>
      </Link>
      <div className="flex flex-col gap-2 justify-center w-full lg:w-fit lg:ms-5">
        <button
          onClick={() => openModal(bookings)}
          className="font-semibold text-sm hover:bg-hoverRed text-customWhite bg-customRed lg:ms-12 px-3 py-2 rounded flex items-center gap-2 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-calendar4-range"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
            <path d="M9 7.5a.5.5 0 0 1 .5-.5H15v2H9.5a.5.5 0 0 1-.5-.5zm-2 3v1a.5.5 0 0 1-.5.5H1v-2h5.5a.5.5 0 0 1 .5.5" />
          </svg>{" "}
          Show Bookings
        </button>
        <Link
          to={`/EditVenue/${venue.id}`}
          className="font-semibold text-sm hover:bg-hoverRed text-customWhite bg-customRed lg:ms-12 px-3 py-2 rounded flex items-center gap-2 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
          </svg>{" "}
          Edit Venue
        </Link>
        <button
          onClick={handleDeleteClick}
          className="font-semibold text-sm hover:bg-hoverRed text-customWhite bg-customRed lg:ms-12 px-3 py-2 rounded flex items-center gap-2 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
          </svg>{" "}
          Delete Venue
        </button>
      </div>

      <div>
        <ConfirmDelete
          isOpen={showModal}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isLoading={isLoading}
        />

        {successMessage && (
          <p className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50">
            {successMessage}
          </p>
        )}

        {errorMessage && (
          <p className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg z-50">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
