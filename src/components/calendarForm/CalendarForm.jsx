import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function CalendarForm({ onSearchSubmit }) {
  const [query, setQuery] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = {
      name: query,
      location: {
        city: query,
        country: query,
      },
      dateFrom,
      dateTo,
      guests,
    };

    console.log("queryParams being submitted:", queryParams);
    onSearchSubmit(queryParams);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 bg-customBlue w-9/12 p-6 mx-8 rounded-3xl m-3 shadow-md"
    >
      {/* Where to? */}
      <div className="flex flex-col w-full">
        {/* <label htmlFor="location" className="text-gray-700 font-semibold mb-1">
        Where to?
      </label> */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Where to?"
          className="border border-gray-300 rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-customBlue"
        />
      </div>

      {/* Check-in Date */}
      <div className="flex items-center bg-white border border-gray-300 rounded-xl">
        {/* <label htmlFor="checkInDate" className="text-gray-700 font-semibold mb-1">
        Check-in Date
      </label> */}
        <DatePicker
          selected={dateFrom}
          onChange={(date) => setDateFrom(date)}
          selectsStart
          startDate={dateFrom}
          endDate={dateTo}
          minDate={new Date()}
          placeholderText="Check-in"
          className="datepicker-input hover:border hover:border-[#a0aec0] focus:outline-none cursor-pointer rounded-xl bg-white p-2"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-right m-2"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>

        {/* <label htmlFor="checkOutDate" className="text-gray-700 font-semibold mb-1">
        Check-out Date
      </label> */}
        <DatePicker
          selected={dateTo}
          onChange={(date) => setDateTo(date)}
          selectsEnd
          startDate={dateFrom}
          endDate={dateTo}
          minDate={dateFrom}
          placeholderText="Check-out"
          className="datepicker-input cursor-pointer hover:border hover:border-[#a0aec0] focus:outline-none rounded-xl bg-white p-2"
        />
      </div>

      {/* Number of Guests Dropdown */}
      <div className="flex flex-col">
        {/* <label htmlFor="guests" className="text-gray-700 font-semibold mb-1">
        Guests
      </label> */}
        <select
          id="guests"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="border border-gray-300 rounded-xl p-2 w-fit focus:outline-none focus:ring-2 focus:ring-customBlue"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="bg-yellow-300 text-white font-semibold py-2 px-6 rounded-xl hover:customBlue transition duration-200 ease-in-out"
      >
        Search
      </button>
    </form>
  );
}
