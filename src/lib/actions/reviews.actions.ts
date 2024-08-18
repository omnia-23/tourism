"use server";

import { ReviewFormData } from "@/app/(home)/tours/[tourId]/_components/form/reservationFrom.schema";
import * as http from "@/lib/helpers/fetch";
import { TourReview, PaginationData } from "@/models";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const endpoint = "reviews";

export async function getReviews(page: number, query: string = "") {
  return await http.getRequest<PaginationData<TourReview>>(
    `${endpoint}?page=${page}&title=${query}`
  );
}

export async function getSingleReview(id: number) {
  return await http.getRequest<TourReview>(`${endpoint}/${id}`);
}

export async function forceDeleteReview(id: number) {
  const res = await http.deleteRequest(`${endpoint}/force/${id}`);

  if (res.success) {
    revalidatePath("/dashboard/reviews");
  }
  return res;
}

export async function softDeleteReview(id: number) {
  const res = await http.deleteRequest(`${endpoint}/${id}`);

  if (res.success) {
    revalidatePath("/dashboard/reviews");
  }
  return res;
}

export async function addReview(data: Omit<TourReview, "id" | "tour">) {
  const res = await http.postRequest(`${endpoint}`, JSON.stringify(data), {
    "Content-Type": "application/json",
  });

  cookies().set(`reviewe/tour/${data.tour_id}`, "true");

  if (res.success) {
    revalidatePath("/dashboard/reviews");
    revalidatePath("/tours/[tourId]");
  }
  return res;
}

export async function updateReview(id: number, data: Omit<TourReview, "tour">) {
  const res = await http.patchRequest(
    `${endpoint}/${id}`,
    JSON.stringify(data),
    {
      "Content-Type": "application/json",
    }
  );
  if (res.success) {
    revalidatePath("/dashboard/reviews");
    revalidatePath("/tours/[tourId]");
  }
  return res;
}
