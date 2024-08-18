import { PaginationData } from "@/models";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export function useCustomTable<TData>(
  data: PaginationData<TData>,
  columns: ColumnDef<TData, any>[],
  pageIndex: number
) {
  return useReactTable({
    data: data.data || [],
    pageCount: data.last_page,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination: {
        pageIndex,
        pageSize: 15,
      },
    },
  });
}
