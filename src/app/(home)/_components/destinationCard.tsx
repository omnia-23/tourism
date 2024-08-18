import Image from "next/image";
import { Tour } from "@/models";
import { FaArrowRight } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import placeholderImg from "@/assets/travelling.jpg";
import Link from "next/link";
import { Button } from "@/components/ui";
import { IoIosCalendar } from "react-icons/io";

export function DestinationCard({
  tour: { description, name, media, id, price, duration, location },
}: {
  tour: Tour;
}) {
  const img = media?.[0]?.original_url || placeholderImg;

  return (
    <div className="shadow-md rounded-md overflow-hidden p-5 relative  hover:scale-105 transition duration-500">
      <Image
        className="lg:h-48 md:h-40 w-full object-cover object-center cursor-pointer"
        src={img}
        alt={name}
        width={200}
        height={100}
      />
      <div className="flex justify-between mt-2">
        <div className="capitalize flex text-base text-gray-600 items-center space-x-1">
          <IoIosCalendar size={18} />
          <h6>{duration}</h6>
        </div>
        <div className="capitalize flex text-base text-gray-600 items-center space-x-1">
          <IoLocationOutline size={18} />
          {/* <h6>{location.split("\n")[1].split(",")[0]}</h6> */}
          <h6>{location}</h6>
        </div>
      </div>
      <h5 className="text-2xl mb-2 font-semibold text-secondary-foreground">
        {name}
      </h5>
      <p className="text-base mb-5">{description}</p>
      <Link
        href={`/tours/${id}`}
        className="text-indigo-500 inline-flex items-center"
      >
        <Button className="absolute bottom-3 text-base">
          Learn More
          <FaArrowRight className="mx-3" />
        </Button>
      </Link>
    </div>
  );
}
