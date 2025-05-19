import { SkeletonCard } from "./SkeletonCard";

export const HomeLoader = () => {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-4 gap-10">
      {" "}
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export const VenueLoader = () => {
  return (
    <div className="w-full flex flex-col gap-10 animate-[pulse_1s_ease-in-out_infinite]">
      <div className="w-full h-100 flex gap-3 rounded-t-xl loading"></div>
      <div className="w-2/3 h-10 rounded-sm loading"></div>
    </div>
  );
};
