import { CloseProp } from "../../types/close";

export const handleBackgroundClick = (
  { onClose }: CloseProp,
  event: React.MouseEvent<HTMLDivElement>
) => {
  if (event.target === event.currentTarget) {
    onClose();
  }
};
