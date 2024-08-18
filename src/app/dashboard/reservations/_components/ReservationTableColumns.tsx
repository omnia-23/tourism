import { col } from "@/lib/helpers/table";
import { Reservation } from "@/models";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { DeleteReservation } from "./deleteReservationButton";
import { DeleteConfirmDialog } from "./deleteConfirmDialog";

const columnHelper = createColumnHelper<Reservation>();

const reservationColumn = col<Reservation>;

export const columns = [
  columnHelper.accessor(...reservationColumn("name")),
  columnHelper.accessor(...reservationColumn("email")),
  columnHelper.accessor(...reservationColumn("phone")),
  columnHelper.accessor(...reservationColumn("date", { date: true })),
  columnHelper.accessor(...reservationColumn("hotel_name")),
  columnHelper.accessor(
    ...reservationColumn("room_uid", { header: "room number" })
  ),
  columnHelper.accessor(
    ...reservationColumn("num_people", { header: "no. of people" })
  ),
  columnHelper.accessor(...reservationColumn("total_amount")),
  columnHelper.accessor(...reservationColumn("amount_paid")),
  columnHelper.accessor((row) => row.tour.name, {
    id: "tour name",
    cell: ({ getValue }) => <p>{getValue()}</p>,
    header: () => <p className="captailize min-w-32">tour name</p>,
  }),
  columnHelper.accessor((row) => row.uid, {
    id: "actions",
    cell: DeleteConfirmDialog,
    header: () => <p>Actions</p>,
  }),
];
