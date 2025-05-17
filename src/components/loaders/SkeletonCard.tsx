export const SkeletonCard = () => {
  return (
    <article className="transition-colors duration-300 border-1 border-neutral-300 rounded-t-2xl overflow-hidden animate-pulse">
      <div className="flex flex-col gap-3">
        <div className="overflow-hidden bg-neutral-300 w-full h-50"></div>
        <div></div>
        <div className="px-3 pb-3">
          <div className="h-10 bg-neutral-300"></div>
          <div className="h-5 bg-neutral-300"></div>
        </div>
      </div>
    </article>
  );
};
