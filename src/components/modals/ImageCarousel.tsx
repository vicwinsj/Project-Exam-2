import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { handleBackgroundClick } from "../utilities/handleBackgroundClick";
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
    <ModalWrapper onClose={onClose}>
      <div
        onClick={(event) => handleBackgroundClick({ onClose }, event)}
        className="flex items-center justify-center p-10 h-full bg-black/70 w-full"
      >
        <div className="w-full h-full relative">
          {/* Image */}
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].alt || "Venue image"}
            className="w-full h-full object-cover"
          />

          {/* Exit Button */}
          <button
            onClick={onClose}
            className="flex items-center justify-center absolute right-5 top-10 transform -translate-y-1/2 text-white bg-black/50 size-7 rounded-full p-3 hover:bg-black/70"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

          {images.length > 1 && (
            <>
              {/* Left Arrow */}
              <button
                onClick={prevImage}
                className="flex items-center justify-center absolute left-5 top-1/2 transform -translate-y-1/2 text-white bg-black/50 size-10 rounded-full p-3 hover:bg-black/70"
              >
                <FontAwesomeIcon icon={faChevronLeft} size="lg" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={nextImage}
                className="flex items-center justify-center absolute right-5 top-1/2 transform -translate-y-1/2 text-white bg-black/50 size-10 rounded-full p-3 hover:bg-black/70"
              >
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </button>

              {/* Dots */}
              <div className="flex items-center absolute bottom-4 flex gap-2 justify-center w-full">
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
      </div>
    </ModalWrapper>
  );
};
