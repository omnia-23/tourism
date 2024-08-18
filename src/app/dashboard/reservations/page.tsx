import { getReservations } from "@/lib/actions/reservations.actions";
import { ReservationsTable } from "./_components/ReservationTable";

export default async function ReservationsPage({
  searchParams: { page = 1 },
}: {
  searchParams: { page: number };
}) {
  const data = await getReservations(page);

  return (
    <>
      <main className="min-h-screen">
        <div className="bg-white mx-2 my-4 rounded-md shadow-md text-2xl font-semibold py-4 px-4 flex  items-center justify-between">
          Reservations
        </div>{" "}
        <div className="m-2">
          <ReservationsTable data={data} />
        </div>
      </main>
    </>
  );
}
