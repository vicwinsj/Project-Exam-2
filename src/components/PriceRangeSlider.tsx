import { useState } from "react";
import ReactSlider from "react-slider";

type PriceRangeSliderProps = {
  urlRange: [number, number];
  onChange: (range: [number, number]) => void;
};

type TrackProps = {
  key: string;
  style?: React.CSSProperties;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  onMouseDown?: React.MouseEventHandler;
  onTouchStart?: React.TouchEventHandler;
  children?: React.ReactNode;
};

type TrackState = {
  index: number;
};

const PriceRangeSlider = ({ urlRange, onChange }: PriceRangeSliderProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const handleChange = (values: [number, number]) => {
    setPriceRange(values);
    onChange(values);
  };

  return (
    <div className="w-full">
      <ReactSlider
        className="h-2 flex items-center"
        thumbClassName="cursor-grab h-5 w-5 bg-white hover:bg-air-100 border-1 border-ocean-700 rounded-full"
        trackClassName="h-1 bg-neutral-300 rounded-xl flex items-center"
        min={0}
        max={10000}
        step={1}
        value={urlRange || priceRange}
        onChange={handleChange}
        pearling
        minDistance={1}
        renderTrack={(props: TrackProps, state: TrackState) => {
          const trackIndex = state.index;
          let bg = "bg-gray-300";

          if (trackIndex === 1) {
            bg = "bg-ocean-700";
          }
          const { key, ...rest } = props;
          return <div key={key} {...rest} className={`h-2 ${bg} rounded-xl`} />;
        }}
      />
    </div>
  );
};

export default PriceRangeSlider;
