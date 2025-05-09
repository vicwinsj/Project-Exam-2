import { Button } from "../form/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

interface GuestsModalProps {
  guestLimit: number | undefined;
  adults: number;
  children: number;
  setAdults: (value: number) => void;
  setChildren: (value: number) => void;
  onClose: () => void;
}

export default function GuestsModal({
  guestLimit = 1,
  onClose,
  adults,
  children,
  setAdults,
  setChildren,
}: GuestsModalProps) {
  const totalGuests = adults + children;

  const increment = (type: "adult" | "child") => {
    if (totalGuests >= guestLimit) return;

    if (type === "adult") setAdults(adults + 1);
    else setChildren(children + 1);
  };

  const decrement = (type: "adult" | "child") => {
    if (type === "adult" && adults > 1) setAdults(adults - 1);
    else if (type === "child" && children > 0) setChildren(children - 1);
  };

  const handleReset = () => {
    setAdults(1);
    setChildren(0);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-10 p-10 bg-white rounded-xl w-full"
    >
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <p>Adults</p>
          <div className="flex w-1/2 justify-between items-center">
            <button
              type="button"
              onClick={() => decrement("adult")}
              className="transition-all duration-300 flex items-center justify-center rounded-lg text-ocean-700 hover:bg-neutral-100 size-8"
            >
              <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
            </button>
            <p>{adults}</p>
            <button
              type="button"
              onClick={() => increment("adult")}
              disabled={totalGuests >= guestLimit}
              className="transition-all duration-300 flex items-center justify-center rounded-lg text-ocean-700 hover:bg-neutral-100 size-8"
            >
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>Children</p>
          <div className="flex w-1/2 justify-between items-center">
            <button
              type="button"
              onClick={() => decrement("child")}
              className="transition-all duration-300 flex items-center justify-center rounded-lg text-ocean-700 hover:bg-neutral-100 size-8"
            >
              <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
            </button>
            <p>{children}</p>
            <button
              type="button"
              onClick={() => increment("child")}
              disabled={totalGuests >= guestLimit}
              className="transition-all duration-300 flex items-center justify-center rounded-lg text-ocean-700 hover:bg-neutral-100 size-8"
            >
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-1 justify-center items-center">
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={onClose}>Apply</Button>
      </div>
    </div>
  );
}
