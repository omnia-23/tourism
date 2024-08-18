import { Button } from "@/components/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-10 min-h-screen flex flex-col justify-center items-center">
      <p className="text-6xl font-bold mb-6">404</p>
      <p className="capitalize text-center text-xl">
        the page you are trying to visit is not found, try again later
      </p>
      <Link href="/dashboard/tours" className="mt-4 text-lg">
        <Button className="bg-black capitalize hover:text-black hover:border-black hover:border-2">
          go home
        </Button>
      </Link>
    </div>
  );
}
