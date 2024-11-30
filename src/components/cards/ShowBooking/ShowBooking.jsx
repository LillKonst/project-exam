export default function ShowBooking({ bookings, onClose }) {
  return (
    <div className="flex flex-col bg-customWhite w-full">
      <button
        className="close-button bg-red-500 text-white p-2 rounded-md mb-4"
        onClick={onClose}
      >
        Close
      </button>
      <h2 className="text-2xl font-semibold mb-4">Bookings</h2>

      {bookings && bookings.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 ">
              <th className="border border-gray-300 p-2 text-left">Customer</th>
              <th className="border border-gray-300 p-2 text-left">
                Date From
              </th>
              <th className="border border-gray-300 p-2 text-left">Date To</th>
              <th className="border border-gray-300 p-2 text-left">Guests</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">
                  {booking.customer?.name || "Unknown"}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(booking.dateFrom).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(booking.dateTo).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-2">{booking.guests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-md text-gray-500">
          No bookings available for this venue.
        </p>
      )}
    </div>
  );
}
