import { Tour } from "@/models";
import { createColumnHelper } from "@tanstack/react-table";
import { DeleteTourButton } from "./DeleteTourButton";
import { col } from "@/lib/helpers/table";

const columnHelper = createColumnHelper<Tour>();

const tourColumn = col<Tour>;

export const columns = [
  columnHelper.accessor(...tourColumn("name")),
  columnHelper.accessor(...tourColumn("description", { truncate: true })),
  columnHelper.accessor(...tourColumn("location")),
  columnHelper.accessor(...tourColumn("duration")),
  columnHelper.accessor((row) => row.id, {
    id: "actions",
    cell: DeleteTourButton,
    header: () => <p>Actions</p>,
  }),
];
