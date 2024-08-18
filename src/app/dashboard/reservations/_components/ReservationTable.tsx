"use client";

import { PaginationData, Reservation } from "@/models";
import { columns } from "./ReservationTableColumns";
import { DataTable } from "@/components/lib";

export const ReservationsTable = ({
  data,
}: {
  data: PaginationData<Reservation>;
}) => {
  return (
    <>
      <DataTable data={data} columns={columns} />
    </>
  );
};
