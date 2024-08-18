"use client";
import { Button, LoadingSpinner } from "@/components/ui";
import { deleteTour } from "@/lib/actions/tour.actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function SingleTourButtons({ tourId }: { tourId: number }) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="space-x-2 w-full  flex justify-end">
      <Button
        disabled={isDeleteLoading}
        onClick={async () => {
          setIsDeleteLoading(true);
          const { success, errors } = await deleteTour(tourId);
          if (success) {
            toast.success("Tour deleted successfully");
            router.push("/dashboard/tours");
          } else {
            toast.error(errors);
          }
          setIsDeleteLoading(false);
        }}
        variant={"destructive"}
      >
        {isDeleteLoading ? <LoadingSpinner className="mr-0" /> : "Delete"}
      </Button>
      <Button>
        <Link href={`/dashboard/tours/${tourId}/edit`}>Edit</Link>
      </Button>
    </div>
  );
}
