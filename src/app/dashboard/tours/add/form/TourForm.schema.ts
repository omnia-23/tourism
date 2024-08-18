import { z } from "zod";

export const tourSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
  location: z.string().min(1, "Location cannot be empty"),
  duration: z.string().min(1, "Duration cannot be empty"),
  price: z.coerce
    .number({ invalid_type_error: "Please enter a valid number" })
    .int("Price must be an integer")
    .min(1, "Price cannot be less than 1"),
  /**
   * this feild is set to an array of objects instead of an array of strings
   * because the useFieldArray hook in react-hook-form expects an array of objects
   * and it cannot work with flat arrays e.g. arrays of numbers, strings ...etc
   *
   * I used an array of objects because it is easier to work with useFieldArray
   * than it is to manage an array of strings on my own :)
   *
   * I will have to transform the array of objects to an array of strings
   * before sending the requests to the server
   * - Eyad
   */

  includes: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
  excludes: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
  options: z
    .array(
      z.object({
        name: z.string().min(1, "Option name cannot be empty"),
        price: z.coerce.number().min(1, "Price cannot be less than 1"),
      })
    )
    .optional(),
  media: z
    .array(
      z.object({
        file: z.instanceof(File).or(
          z.object({
            url: z.string(),
            id: z.number(),
          })
        ),
      })
    )
    .optional(),
});

export type tourFormData = z.infer<typeof tourSchema>;
