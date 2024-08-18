"use client";

import { truncateText } from "@/lib/helpers/text";
import { TourReview } from "@/models";
import { CellContext } from "@tanstack/react-table";
import { useState } from "react";

export const ReviewText = ({ getValue }: CellContext<TourReview, string>) => {
  const [showMore, setShowMore] = useState(false);

  const displayShowMore = getValue().length > 100;

  return (
    <div className="max-w-72">
      {displayShowMore ? (
        <>
          {showMore ? (
            <span>{getValue()}</span>
          ) : (
            <span>{truncateText(getValue(), 100)}</span>
          )}

          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setShowMore((s) => !s)}
          >
            {showMore ? "show less" : "show more"}
          </span>
        </>
      ) : (
        getValue()
      )}
    </div>
  );
};
