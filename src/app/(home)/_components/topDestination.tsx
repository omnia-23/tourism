import { DestinationCard } from "@/components/ui";
import { getTours } from "@/lib/actions/tour.actions";
import Image from "next/image";
import img from "@/assets/baner.jpg";
import { cn } from "@/lib/utils";
import { yesteryear } from "@/lib/fonts";

export async function TopDestination() {
  const tours = await getTours();

  return (
    <>
      <section className="my-10 w-full relative">
        <Image
          className="object-cover h-[200px] w-full"
          src={img}
          alt="Let’s make your next holiday amazing"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center">
          <span
            className={cn(
              "text-3xl md:text-5xl font-semibold text-white",
              yesteryear.className
            )}
          >
            Let’s make your next holiday amazing
          </span>
        </div>
      </section>

      <section className="w-5/6 m-5 mx-auto md:flex flex-col items-center justify-around">
        <p className="text-primary-foreground text-sm uppercase font-semibold">
          Trend
        </p>
        <h3 className="text-4xl font-semibold my-3 text-center">
          Our Trending Tours
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {tours.data.slice(0, 3).map((item, index) => (
            <DestinationCard key={index} tour={item} />
          ))}
        </div>
      </section>
    </>
  );
}
