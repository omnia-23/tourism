"use client";
import { Checkbox } from "@/components/ui";
import { softDeleteReview, updateReview } from "@/lib/actions/reviews.actions";
import { toastResponse } from "@/lib/helpers/toast";
import { TourReview } from "@/models";
import { CellContext } from "@tanstack/react-table";
import { useState } from "react";
export const ShowReview = ({
  getValue,
  row,
}: CellContext<TourReview, number>) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex justify-center">
      <Checkbox
        checked={!row.original.deleted_at}
        disabled={isLoading}
        onClick={async (e) => {
          e.stopPropagation();
          setIsLoading(true);
          const state = (e.target as HTMLButtonElement).dataset["state"];
          await hideReview(state, getValue(), row.original);
          setIsLoading(false);
        }}
      />
    </div>
  );
};

async function hideReview(
  state: string | undefined,
  value: number,
  review: TourReview
) {
  if (!state) return;
  if (state === "unchecked") {
    const res = await updateReview(Number(value), {
      ...review,
      deleted_at: null,
    });
    toastResponse(res, "Review shown successfully");
  } else if (state === "checked") {
    const res = await softDeleteReview(Number(value));
    toastResponse(res, "Review hidden successfully");
  }
}
