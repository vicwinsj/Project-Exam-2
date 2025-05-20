import { Button } from "../form/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPeopleRoof } from "@fortawesome/free-solid-svg-icons";
import format from "date-fns/format";
import CalendarModal from "./CalendarModal";
import GuestsModal from "./GuestsModal";
import { ButtonLoader } from "../loaders/ButtonLoader";
import { useState } from "react";
import toast from "react-hot-toast";
import LoginModal from "./LoginModal";
import { DateRange } from "react-day-picker";
import { createBooking } from "../../api/bookings.ts";
import { useAuth } from "../../contexts/AuthContext";
import { Venue } from "../../types/venue.ts";
import { Toast } from "../toast/toast.tsx";
import { fetchVenue } from "../../api/venues.ts";
import ModalWrapper from "./ModalWrapper.tsx";

type ReserveModalProps = {
  venue: Venue;
  venueId: string | undefined;
  onVenueUpdate: (updatedVenue: Venue) => void;
  onClose: () => void;
};

export const ReserveModal = ({
  venue,
  venueId,
  onVenueUpdate,
  onClose,
}: ReserveModalProps) => {
  const { accessToken, refreshProfile } = useAuth();

  const disabledDates = venue?.bookings?.map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));

  type ErrorState = {
    date?: string;
  };

  const [reserveLoading, setReserveLoading] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [nights, setNights] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState<ErrorState>({});
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showAddPeopleModal, setShowAddPeopleModal] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const totalGuests = adults + children;

  const handleOpenLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleOpenCalendarModal = () => {
    setShowCalendarModal(true);
  };
  const handleCloseCalendarModal = () => {
    setShowCalendarModal(false);
  };

  const handleOpenAddPeopleModal = () => {
    setShowAddPeopleModal(true);
  };
  const handleCloseAddPeopleModal = () => {
    setShowAddPeopleModal(false);
  };

  const handleRangeSelect = (range: DateRange | undefined, nights: number) => {
    if (!range) {
      setSelectedRange(undefined);
      setNights(0);
      setStartDate(null);
      setEndDate(null);
      return;
    }

    setSelectedRange(range);
    setNights(nights);
    setStartDate(range.from ?? null);
    setEndDate(range.to ?? null);
  };

  const handleReservation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReserveLoading(true);

    const validateForm = () => {
      const newErrors: ErrorState = {};

      if (startDate == endDate) {
        newErrors.date = "You need to book at least one night.";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    if (
      validateForm() &&
      startDate &&
      endDate &&
      venueId &&
      accessToken &&
      startDate != endDate
    )
      try {
        const result = await createBooking(
          startDate,
          endDate,
          totalGuests,
          venueId,
          accessToken
        );
        if (result) {
          if (errors) {
            setErrors({});
          }
          await refreshProfile();
          const updatedVenue = await fetchVenue(venueId);
          setSelectedRange(undefined);
          toast.custom(
            <Toast message="Venue has been booked. Enjoy your stay!" />
          );
          onVenueUpdate(updatedVenue);

          return;
        }
      } catch (error) {
        if (error instanceof Error) {
          // setServerError(error.message);
        }
      }
    setReserveLoading(false);
  };

  return (
    <>
      <ModalWrapper onClose={onClose}>
        <form
          onSubmit={handleReservation}
          onClick={(e) => {
            e.stopPropagation();
            if (showCalendarModal) {
              handleCloseCalendarModal();
            }
            if (showAddPeopleModal) {
              handleCloseAddPeopleModal();
            }
          }}
          className="bg-white flex flex-col gap-10 w-full h-auto border-1 border-neutral-300 rounded-xl p-10"
        >
          <h3 className="text-xl text-black">
            {venue.price * nights || venue.price} NOK{" "}
            <span className="font-normal">
              for {nights || 1} {nights > 1 ? "nights" : "night"}
            </span>
          </h3>
          <div className="flex flex-col gap-1">
            <div className="relative">
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenCalendarModal();
                  if (showAddPeopleModal) {
                    handleCloseAddPeopleModal();
                  }
                  if (showCalendarModal) {
                    handleCloseCalendarModal();
                  }
                }}
                variant="outline"
                className={`w-full flex items-center gap-3 ${errors.date && "border-red-500"}`}
              >
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="w-1/12"
                ></FontAwesomeIcon>
                {nights > 0 && startDate && endDate ? (
                  <p>
                    {format(startDate, "MMM d")} – {format(endDate, "MMM d")}
                  </p>
                ) : (
                  <p>Select dates</p>
                )}
              </Button>
              {errors.date && (
                <p className="mt-1 mb-3 text-red-500 text-sm">{errors.date}</p>
              )}
              {showCalendarModal && (
                <div className="w-full drop-shadow-md absolute top-10 -left-45 z-10">
                  <CalendarModal
                    disabledDates={disabledDates}
                    onClose={handleCloseCalendarModal}
                    onRangeSelect={handleRangeSelect}
                    selectedRange={selectedRange}
                    nights={nights}
                  />
                </div>
              )}
            </div>
            <div className="relative">
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenAddPeopleModal();
                  if (showCalendarModal) {
                    handleCloseCalendarModal();
                  }
                  if (showAddPeopleModal) {
                    handleCloseAddPeopleModal();
                  }
                }}
                variant="outline"
                className="w-full flex items-center gap-3"
              >
                <FontAwesomeIcon
                  icon={faPeopleRoof}
                  className="w-1/12"
                ></FontAwesomeIcon>
                {totalGuests} {totalGuests === 1 ? "guest" : "guests"}
              </Button>
              {showAddPeopleModal && (
                <div className="w-full drop-shadow-md absolute top-10 left-0 z-10">
                  <GuestsModal
                    guestLimit={venue.maxGuests}
                    adults={adults}
                    children={children}
                    setAdults={setAdults}
                    setChildren={setChildren}
                    onClose={handleCloseAddPeopleModal}
                  />
                </div>
              )}
            </div>
          </div>
          {accessToken ? (
            <Button
              className={`${reserveLoading && "cursor-not-allowed bg-sunset-800/50 hover:bg-sunset-900/50"}`}
              type="submit"
              variant="primary"
              size="lg"
            >
              {reserveLoading ? (
                <ButtonLoader buttonText={"Reserving venue ..."} />
              ) : (
                "Reserve"
              )}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleOpenLogin}
              variant="primary"
              size="lg"
            >
              Login to reserve
            </Button>
          )}
        </form>
        {showLogin && <LoginModal onClose={handleCloseLogin} />}
      </ModalWrapper>
    </>
  );
};
