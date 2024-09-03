export const LoadingSpinner = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-12 border-neutral-200 p-12 text-neutral-200">
      <div
        className="inline-block h-48 w-48 animate-spin rounded-full  border-[10px] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      />
      <span className="animate-bounce text-6xl font-semibold">Loading</span>
    </div>
  );
};

export default LoadingSpinner;
