import { childrenProp } from "../types/children";

export const FilterLabel = ({ children }: childrenProp) => {
  return (
    <strong className="text-sm cursor-text  bg-turquoise-500 text-ocean-700 rounded-lg py-1 px-3">
      {children}
    </strong>
  );
};
