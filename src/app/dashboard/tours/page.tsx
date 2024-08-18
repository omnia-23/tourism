import { Button } from "@/components/ui";
import { ToursTable } from "./_components/ToursTable";
import { getTours } from "@/lib/actions/tour.actions";
import Link from "next/link";
import { SearchForm } from "@/app/(home)/tours/_components/searchForm";
import { PageParams } from "@/models";

export default async function ToursPage({
  searchParams: { page = 1, q = "" },
}: PageParams) {
  const data = await getTours(page, q);
  return (
    <>
      <main className="min-h-screen">
        <div className="bg-white mx-2 my-4 rounded-md shadow-md text-2xl font-semibold py-4 px-4 flex  items-center justify-between">
          Tours
          <div className="w-2/3 mx-auto">
            <SearchForm />
          </div>
          <Button>
            <Link href="/dashboard/tours/add">add</Link>
          </Button>
        </div>{" "}
        <div className="m-2">
          <ToursTable data={data} />
        </div>
      </main>
    </>
  );
}
