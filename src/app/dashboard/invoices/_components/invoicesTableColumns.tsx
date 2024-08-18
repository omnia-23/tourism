import { col } from "@/lib/helpers/table";
import { Invoice } from "@/models";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Invoice>();

const reservationColumn = col<Invoice>;

export const columns = [
  columnHelper.accessor(...reservationColumn("invoice_number")),
  columnHelper.accessor(...reservationColumn("reservation_id")),
  columnHelper.accessor(...reservationColumn("amount")),
  columnHelper.accessor(...reservationColumn("currency")),
  columnHelper.accessor(...reservationColumn("payment_method")),
  columnHelper.accessor(...reservationColumn("created_at", { date: true })),
];
