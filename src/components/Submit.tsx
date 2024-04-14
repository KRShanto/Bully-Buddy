"use client";

import { useFormErrorStore } from "@/stores/form-error";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
// @ts-ignore
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/cn";

export default function Submit({
  children,
  formAction,
  className,
}: {
  children: React.ReactNode;
  formAction?: (formData: FormData) => Promise<void>;
  className?: string;
}) {
  const { pending } = useFormStatus();
  const { clearError } = useFormErrorStore();

  // reset the error state when the component is mounted
  useEffect(() => {
    clearError();
  }, []);

  const handler = async (data: FormData) => {
    // reset the error state when the button is clicked
    clearError();

    if (formAction) await formAction(data);
  };

  return (
    <button
      type="submit"
      formAction={handler}
      className={cn("flex h-10 w-32 items-center justify-center", className)}
    >
      {pending ? (
        <RotatingLines strokeColor="#fff" strokeWidth="5" width="30" />
      ) : (
        children
      )}
    </button>
  );
}
