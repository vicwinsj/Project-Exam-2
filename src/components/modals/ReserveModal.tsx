import { ReserveBooking } from "../ReserveBooking";
import ModalWrapper from "./ModalWrapper";
import { ReserveModalProps } from "../../types/modals";

export const ReserveModal = ({
  venue,
  onVenueUpdate,
  onClose,
}: ReserveModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="self-start sm:self-center rounded-xl bg-white w-full sm:w-1/2 flex flex-col gap-1">
        <ReserveBooking
          venue={venue}
          onVenueUpdate={onVenueUpdate}
          isInModal={true}
          onClose={onClose}
        ></ReserveBooking>
      </div>
    </ModalWrapper>
  );
};
