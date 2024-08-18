import { getSingleTour } from "@/lib/actions/tour.actions";
import { TourForm } from "../../add/form/TourForm";

export default async function EditPage({
  params: { tourId },
}: {
  params: { tourId: string };
}) {
  const tourData = await getSingleTour(Number(tourId));

  return (
    <>
      <TourForm tourData={tourData} />
    </>
  );
}
