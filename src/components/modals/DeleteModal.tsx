import ModalWrapper from "./ModalWrapper";
import { Button } from "../form/Button";
import { deleteVenue } from "../../api/venues";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DeleteModalProps {
  venueId: string;
  venueName: string;
  onClose: () => void;
}

export const DeleteModal = ({
  venueId,
  venueName,
  onClose,
}: DeleteModalProps) => {
  const { accessToken, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");

  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (accessToken)
      try {
        const deleteSuccess = await deleteVenue(venueId, accessToken);
        if (deleteSuccess) {
          console.log("deleted!");
          await refreshProfile();
          onClose();
          navigate("/");
        }
      } catch (error) {
        if (error instanceof Error) {
          setServerError(error.message);
        }
      }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form
        className="flex flex-col gap-10 p-10 bg-white rounded-xl"
        onSubmit={handleDelete}
      >
        <h3 className="text-black">
          Are you sure you want to delete your venue "{venueName}"?
        </h3>
        <div className="flex justify-center items-center gap-3">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="delete">
            Delete
          </Button>
        </div>
        {serverError && <p>{serverError}</p>}
      </form>
    </ModalWrapper>
  );
};
