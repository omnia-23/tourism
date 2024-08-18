"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  reserveFormData,
  reserveSchema,
} from "@/app/(home)/tours/[tourId]/reserve/form/Reservation.schema";
import { useForm } from "react-hook-form";
import { addReservation } from "@/lib/actions/reservations.actions";
import Swal from "sweetalert2";
import { toast } from "sonner";

export const useReserveForm = (tour_id: number) => {
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }

  const reserveForm = useForm<reserveFormData>({
    resolver: zodResolver(reserveSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      hotel_name: "",
      room_uid: "",
      options: [],
      num_people: 1,
      payment_method_id: "",
    },
  });

  const { isDirty, errors, isValid, isSubmitting } = reserveForm.formState;

  const now = new Date();
  const formattedDate = formatDate(now);

  const onSubmit = reserveForm.handleSubmit(async (data: reserveFormData) => {
    console.log(data);
    const res = await addReservation({
      tour_id: String(tour_id),
      // ...data,
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      hotel_name: data.hotel_name,
      num_people: String(data.num_people),
      payment_method_id: data.payment_method_id,
      room_uid: data.room_uid,
      // room_uid: data.room_uid !== undefined ? data.room_uid : "",
      payment_number: "01551937083",
      currency: "USD",
      date: formattedDate,
    });
    console.log(res);

    if (!res.status) {
      toast.error("Some thing  went wrong!");
    } else {
      const { data } = await res;
      if (data.payment_data && data.payment_data.redirectTo) {
        window.location.assign(data.payment_data.redirectTo);
      } else if (data.payment_data && data.payment_data.fawryCode) {
        Swal.fire({
          title: `Fawry Code: ${data.payment_data.fawryCode}`,
          text: `Expire Date: ${data.payment_data.expireDate}`,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    }
  });

  return { reserveForm, isDirty, errors, isValid, isSubmitting, onSubmit };
};
