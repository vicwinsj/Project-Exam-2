import { SkeletonCard } from "./SkeletonCard";

export const SkeletonLoader = () => {
  return (
    <div className="w-full grid grid-cols-4 gap-10">
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
