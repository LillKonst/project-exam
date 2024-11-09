import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

export default function BookVenue({venue}) {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [guests, setGuests] = useState(2); 
  const [totalPrice, setTotalPrice] = useState(0);
  const [taxesAndFees, setTaxesAndFees] = useState(0);
  const [basePrice, setBasePrice] = useState(0);

  const calculateTotalPrice = () => {
    if (dateFrom && dateTo) {
      const pricePerNight = venue.price; 
      const nightDifference = Math.ceil((dateTo - dateFrom) / (1000 * 3600 * 24));
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


  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingQuery = {
     
      dateFrom,
      dateTo,
      guests,
    };

    console.log("Booking information being submitted:", bookingQuery);
     onSearchSubmit(bookingQuery);
   };
  return(
    <div className="flex flex-col justify-center items-center bg-customBlue p-6 rounded-2xl m-3 shadow-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-5 my-2"
      >  

      <div className=" flex self-start mb-2">
        <h2 className="text-2xl">{venue.price}</h2>
        <h2 className="ms-2 text-gray-600 text-2xl">night</h2>
      </div>


        <div className="flex justify-center items-center">
          <DatePicker
            selected={dateFrom}
            onChange={(date) => setDateFrom(date)}
            selectsStart
            startDate={dateFrom}
            endDate={dateTo}
            minDate={new Date()}
            placeholderText="CHECK-IN"
            className="datepicker-input text-center me-1 hover:border hover:border-[#a0aec0] focus:outline-none cursor-pointer rounded-md bg-white p-2 w-32"
          />
          <DatePicker
            selected={dateTo}
            onChange={(date) => setDateTo(date)}
            selectsEnd
            startDate={dateFrom}
            endDate={dateTo}
            minDate={dateFrom}
            placeholderText="CHECK-OUT"
            className="datepicker-input text-center ms-1 cursor-pointer hover:border hover:border-[#a0aec0] focus:outline-none rounded-md bg-white p-2 w-32"
          />
        </div>

        <div className="flex justify-center items-center bg-white mt-4 border border-gray-300 rounded-md p-2">
          <p className="mx-2">NUMBER OF GUESTS</p>
          <select
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className=" p-2 w-fit focus:outline-none "
          >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 bg-yellow-300 text-xl font-semibold py-2 px-6 rounded-md hover:customBlue transition duration-200 ease-in-out"
        >
          BOOK
        </button>

        <div className="flex flex-col w-full my-2">
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
      </form>
    </div>
  );
}