import booking from "@/assets/booking.png";
import Image from "next/image";
import { FaCarSide, FaRegCalendarCheck } from "react-icons/fa";
import { LuBoxSelect } from "react-icons/lu";

export default function Booking() {
  const arr = [
    {
      icon: (
        <LuBoxSelect className="bg-blue-900 text-white p-1 rounded" size={30} />
      ),
      title: "Choose Destination",
      disc: "Lorem ipsum dolor sit amet, consectetur elit.Urna, tortor tempus.",
    },
    {
      icon: (
        <FaRegCalendarCheck
          className="bg-green-800 text-white p-1 rounded"
          size={30}
        />
      ),
      title: "Check Availability",
      disc: "Lorem ipsum dolor sit amet, consectetur elit.Urna, tortor tempus.",
    },
    {
      icon: (
        <FaCarSide className="bg-orange-800 text-white p-1 rounded" size={30} />
      ),
      title: "Let's Go",
      disc: "Lorem ipsum dolor sit amet, consectetur elit.Urna, tortor tempus.",
    },
  ];
  return (
    <section className="w-5/6 mt-5 mx-auto md:flex items-center justify-around">
      <div className="w-full md:w-1/3 flex flex-col items-start">
        <p className="text-secondary text-base uppercase font-semibold">
          Fast & Easy
        </p>
        <h2 className="text-4xl font-semibold my-5 text-center">
          Get Your Favorite Resort Bookings
        </h2>
        <div>
          {arr.map((item, index) => (
            <div key={index} className="my-3 flex">
              <div className="mx-3 my-1">{item.icon}</div>
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-sm">{item.disc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Image
        src={booking}
        alt="book your tour"
        className="w-full md:w-1/2 "
        width={500}
      />
    </section>
  );
}
