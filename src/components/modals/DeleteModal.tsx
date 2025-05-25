import ModalWrapper from "./ModalWrapper";
import { Button } from "../form/Button";
import { deleteVenue } from "../../api/venues";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonLoader } from "../loaders/ButtonLoader";
import toast from "react-hot-toast";
import { Toast } from "../toast/toast";
import { DeleteModalProps } from "../../types/modals";

export const DeleteModal = ({
  id,
  name,
  onClose,
  onSuccess,
}: DeleteModalProps) => {
  const { accessToken, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (accessToken)
      try {
        const deleteSuccess = await deleteVenue(id, accessToken);
        if (deleteSuccess) {
          await refreshProfile();
          onSuccess?.();
          onClose();
          navigate("/");
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message) {
            setServerError(`${error.message} . Try again later.`);
          } else {
            setServerError(
              "Unknown error occurred while attempting to delete venue"
            );
          }
          toast.custom(<Toast error={true} message={serverError} />);
        }
      }
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form
        className="w-full mx-1 sm:w-1/2 flex flex-col gap-10 p-6 sm:p-10 bg-white rounded-xl"
        onSubmit={handleDelete}
      >
        <h3 className="text-xl text-black text-center">Confirm</h3>
        <p className="text-center">
          Are you sure you want to delete your venue <strong>"{name}"</strong>?
        </p>
        <div className="flex justify-center items-center gap-3">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            className={`${loading && "cursor-not-allowed bg-red-500/50 hover:bg-red-700/50"}`}
            type="submit"
            variant="delete"
          >
            {loading ? (
              <ButtonLoader buttonText="Deleting venue ..." />
            ) : (
              "Delete venue"
            )}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};
