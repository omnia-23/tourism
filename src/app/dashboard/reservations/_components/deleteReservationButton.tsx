import { Button, LoadingSpinner } from "@/components/ui";
import { deleteReservation } from "@/lib/actions/reservations.actions";
import { Reservation } from "@/models";
import { CellContext } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

export function DeleteReservation({
  getValue,
  setIsOpen,
}: CellContext<Reservation, number> & {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Button
        disabled={isLoading}
        variant={"destructive"}
        onClick={async (e) => {
          e.stopPropagation();
          setIsLoading(true);
          const { success } = await deleteReservation(getValue());

          if (success) {
            toast.success("Reservation deleted successfully");
          } else {
            toast.error("Error deleting reservation");
          }
          setIsLoading(false);
          setIsOpen(false);
        }}
      >
        {isLoading ? <LoadingSpinner className="mr-0" /> : <Trash2 size={20} />}
      </Button>
    </>
  );
}
