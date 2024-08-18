"use server";

import { API_URL } from "@/constants/api";
import { ApiResponse, UserLogin } from "@/models";
import { LoginFormData } from "./loginform.schema";
import { cookies } from "next/headers";

export async function login(data: LoginFormData) {
  const response = await fetch(`${API_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData: ApiResponse<UserLogin> = await response.json();

  if (responseData.success) {
    cookies().set("token", responseData.data?.token!);
  }

  return responseData;
}
