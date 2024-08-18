"use server";
import { Tour, PaginationData } from "@/models";
import { revalidatePath } from "next/cache";
import * as http from "@/lib/helpers/fetch";

const endpoint = "tours";

export async function getTours(page: number = 1, query: string = "") {
  return await http.getRequest<PaginationData<Tour>>(
    `${endpoint}?page=${page}&name=${query}`
  );
}

export async function getTopTours(count: number = 3) {
  return await http.getRequest<Tour[]>(`${endpoint}/${count}`);
}

export async function deleteTour(id: number) {
  const res = await http.deleteRequest(`${endpoint}/${id}`);

  if (res.success) {
    revalidatePath("/dashboard/tours");
  }
  return res;
}

export async function getSingleTour(id: number) {
  return await http.getRequest<Tour>(`${endpoint}/${id}`);
}

export async function addTour(data: FormData) {
  const responseData = await http.postRequest(`${endpoint}`, data);
  if (responseData.success) {
    revalidatePath("/dashboard/tours");
  }

  return responseData;
}

export async function updateTour(id: number, data: FormData) {
  const responseData = await http.patchRequest(`${endpoint}/${id}`, data);

  if (responseData.success) {
    revalidatePath("/dashboard/tours");
  }
  return responseData;
}

export async function deleteTourImage(tourId: number, mediaId: string) {
  await http.postRequest(
    `${endpoint}/delete-image/${tourId}`,
    JSON.stringify({ mediaId }),
    { "Content-Type": "application/json" }
  );
}

export async function addTourImage(tourId: number, formData: FormData) {
  await http.postRequest(`${endpoint}/add-image/${tourId}`, formData);
  revalidatePath(`/dashboard/tours/${tourId}`);
}
