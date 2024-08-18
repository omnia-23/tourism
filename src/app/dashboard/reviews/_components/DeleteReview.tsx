import { Button, LoadingSpinner } from "@/components/ui";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { CellContext } from "@tanstack/react-table";
import { TourReview } from "@/models";
import { forceDeleteReview } from "@/lib/actions/reviews.actions";

export function DeleteReview({ getValue }: CellContext<TourReview, number>) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      className="mx-auto flex justify-center"
      disabled={isLoading}
      variant={"destructive"}
      onClick={async (e) => {
        e.stopPropagation();
        setIsLoading(true);
        const res = await forceDeleteReview(Number(getValue()));
        if (res.success) {
          toast.success("Review deleted successfully");
        } else {
          toast.error("Error deleting review");
        }
        setIsLoading(false);
      }}
    >
      {isLoading ? <LoadingSpinner className="mr-0" /> : <Trash2 size={20} />}
    </Button>
  );
}
