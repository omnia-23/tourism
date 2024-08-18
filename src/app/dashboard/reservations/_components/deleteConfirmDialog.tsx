import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { DeleteReservation } from "./deleteReservationButton";
import { CellContext } from "@tanstack/react-table";
import { Reservation } from "@/models";
import { Trash2 } from "lucide-react";

export function DeleteConfirmDialog(props: CellContext<Reservation, number>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen}>
      <Button
        onClick={() => setIsOpen(true)}
        className="mx-auto flex justify-center"
        variant={"destructive"}
      >
        <Trash2 size={20} />
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            reservation.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex items-center justify-end gap-2">
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <DeleteReservation setIsOpen={setIsOpen} {...props} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
