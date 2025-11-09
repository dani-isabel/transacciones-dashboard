"use client";
import Navbar from "@/components/Navbar";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-full h-full justify-center items-center mt-30">
        <ExclamationCircleIcon className="w-48 md:w-64 ml-1 text-primary" />
        <h1 className="p-5 text-center text-primary md:text-3xl">
          Algo salió mal
        </h1>
      </div>
    </div>
  );
}
