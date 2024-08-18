"use client";

import { columns } from "./ToursTableColumns";
import { Tour, PaginationData } from "@/models";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/lib";

export function ToursTable({ data }: { data: PaginationData<Tour> }) {
  const router = useRouter();

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        onRowClick={(row) => router.push(`/dashboard/tours/${row.id}`)}
      />
    </>
  );
}
