import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface ImageCarouselProps {
  onClose: () => void;
  images: {
    url: string;
    alt: string;
  }[];
  activeImageIndex: number;
}

export const ImageCarousel = ({
  onClose,
  images,
  activeImageIndex,
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(activeImageIndex);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((next) => (next === images.length - 1 ? 0 : next + 1));
  };

  return (
    <ModalWrapper onClose={onClose} isImageCarousel={true}>
      <div className="flex flex-col items-center w-full h-1/2 md:h-full relative">
        {/* Image */}
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt || "Venue image"}
          className="w-full h-full object-cover"
        />

        {/* Numbers */}
        <p
          onClick={onClose}
          className="text-white/70 text-sm font-semibold flex items-center absolute right-6 -bottom-7"
        >
          {currentIndex + 1}/{images.length}
        </p>

        {/* Exit Button */}
        <button
          onClick={onClose}
          className="bg-black/50 transition-colors duration-300 flex items-center justify-center absolute right-4 -top-30 md:top-4 text-white/70 hover:text-white size-8 rounded-full p-3"
        >
          <FontAwesomeIcon size="lg" icon={faXmark} />
        </button>

        {images.length > 1 && (
          <>
            {/* Left Arrow */}
            <button
              onClick={prevImage}
              className="bg-sunset-800/70 transition-colors duration-300 flex items-center justify-center absolute left-5 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white size-8 rounded-full p-3 "
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextImage}
              className="bg-sunset-800/70 transition-colors duration-300 flex items-center justify-center absolute right-5 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white size-8 rounded-full p-3"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>

            {/* Dots */}
            <div className="bg-black/50 rounded-full px-2 py-1 transition-all duration-300 flex items-center absolute bottom-4 gap-2 justify-center w-fit">
              {images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`size-2 rounded-full cursor-pointer ${
                    index === currentIndex ? "size-3 bg-white" : "bg-white/40"
                  }`}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>
    </ModalWrapper>
  );
};
