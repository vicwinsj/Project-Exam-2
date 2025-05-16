import { ReactNode } from "react";

type FilterLabelProps = {
  children: ReactNode;
};

export const FilterLabel = ({ children }: FilterLabelProps) => {
  return (
    <strong className="text-sm cursor-text  bg-turquoise-500 text-ocean-700 rounded-lg py-1 px-3">
      {children}
    </strong>
  );
};
