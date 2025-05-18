export const SkeletonCard = () => {
  return (
    <article className="border-1 border-neutral-300 rounded-t-2xl overflow-hidden">
      <div className="flex flex-col gap-3">
        <div className="overflow-hidden w-full h-50 loading"></div>
        <div className="flex flex-col gap-1 px-3 pb-3">
          <div className="h-5 w-3/4 rounded-lg loading"></div>
          <div className="h-5 w-2/3 rounded-lg loading"></div>
          <div className="h-5 w-1/2 rounded-lg loading"></div>
        </div>
      </div>
    </article>
  );
};
