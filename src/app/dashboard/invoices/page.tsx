import { SearchForm } from "@/app/(home)/tours/_components/searchForm";
import { ReservationsTable } from "./_components/invoicesTable";
import { getInvoices } from "@/lib/actions/invoices.actions";
import { PageParams } from "@/models";

export default async function InvoicesPage({
  searchParams: { page = 1, q = "" },
}: PageParams) {
  const data = await getInvoices(page, q);

  return (
    <>
      <main className="min-h-screen">
        <div className="bg-white mx-2 my-4 rounded-md shadow-md text-2xl font-semibold py-4 px-4 flex  items-center justify-between">
          Invoices
          <div className="w-2/3 mx-auto">
            <SearchForm placeholder="Search by invoice number..." />
          </div>
        </div>
        <div className="m-2">
          <ReservationsTable data={data} />
        </div>
      </main>
    </>
  );
}
