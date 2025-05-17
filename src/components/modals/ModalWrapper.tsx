import { handleBackgroundClick } from "../utilities/handleBackgroundClick";

type ModalWrapperProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const ModalWrapper = ({ onClose, children }: ModalWrapperProps) => {
  return (
    <div
      className="z-10 fixed inset-0 flex justify-center items-center bg-black/50"
      onClick={(event) => handleBackgroundClick({ onClose }, event)}
    >
      {children}
    </div>
  );
};

export default ModalWrapper;
