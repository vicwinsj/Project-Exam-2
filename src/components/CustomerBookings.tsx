import format from "date-fns/format";

interface Booking {
  id: string;
  dateFrom: Date;
  dateTo: Date;
  guests: number;
  customer: {
    name: string;
    email: string;
  };
}

interface CustomerBookingsProps {
  bookings: Booking[];
}

export const CustomerBookings = ({ bookings }: CustomerBookingsProps) => {
  return (
    <aside className="flex-1 flex flex-col gap-10">
      <h2 className="text-xl text-black">Upcoming bookings</h2>
      <div className="border-neutral-300 border-1 bg-white rounded-t-xl flex flex-col gap-1 overflow-hidden">
        <div className="font-semibold p-3 border-b-[.1px] border-neutral-300 text-sm text-ocean-700 flex">
          <p className="flex-2">Customer</p>
          <p className="flex-4">Booked dates</p>
          <p className="flex-1">Guests</p>
        </div>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="flex p-3 ">
              <a
                className="flex-2"
                title="Contact customer"
                href={`mailto:${booking.customer.email}`}
              >
                <strong>{booking.customer.name}</strong>
              </a>
              <p className="flex-4">
                {format(booking.dateFrom, "MMM d")} –{" "}
                {format(booking.dateTo, "MMM d y")}
              </p>
              <p className="flex-1 flex justify-center">{booking.guests}</p>
            </div>
          ))
        ) : (
          <p className="p-3">No bookings yet!</p>
        )}
      </div>
    </aside>
  );
};
