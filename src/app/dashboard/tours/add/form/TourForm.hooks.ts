import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldArrayPath,
  UseFieldArrayReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { tourFormData, tourSchema } from "./TourForm.schema";
import { Tour } from "@/models";
import { toast } from "sonner";
import { addTour, updateTour } from "@/lib/actions/tour.actions";

type ItemType<T extends any[]> = T extends (infer U)[]
  ? U
  : T extends undefined
  ? never
  : never;

export const useTourForm = (tourData?: Tour) => {
  const router = useRouter();

  const form = useForm<tourFormData>({
    resolver: zodResolver(tourSchema),

    values: tourData
      ? {
          ...tourData,
          includes: tourData?.includes?.map((value) => ({ value })),
          excludes: tourData?.excludes?.map((value) => ({ value })),
          media: tourData?.media?.map(({ original_url, id }) => ({
            file: { url: original_url, id },
          })),
        }
      : undefined,

    // TODO: make this work with images
    // values: tourData
    //   ? {
    //       ...tourData,
    //       includes: tourData?.includes?.map((value) => ({ value })),
    //       excludes: tourData?.excludes?.map((value) => ({ value })),
    //     }
    //   : undefined,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    let result;

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "media") {
        if (tourData) return;
        data.media?.forEach((value, index) => {
          if (value.file instanceof File) {
            formData.append(`${key}[${index}]`, value.file);
          } else {
            formData.append(`${key}[${index}]`, value.file.url);
          }
        });
      } else if (key === "includes" || key === "excludes") {
        data[key]?.forEach((value, index) => {
          formData.append(`${key}[${index}]`, value.value);
        });
      } else if (key === "options") {
        data.options?.forEach((option, index) => {
          formData.append(`${key}[${index}][name]`, option.name);
          formData.append(`${key}[${index}][price]`, String(option.price));
        });
      } else {
        formData.append(key, value as string);
      }
    });

    if (tourData) {
      result = await updateTour(tourData.id, formData);
    } else {
      result = await addTour(formData);
    }

    if (result.success) {
      toast.success(`Tour ${tourData ? "updated" : "added"} successfully`);
      router.push("/dashboard/tours");
    } else {
      console.log(result);
      toast.error(result.message);
    }
  });

  const media = useFieldArray({
    name: "media",
    control: form.control,
  });
  const options = useFieldArray({
    name: "options",
    control: form.control,
  });
  const includes = useFieldArray({
    name: "includes",
    control: form.control,
  });
  const excludes = useFieldArray({
    name: "excludes",
    control: form.control,
  });

  const add = <T extends FieldArrayPath<tourFormData>>(
    data: UseFieldArrayReturn<tourFormData, T>,
    name: T,
    check: (item: any) => boolean,
    message: string,
    newItem: any
  ) => {
    if (check(form.getValues(name)?.at(-1))) {
      form.setError(name, { message });
      return;
    }
    form.clearErrors(name);
    data.append(newItem);
  };

  return { form, onSubmit, media, options, includes, excludes, add };
};
