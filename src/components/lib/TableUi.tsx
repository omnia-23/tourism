import { ColumnDef, Table, flexRender } from "@tanstack/react-table";
import {
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  Table as TableMain,
} from "@/components/ui";
import { Paginator } from "./Paginator";
import { useSearchParams } from "next/navigation";
import { useCustomTable } from "@/lib/hooks";
import { PaginationData } from "@/models";

export const EmptyRow = ({ colSpan }: { colSpan: number }) => (
  <TableRow>
    <TableCell colSpan={colSpan} className="h-24 text-center">
      No Data yet.
    </TableCell>
  </TableRow>
);

export const TableHeaderUI = <T,>({ table }: { table: Table<T> }) => (
  <TableHeader>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableHead
            className="pt-4 pb-2 text-primary-foreground text-base"
            key={header.id}
          >
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        ))}
      </TableRow>
    ))}
  </TableHeader>
);

export const TableBodyUI = <T,>({
  table,
  onRowClick,
}: {
  table: Table<T>;
  onRowClick?: (row: T) => void;
}) => (
  <TableBody>
    {(() => {
      const rows = table.getRowModel().rows;
      if (rows.length) {
        return rows.map((row) => (
          <TableRow
            onClick={() => onRowClick && onRowClick(row.original)}
            className="cursor-pointer"
            key={row.id}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ));
      } else {
        return <EmptyRow colSpan={table.getAllColumns().length} />;
      }
    })()}
  </TableBody>
);

export const DataTable = <T,>({
  data,
  columns,
  onRowClick,
}: {
  data: PaginationData<T>;
  columns: ColumnDef<T, any>[];
  onRowClick?: (row: T) => void;
}) => {
  const params = useSearchParams();
  const pageIndex = Number(params.get("page")) || 1;
  const table = useCustomTable(data, columns, pageIndex);

  return (
    <>
      <TableMain className="mb-2 bg-white rounded-lg shadow-md">
        <TableHeaderUI table={table} />
        <TableBodyUI table={table} onRowClick={onRowClick} />
      </TableMain>
      {table.getPageCount() !== 1 && (
        <div className="shadow-md bg-white py-2 pb-4 rounded-md mb-4">
          <Paginator
            page={table.getState().pagination.pageIndex}
            lastPage={table.getPageCount()}
          />
        </div>
      )}
    </>
  );
};
