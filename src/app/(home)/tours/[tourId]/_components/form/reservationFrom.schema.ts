import { z } from "zod";

export const reviewSchema = z.object({
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .max(50, "Max Number of Letters for title is 50"),
  body: z
    .string()
    .min(1, "Message cannot be empty")
    .max(500, "Max Number of Letters for Message is 500"),
  stars: z
    .number({ required_error: "Stars cannot be empty" })
    .min(1, "Stars cannot be empty")
    .max(5, "Stars cannot be more than 5"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
