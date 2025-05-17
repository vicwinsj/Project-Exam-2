import { SkeletonCard } from "./SkeletonCard";

export const HomeLoader = () => {
  return (
    <div className="w-full h-full grid grid-cols-4 gap-10">
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
      <div className="flex gap-3 w-full h-100 rounded-t-xl overflow-hidden">
        <div className="bg-neutral-300 flex-2"></div>
        <div className="flex flex-col gap-3 flex-1">
          <div className="bg-neutral-300 flex-1"></div>
          <div className="bg-neutral-300 flex-1"></div>
        </div>
      </div>
      <div className="bg-neutral-300 w-2/3 h-10"></div>
      <div className="border-neutral-300 border-1 w-2/3 h-screen"></div>
    </div>
  );
};
