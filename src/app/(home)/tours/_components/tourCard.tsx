"use client";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { Tour } from "@/models";
import placeholderImg from "@/assets/travelling.jpg";
import { IoIosCalendar } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:scale-105 transition duration-500 cursor-pointer">
      {!tour.media.length ? (
        <Image
          className="lg:h-48 md:h-40 w-full object-cover object-center "
          src={placeholderImg}
          width={500}
          height={350}
          alt={tour.name}
        />
      ) : (
        <Image
          className="lg:h-48 md:h-40 w-full object-cover object-center "
          src={tour.media?.[0]?.original_url}
          width={500}
          height={350}
          alt={tour.name}
        />
      )}

      <div className="bg-secondary-foreground text-white flex justify-between px-3 py-2">
        <div className="capitalize flex text-xs md:text-base items-center space-x-1">
          <IoIosCalendar size={18} />
          <h6>{tour.duration}</h6>
        </div>
        <div className="capitalize flex text-xs md:text-base items-center space-x-1">
          <IoLocationOutline size={18} />
          {/* <h6>{tour.location.split("\n")[1].split(",")[0]}</h6> */}
          <h6>{tour.location}</h6>
        </div>
      </div>
      <div className="px-3 py-2 capitalize">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium text-gray-900">{tour.name}</h1>
          {/* <span className="inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-md font-medium">
            {tour.rate}
            <Image className="mx-2" src={star} alt="rate" width="16" />
          </span> */}
        </div>
        <p className="leading-relaxed mb-3">
          {tour.description.split(" ").slice(1, 15).join(" ")}
        </p>

        <div className="flex items-center justify-between flex-wrap ">
          <Link
            href={`/tours/${tour.id}?tab=info`}
            className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
          >
            Learn More
            <FaArrowRight className="mx-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
