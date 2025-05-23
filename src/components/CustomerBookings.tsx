import format from "date-fns/format";
import { Link } from "react-router-dom";
import { Venue } from "../types/venue";

export const CustomerBookings = ({ bookings }: Venue) => {
  return (
    <div className="w-full">
      <div className="flex-1 flex flex-col gap-10">
        <h2 className=" text-black">Upcoming bookings</h2>
        <div className="border-neutral-300 border-1 bg-white rounded-t-xl flex flex-col gap-1 overflow-hidden">
          <table className="w-full">
            <thead className="w-full">
              <tr className="w-full text-sm font-semibold border-b-1 border-neutral-300 text-ocean-700">
                <th className="text-left px-3 py-2 w-5/12">Customer</th>
                <th className="text-left px-3 py-2 w-5/12">Dates</th>
                <th className="text-left px-3 py-2 w-2/12">Guests</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {bookings && (
                <>
                  (
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <tr key={booking.id} className="w-full text-sm">
                        <td className="px-3 py-1 truncate">
                          <Link
                            className="flex-2"
                            title="Contact customer"
                            to={`mailto:${booking.customer.email}`}
                          >
                            <strong className="truncate block max-w-[150px]">
                              {booking.customer.name}
                            </strong>
                          </Link>
                        </td>
                        <td className="px-3 py-1">
                          {format(booking.dateFrom, "MMM d")} –{" "}
                          {format(booking.dateTo, "MMM d y")}
                        </td>
                        <td className="px-3 py-1">{booking.guests}</td>
                      </tr>
                    ))
                  ) : (
                    <td className="w-full px-3 py-1">No bookings yet!</td>
                  )}
                  )
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
