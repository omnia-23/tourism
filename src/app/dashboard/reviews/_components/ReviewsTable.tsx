"use client";
import { columns } from "./ReviewTableColumns";
import { TourReview, PaginationData } from "@/models";
import { DataTable } from "@/components/lib";

export const ReviewsTable = ({
  data,
}: {
  data: PaginationData<TourReview>;
}) => {
  return (
    <>
      <DataTable data={data} columns={columns} />
    </>
  );
};
