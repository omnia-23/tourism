import { TourReview } from "@/models";
import { createColumnHelper } from "@tanstack/react-table";
import { ReviewText } from "./ReviewText";
import { DeleteReview } from "./DeleteReview";
import { ShowReview } from "./ShowReview";
import { col } from "@/lib/helpers/table";

const columnHelper = createColumnHelper<TourReview>();

const column = col<TourReview>;

export const columns = [
  columnHelper.accessor(...column("title")),
  columnHelper.accessor((row) => row.body, {
    id: "body",
    cell: ReviewText,
    header: () => <p>Body</p>,
  }),
  columnHelper.accessor((row) => row.stars, {
    id: "stars",
    cell: ({ getValue }) => <p className="text-center">{getValue()}</p>,
    header: () => <p className="text-center">Rating</p>,
  }),
  // TODO:get tour with reviews
  columnHelper.accessor((row) => row.tour?.name, {
    id: "tour name",
    cell: ({ getValue }) => <p className="text-center">{getValue()}</p>,
    header: () => <p className="text-center">Tour name</p>,
  }),
  columnHelper.accessor((row) => row.id, {
    id: "visibilty",
    cell: ShowReview,
    header: () => <p className="text-center">Visibilty</p>,
  }),
  columnHelper.accessor((row) => row.id, {
    id: "actions",
    cell: DeleteReview,
    header: () => <p className="text-center">Actions</p>,
  }),
];
