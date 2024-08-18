"use server";
import { NewReservation, PaginationData, Reservation } from "@/models";
import { revalidatePath } from "next/cache";
import { API_URL } from "@/constants/api";
import * as http from "@/lib/helpers/fetch";

const endpoint = "reservations";

export async function addReservation(data: NewReservation) {
  const response = await fetch(`${API_URL}reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }
  const responseData = await response.json();
  return responseData.data.payment;
}

export async function getPaymentMethods() {
  const response = await fetch(`${API_URL}payment/get-methods`, {
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch payment methods");
  }

  const responseData = await response.json();
  return responseData.data.data;
}

export async function getReservations(page: number = 1) {
  return await http.getRequest<PaginationData<Reservation>>(
    `${endpoint}?page=${page}`
  );
}

export async function getSingleReservation(id: number) {
  return await http.getRequest<Reservation>(`${endpoint}/${id}`);
}

export async function deleteReservation(id: number) {
  const res = await http.deleteRequest(`${endpoint}/${id}`);

  if (res.success) {
    revalidatePath("/dashboard/tours");
  }
  return res;
}
