import Image from "next/image";
import logo from "@/assets/logo.png";
import { ListItem } from "./atoms/ListItem";
import {
  Home,
  Banknote,
  Plane,
  MessageSquareMore,
  BookOpenCheck,
} from "lucide-react";
import Link from "next/link";

export const SideBar = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 p-2 w-52 h-screen flex flex-col items-center border-r-2 border-slate-200">
      <div className="w-40 mx-auto">
        <Link href="/dashboard/tours">
          <Image
            className="w-full object-cover"
            src={logo}
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
      </div>
      <ul className="space-y-4 mt-8">
        <ListItem href="/dashboard/tours" Icon={<Plane {...iconProps} />}>
          tours
        </ListItem>
        <ListItem
          href="/dashboard/reviews"
          Icon={<MessageSquareMore {...iconProps} />}
        >
          reviews
        </ListItem>
        <ListItem
          href="/dashboard/reservations"
          Icon={<BookOpenCheck {...iconProps} />}
        >
          Reservations
        </ListItem>
        <ListItem href="/dashboard/invoices" Icon={<Banknote {...iconProps} />}>
          Invoices
        </ListItem>

        <ListItem href="/tours" Icon={<Home {...iconProps} />}>
          Home
        </ListItem>
      </ul>
    </div>
  );
};

const iconProps = {
  size: 22,
};
