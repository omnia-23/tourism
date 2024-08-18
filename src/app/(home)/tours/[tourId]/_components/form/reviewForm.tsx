"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
  Textarea,
  Button,
  LoadingSpinner,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ReviewFormData, reviewSchema } from "./reservationFrom.schema";
import { FaStar } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { addReview } from "@/lib/actions/reviews.actions";
import { toast } from "sonner";

export function ReviewForm({ tour_id }: { tour_id: number }) {
  const reviewForm = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  });

  const [hoverIndex, setHoverIndex] = useState(0);

  const onSubmit = reviewForm.handleSubmit(async (data) => {
    const res = await addReview({ ...data, tour_id, deleted_at: null });
    if (res.success) toast.success("Thank you for your review");
    else toast.error(res.message);
  });

  return (
    <Form {...reviewForm}>
      <form onSubmit={onSubmit}>
        <FormField
          control={reviewForm.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mt-4 grid grid-cols-3 items-start">
              <div className="flex items-center">
                <FormLabel>Title</FormLabel>
                <span className="text-sm text-red-600 mx-1">*</span>
              </div>
              <div className="col-span-2 space-y-3">
                <FormControl>
                  <Input required placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={reviewForm.control}
          name="body"
          render={({ field }) => (
            <FormItem className="mt-4 grid grid-cols-3 items-start">
              <div className="flex items-center">
                <FormLabel>Message</FormLabel>
                <span className="text-sm text-red-600 mx-1">*</span>
              </div>
              <div className="col-span-2 space-y-3">
                <FormControl>
                  <Textarea required placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={reviewForm.control}
          name="stars"
          render={({ field }) => {
            return (
              <FormItem className="mt-4 grid grid-cols-3 items-start">
                <div className="flex items-center">
                  <FormLabel>stars</FormLabel>
                  <span className="text-sm text-red-600 mx-1">*</span>
                </div>

                <FormControl>
                  <div className="flex gap-2 text-2xl">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={cn(
                          "cursor-pointer hover:scale-125 transition-all",
                          (Number(field.value) ?? 0) >= i + 1 ||
                            hoverIndex >= i + 1
                            ? "text-yellow-500"
                            : "text-gray-300"
                        )}
                        size={24}
                        onMouseEnter={() => setHoverIndex(i + 1)}
                        onMouseLeave={() => setHoverIndex(0)}
                        onClick={() => {
                          field.onChange(i + 1);
                        }}
                      />
                    ))}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="w-full flex">
          <Button
            disabled={!reviewForm.formState.isValid}
            type="submit"
            className="ml-auto"
          >
            {reviewForm.formState.isSubmitting ? <LoadingSpinner /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
