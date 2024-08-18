import { getSingleTour } from "@/lib/actions/tour.actions";
import { ReservationForm } from "./form/ReservationForm";
import { getPaymentMethods } from "@/lib/actions/reservations.actions";

export default async function Reserve({
  params: { tourId },
}: {
  params: { tourId: string };
}) {
  const tour = await getSingleTour(Number(tourId));
  const methods = await getPaymentMethods();
  const { options, price, id } = tour;

  return (
    <>
      <section className="capitalize md:px-24 md:pt-28 pt-24 px-10 mb-10">
        <h1 className="font-playfair text-4xl text-center my-4">
          Reservation Form
        </h1>
        <ReservationForm
          tourOptions={!!options.length ? options : undefined}
          tourPrice={price}
          paymentMethods={methods}
          tourId={id}
        />
      </section>
    </>
  );
}
