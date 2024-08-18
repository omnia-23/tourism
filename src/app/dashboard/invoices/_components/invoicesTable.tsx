"use client";

import { Invoice, PaginationData } from "@/models";
import { columns } from "./invoicesTableColumns";
import { DataTable } from "@/components/lib";

export const ReservationsTable = ({
  data,
}: {
  data: PaginationData<Invoice>;
}) => {
  return (
    <>
      <DataTable data={data} columns={columns} />
    </>
  );
};
