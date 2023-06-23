export const Spinner = () => {
  return (
    <div
      role="status"
      className="relative inline-block h-6 w-6 [&>div]:absolute [&>div]:box-border [&>div]:block [&>div]:h-6 [&>div]:w-6 [&>div]:rounded-full [&>div]:border-[3px] [&>div]:border-transparent [&>div]:border-t-[#eee]"
    >
      <div className="animate-[spin_1.3s_cubic-bezier(0.5,0,0.5,0.1)_infinite]" />
      <div className="animate-[spin_1.3s_cubic-bezier(0.5,0,0.5,0.1)_infinite_-450ms]" />
      <div className="animate-[spin_1.3s_cubic-bezier(0.5,0,0.5,0.1)_infinite_-300ms]" />
      <div className="animate-[spin_1.3s_cubic-bezier(0.5,0,0.5,0.1)_infinite_-150ms]" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const ListSkeleton = () => {
  return (
    <div role="status">
      {Array(6)
        .fill("")
        .map((_, i) => (
          <div
            key={i}
            className="first:mt-4 flex animate-pulse items-center justify-center p-2 md:justify-normal md:space-x-4"
          >
            <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-300"></div>
            <div className="hidden flex-1 space-y-2 py-1 md:block">
              <div className="h-4 w-3/4 rounded bg-gray-300"></div>
              <div className="h-3 w-1/2 rounded bg-gray-300"></div>
            </div>
          </div>
        ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};
