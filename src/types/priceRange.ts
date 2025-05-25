export type PriceRangeSliderProps = {
  urlRange: [number, number];
  onChange: (range: [number, number]) => void;
};

export type TrackProps = {
  key: string;
  style?: React.CSSProperties;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  onMouseDown?: React.MouseEventHandler;
  onTouchStart?: React.TouchEventHandler;
  children?: React.ReactNode;
};

export type TrackState = {
  index: number;
};
