// import "react-datepicker/dist/react-datepicker.css";
// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';

// export default function CalendarForm() {
//   const [location, setLocation] = useState("");
//   const [checkInDate, setCheckInDate] = useState(null);
//   const [checkOutDate, setCheckOutDate] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Håndter søkelogikk her
//     console.log("Søker etter:", { location, checkInDate, checkOutDate });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      
//       {/* Location/Name Søkefelt */}
//       <div className="flex flex-col w-full">
//         <label htmlFor="location" className="text-gray-700 font-semibold mb-1">Location / Name</label>
//         <input
//           type="text"
//           id="location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           placeholder="Enter location or name"
//           className="border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       {/* Innsjekk Dato */}
//       <div className="flex flex-col w-full">
//         <label htmlFor="checkInDate" className="text-gray-700 font-semibold mb-1">Check-in Date</label>
//         <DatePicker
//           id="checkInDate"
//           selected={checkInDate}
//           onChange={(date) => setCheckInDate(date)}
//           selectsStart
//           startDate={checkInDate}
//           endDate={checkOutDate}
//           minDate={new Date()}
//           placeholderText="Select check-in date"
//           className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       {/* Utsjekk Dato */}
//       <div className="flex flex-col w-full">
//         <label htmlFor="checkOutDate" className="text-gray-700 font-semibold mb-1">Check-out Date</label>
//         <DatePicker
//           id="checkOutDate"
//           selected={checkOutDate}
//           onChange={(date) => setCheckOutDate(date)}
//           selectsEnd
//           startDate={checkInDate}
//           endDate={checkOutDate}
//           minDate={checkInDate}
//           placeholderText="Select check-out date"
//           className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       {/* Søkeknapp */}
//       <button
//         type="submit"
//         className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
//       >
//         Search
//       </button>
//     </form>
//   );
// }


// import "react-datepicker/dist/react-datepicker.css";
// import React, { useState } from "react";
// import DatePicker from "react-datepicker";

// export default function CalendarForm() {
//   const [location, setLocation] = useState("");
//   const [checkInDate, setCheckInDate] = useState(null);
//   const [checkOutDate, setCheckOutDate] = useState(null);
//   const [guests, setGuests] = useState(2); // Default value set to 2

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle search logic here
//     console.log("Searching for:", { location, checkInDate, checkOutDate, guests });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      
//       {/* Location/Name Search Field */}
//       <div className="flex flex-col w-full">
//         <label htmlFor="location" className="text-gray-700 font-semibold mb-1">Location / Name</label>
//         <input
//           type="text"
//           id="location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           placeholder="Enter location or name"
//           className="border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       {/* Check-in Date */}
//       <div className="flex flex-col w-full">
//         <label htmlFor="checkInDate" className="text-gray-700 font-semibold mb-1">Check-in Date</label>
//         <DatePicker
//           id="checkInDate"
//           selected={checkInDate}
//           onChange={(date) => setCheckInDate(date)}
//           selectsStart
//           startDate={checkInDate}
//           endDate={checkOutDate}
//           minDate={new Date()}
//           placeholderText="Select check-in date"
//           className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       {/* Check-out Date */}
//       <div className="flex flex-col w-full">
//         <label htmlFor="checkOutDate" className="text-gray-700 font-semibold mb-1">Check-out Date</label>
//         <DatePicker
//           id="checkOutDate"
//           selected={checkOutDate}
//           onChange={(date) => setCheckOutDate(date)}
//           selectsEnd
//           startDate={checkInDate}
//           endDate={checkOutDate}
//           minDate={checkInDate}
//           placeholderText="Select check-out date"
//           className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       {/* Number of Guests Dropdown */}
//       <div className="flex flex-col w-full">
//         <label htmlFor="guests" className="text-gray-700 font-semibold mb-1">Number of Guests</label>
//         <select
//           id="guests"
//           value={guests}
//           onChange={(e) => setGuests(Number(e.target.value))}
//           className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           {[...Array(10)].map((_, i) => (
//             <option key={i + 1} value={i + 1}>
//               {i + 1}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Search Button */}
//       <button
//         type="submit"
//         className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
//       >
//         Search
//       </button>
//     </form>
//   );
// }

// CalendarForm.jsx
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function CalendarForm({ onSearchSubmit }) {
  const [location, setLocation] = useState({
    address: "",
    city: "",
    country: "",
  });
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(2); // Default value set to 2

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the search parameters
    const newParams = {
      location,
      checkInDate,
      checkOutDate,
      guests,
    };

    // Trigger the parent component's search handler with the new parameters
    onSearchSubmit(newParams);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto"
    >
      {/* Location / Name input */}
      <div className="flex flex-col w-full">
        <label htmlFor="location" className="text-gray-700 font-semibold mb-1">
          Location / Name
        </label>
        <input
          type="text"
          id="location"
          value={location.city || location.address || location.country}
          onChange={(e) =>
            setLocation((prevLocation) => ({
              ...prevLocation,
              city: e.target.value, // Update city here, you can handle address and country too
            }))
          }
          placeholder="Enter location or name"
          className="border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Check-in Date */}
      <div className="flex flex-col w-full">
        <label htmlFor="checkInDate" className="text-gray-700 font-semibold mb-1">
          Check-in Date
        </label>
        <DatePicker
          id="checkInDate"
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          selectsStart
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={new Date()}
          placeholderText="Select check-in date"
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Check-out Date */}
      <div className="flex flex-col w-full">
        <label htmlFor="checkOutDate" className="text-gray-700 font-semibold mb-1">
          Check-out Date
        </label>
        <DatePicker
          id="checkOutDate"
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          selectsEnd
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={checkInDate}
          placeholderText="Select check-out date"
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Number of Guests Dropdown */}
      <div className="flex flex-col w-full">
        <label htmlFor="guests" className="text-gray-700 font-semibold mb-1">
          Number of Guests
        </label>
        <select
          id="guests"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
      >
        Search
      </button>
    </form>
  );
}
