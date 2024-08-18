import { PhoneNumberUtil } from "google-libphonenumber";
import { TourOption } from "@/models";
import { z } from "zod";

const phoneUtil = PhoneNumberUtil.getInstance();

export const reserveSchema = z.object({
  name: z
    .string()
    .min(1, "Name cannot be empty")
    .max(50, "Max Number of Letters for Name is 50"),
  email: z.string().email("Please Add Valid email"),
  city: z
    .string()
    .min(1, "Name cannot be empty")
    .max(50, "Max Number of Letters for City is 50"),
  phone: z.string().refine((value) => {
    try {
      const parsedPhoneNumber = phoneUtil.parse(value, "");
      return phoneUtil.isValidNumber(parsedPhoneNumber);
    } catch (error) {
      return false;
    }
  }, "Please Add a valid Number like this '+20 123 456 7890'"),
  hotel_name: z
    .string()
    .min(1, "Name cannot be empty")
    .max(50, "Max Number of Letters for Name is 50"),
  room_uid: z.string(),
  options: z.array(z.custom<TourOption>()).optional(),
  num_people: z.coerce
    .number()
    .int("number of people must be an integer")
    .min(1, "number of people cannot be less than 1"),
  payment_method_id: z
    .string()
    .min(1, { message: "Please choose a payment method" }),
});

export type reserveFormData = z.infer<typeof reserveSchema>;
