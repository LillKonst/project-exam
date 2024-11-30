import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import useCreateBooking from "../../../hooks/useCreateBooking";
import { parseISO, eachDayOfInterval, isSameDay } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function BookVenue({ venue, bookings }) {
  console.log("Bookings", bookings);
  const { mutate: createBooking, isLoading, error } = useCreateBooking();
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [taxesAndFees, setTaxesAndFees] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const maxGuests = venue?.maxGuests || 10;

  const calculateTotalPrice = () => {
    if (dateFrom && dateTo) {
      const pricePerNight = venue.price;
      const nightDifference = Math.ceil(
        (dateTo - dateFrom) / (1000 * 3600 * 24),
      );
      const base = nightDifference * pricePerNight;
      const taxes = base * 0.25;
      const total = base + taxes;

      setBasePrice(base);
      setTaxesAndFees(taxes);
      setTotalPrice(total);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [dateFrom, dateTo]);

  const excludedDates =
    bookings?.reduce((acc, booking) => {
      const interval = eachDayOfInterval({
        start: parseISO(booking.dateFrom),
        end: parseISO(booking.dateTo),
      });
      return acc.concat(interval);
    }, []) || [];

  console.log("Excluded Dates:", excludedDates);

  const isBookedDate = (date) =>
    excludedDates.some((bookedDate) => isSameDay(bookedDate, date));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBooking = {
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
      guests,
      venueId: venue.id,
    };

    createBooking(newBooking, {
      onSuccess: () => {
        setSuccess(true);
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      },
    });
  };
  return (
    <div className="flex flex-col items-center bg-customWhite h-fit w-fit p-2 sm:p-6 rounded-2xl sm:m-3 border border-gray-200">
      <form onSubmit={handleSubmit} className="flex flex-col sm:mx-5 my-2">
        <div className="flex self-start m-3 my-2">
          <h2 className="text-xl sm:text-2xl">{venue.price}</h2>
          <h2 className="ms-2 text-gray-600 text-xl sm:text-2xl">night</h2>
        </div>

        <div className="flex justify-center items-center">
          <DatePicker
            selected={dateFrom}
            onChange={(date) => setDateFrom(date)}
            selectsStart
            startDate={dateFrom}
            endDate={dateTo}
            minDate={new Date()}
            excludeDates={excludedDates}
            placeholderText="CHECK-IN"
            className="datepicker-input text-center me-1 border border-gray-300 hover:border hover:border-[#a0aec0] focus:outline-none cursor-pointer rounded bg-white p-2 w-28 sm:w-32"
            dayClassName={(date) => (isBookedDate(date) ? "booked-date" : "")}
          />
          <DatePicker
            selected={dateTo}
            onChange={(date) => setDateTo(date)}
            selectsEnd
            startDate={dateFrom}
            endDate={dateTo}
            minDate={dateFrom}
            excludeDates={excludedDates}
            placeholderText="CHECK-OUT"
            className="datepicker-input text-center ms-1 cursor-pointer border border-gray-300 hover:border hover:border-[#a0aec0] focus:outline-none rounded bg-white p-2 w-28 sm:w-32"
            dayClassName={(date) => (isBookedDate(date) ? "booked-date" : "")}
          />
        </div>

        <div className="flex justify-center items-center bg-customWhite mt-4 border border-gray-300 rounded-md p-2">
          <p className="mx-2">NUMBER OF GUESTS</p>
          <select
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="p-2 w-fit focus:outline-none"
          >
            {[...Array(maxGuests)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 bg-customRed text-customWhite text-xl font-semibold py-2 px-6 rounded-md transition duration-200 ease-in-out"
        >
          BOOK
        </button>

        <div className="flex flex-col w-full my-4">
          <div className="flex justify-between">
            <p>Price per night</p>
            <p>{venue.price}</p>
          </div>

          <div className="flex justify-between">
            <p>Taxes and fees</p>
            <p>{taxesAndFees.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-xl font-semibold">Total sum:</p>
            <p className="text-xl font-semibold">{totalPrice.toFixed(2)}</p>
          </div>
        </div>
        {error && <p>Error: {error.message}</p>}
      </form>
      {success && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-2xl p-4 rounded shadow-md">
          Booking successful!
        </div>
      )}
    </div>
  );
}
