import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { handleBackgroundClick } from "../utilities/handleBackgroundClick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface ImageCarouselProps {
  onClose: () => void;
  images: {
    url: string;
    alt: string;
  }[];
}

export const ImageCarousel = ({ onClose, images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        className="flex justify-center items-center p-20 h-full bg-black/90 w-full"
      >
        <div className="relative w-full max-w-4xl h-[80vh] flex items-center justify-center">
          {/* Image */}
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].alt || "Venue image"}
            className="w-full h-full object-contain rounded-xl"
          />

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="flex items-center justify-center absolute left-5 top-1/2 transform -translate-y-1/2 text-white bg-ocean-700/30 size-10 rounded-full p-3 hover:bg-ocean-700/70"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="flex items-center justify-center absolute right-5 top-1/2 transform -translate-y-1/2 text-white bg-ocean-700/30 size-10 rounded-full p-3 hover:bg-ocean-700/70"
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 flex gap-2 justify-center w-full">
            {images.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === currentIndex ? "bg-white" : "bg-white/40"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
