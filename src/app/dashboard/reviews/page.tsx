import { getReviews } from "@/lib/actions/reviews.actions";
import { ReviewsTable } from "./_components/ReviewsTable";
import { SearchForm } from "@/app/(home)/tours/_components/searchForm";
import { PageParams } from "@/models";

export default async function page({
  searchParams: { page = 1, q = "" },
}: PageParams) {
  const reviews = await getReviews(page, q);

  return (
    <>
      <main className="min-h-screen">
        <div className="bg-white mx-2 my-4 rounded-md shadow-md text-2xl font-semibold py-4 px-4 flex  items-center justify-between">
          Reviews
          <div className="w-2/3 mx-auto">
            <SearchForm />
          </div>
        </div>{" "}
        <div className="m-2">
          <ReviewsTable data={reviews} />
        </div>
      </main>
    </>
  );
}
