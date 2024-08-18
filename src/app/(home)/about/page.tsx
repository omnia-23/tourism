import Image, { StaticImageData } from "next/image";
import img from "@/assets/about.webp";
import panar from "@/assets/baner.jpg";
import img3 from "@/assets/img3.webp";
import img4 from "@/assets/img4.webp";
import aboutUs from "@/assets/about-us.png";
import Link from "next/link";
import { Button } from "@/components/ui";
import { FaArrowRight } from "react-icons/fa6";
import { yesteryear } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface image {
  place: string;
  img: StaticImageData;
}

export default function page() {
  const images: image[] = [
    {
      place: "Egypt",
      img: img3,
    },
    {
      place: "Egypt",
      img: img3,
    },
    {
      place: "Egypt",
      img: img3,
    },
    {
      place: "Egypt",
      img: img3,
    },
    {
      place: "Egypt",
      img: img3,
    },
    {
      place: "Egypt",
      img: img3,
    },
    {
      place: "Egypt",
      img: img3,
    },
    {
      place: "Egypt",
      img: img3,
    },
    {
      place: "Egypt",
      img: img3,
    },
    {
      place: "Egypt",
      img: img3,
    },
  ];

  return (
    <section className="capitalize flex flex-col items-center gap-10">
      <div className="min-w-full  h-[25rem] relative">
        <div className=" flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-15 text-white absolute z-0">
          <p className="text-primary-foreground text-base uppercase font-semibold">
            Read
          </p>
          <h1 className="font-lora text-6xl text-center m-3">About Us</h1>
        </div>
        <Image
          src={img}
          alt="homepage"
          className="-z-10 absolute w-full h-full object-cover"
        />
      </div>

      <div className="w-3/4 h-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col justify-center">
          <p className="text-primary-foreground text-sm uppercase font-semibold">
            Promotion
          </p>
          <h3 className="text-4xl font-semibold my-3">
            We Provide You Best Sightseeing Tours
          </h3>
          <p>
            Et labore harum non nobis ipsum eum molestias mollitia et corporis
            praesentium a laudantium internos. Non quis eius quo eligendi
            corrupti et fugiat nulla qui soluta recusandae in maxime quasi aut
            ducimus illum aut optio quibusdam!
          </p>
          <Link
            href={`/tours`}
            className="text-primary-foreground my-10 inline-flex items-center"
          >
            <Button className="text-base">
              View Our Tours
              <FaArrowRight className="mx-3" />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <Image
              src={img3}
              alt="homepage"
              className="lg:w-3/4 ml-auto mb-5"
            />
            <Image src={img4} alt="homepage" className="w-full" />
          </div>
          <div>
            <Image src={img4} alt="homepage" className="w-full" />
            <Image
              src={img3}
              alt="homepage"
              className="lg:w-4/5 mr-auto mt-5"
            />
          </div>
        </div>
      </div>

      <section className="my-10 w-full relative">
        <Image
          className="object-cover h-[200px] w-full"
          src={panar}
          alt="Let’s make your next holiday amazing"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center">
          <span
            className={cn(
              "text-3xl md:text-5xl font-semibold text-white",
              yesteryear.className
            )}
          >
            Adventure is worthwhile
          </span>
        </div>
      </section>

      <div className="w-3/4 flex justify-around gap-5 flex-col-reverse md:flex-row">
        <Image src={aboutUs} alt="homepage" className="w-full md:w-1/3" />

        <div className=" md:w-1/2 md:p-10 flex flex-col justify-center">
          <p className="text-primary-foreground text-sm uppercase font-semibold">
            Trend
          </p>
          <h3 className="text-4xl font-semibold my-3">
            Our Popular Tour Plans
          </h3>
          <p>
            Et labore harum non nobis ipsum eum molestias mollitia et corporis
            praesentium a laudantium internos. Non quis eius quo eligendi
            corrupti et fugiat nulla qui soluta recusandae in maxime quasi aut
            ducimus illum aut optio quibusdam!
          </p>
        </div>
      </div>

      <div className="w-5/6 text-center">
        <p className="text-primary-foreground text-center text-sm uppercase font-semibold">
          Explore more
        </p>
        <h3 className="text-4xl font-semibold my-5">
          Our International Packages
        </h3>
        <div className="grid md:grid-cols-4 md:grid-rows-4 gap-3">
          {images.map((item, index) => (
            <div key={index} className="relative w-full">
              <div className="absolute w-full h-full bg-black bg-opacity-20">
                <h1 className="absolute bottom-5 left-5 text-white text-lg font-semibold">
                  {item.place}
                </h1>
              </div>
              <Image
                src={item.img}
                alt={item.place}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
