import { Paginator } from "@/components/lib";
import { TourCard } from "@/components/ui";
import { getTours } from "@/lib/actions/tour.actions";
import { SearchForm } from "./_components/searchForm";
import { PageParams } from "@/models";
import Image from "next/image";
import img from "@/assets/background.webp";
import { cn } from "@/lib/utils";
import { lora } from "@/lib/fonts";

export default async function Tours({
  searchParams: { page = 1, q = "" },
}: PageParams) {
  const data = await getTours(page, q);
  const toursArray = data.data;

  const noTours = toursArray.length === 0;

  const tours = (
    <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
      {toursArray.map((tour, index) => (
        <TourCard key={index} tour={tour} />
      ))}
    </div>
  );

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="relative w-full">
        <div className="w-full flex items-center justify-center absolute top-[6rem] md:top-1/3 left-1/2 transform -translate-x-1/2 z-10">
          <div className="text-white flex flex-col items-center w-2/3">
            <p className="text-sm uppercase font-semibold">Search Tour</p>
            <h2
              className={cn(
                "text-3xl md:text-5xl font-semibold my-3 text-center capitalize",
                lora.className
              )}
            >
              travel with us
            </h2>
            <SearchForm />
          </div>
        </div>
        <Image
          src={img}
          alt="img"
          width={800}
          height={200}
          className="object-cover w-full h-[20rem] md:h-[23rem]"
        />
      </div>

      <div className="relative md:-top-[5rem] bg-white py-5 px-5 rounded shadow w-5/6 mx-auto">
        {noTours ? <EmptyText /> : tours}
        <div className="mb-4">
          <Paginator page={page} lastPage={data?.last_page || 1} />
        </div>
      </div>
    </section>
  );
}

const EmptyText = () => (
  <div className="h-80 grid place-items-center">
    <p className="text-2xl">No tours found</p>
  </div>
);
