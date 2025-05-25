import { handleBackgroundClick } from "../utilities/handleBackgroundClick";
import { useState, useEffect } from "react";

type ModalWrapperProps = {
  onClose: () => void;
  children: React.ReactNode;
  isImageCarousel?: boolean;
};

const ModalWrapper = ({
  onClose,
  children,
  isImageCarousel,
}: ModalWrapperProps) => {
  const [imageCarousel, setImageCarousel] = useState(false);

  useEffect(() => {
    if (isImageCarousel) {
      setImageCarousel(true);
    } else {
      setImageCarousel(false);
    }
  }, [isImageCarousel]);

  return (
    <div
      className={`z-100 fixed inset-0 h-full flex justify-center items-center ${imageCarousel ? "px-1 py-10 sm:p-10 bg-black" : "py-1 bg-black/50"}`}
      onClick={(event) => handleBackgroundClick({ onClose }, event)}
    >
      {children}
    </div>
  );
};

export default ModalWrapper;
