import { handleBackgroundClick } from "../utilities/handleBackgroundClick";
import { useState, useEffect } from "react";
import { ModalWrapperProps } from "../../types/modals";

const ModalWrapper = ({
  onClose,
  children,
  isImageCarousel,
}: ModalWrapperProps) => {
  const [imageCarousel, setImageCarousel] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStartY !== null && touchEndY !== null) {
      const distance = touchStartY - touchEndY;

      if (imageCarousel) {
        if (distance < -50) {
          onClose();
        }
      } else if (distance < -300) {
        onClose();
      }
    }

    setTouchStartY(null);
    setTouchEndY(null);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (isImageCarousel) {
      setImageCarousel(true);
    } else {
      setImageCarousel(false);
    }
  }, [isImageCarousel]);

  return (
    <div
      className={`z-100 fixed inset-0 h-full ${imageCarousel ? "px-1 py-10 sm:p-10 bg-black" : "py-1 bg-black/50"}`}
      onClick={(event) => handleBackgroundClick({ onClose }, event)}
    >
      <div
        className={`w-full h-full flex justify-center items-center max-h-full touch-pan-y ${!imageCarousel && "overflow-auto"}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
