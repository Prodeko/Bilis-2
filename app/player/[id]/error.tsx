"use client";

// Error components must be Client Components
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-6xl font-medium text-neutral-400">
          Something went wrong!
        </h1>
        <span className="text-3xl text-neutral-100">{error.message}</span>
      </div>
      <button
        className="cursor-pointer rounded-lg border-none bg-neutral-300 px-4 py-2 text-lg transition-all duration-200 hover:bg-neutral-100"
        type="button"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}

export const dynamic = "force-dynamic";
