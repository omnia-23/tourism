import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

export const LoadingSpinner = ({
  className,
}: {
  className?: ClassValue | ClassValue[];
}) => {
  return (
    <div
      className={cn(
        "size-4 mr-4 border-white border-t-transparent border-4 animate-spin rounded-full",
        className
      )}
    />
  );
};
