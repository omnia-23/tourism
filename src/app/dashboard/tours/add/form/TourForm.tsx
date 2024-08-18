"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  LoadingSpinner,
  Button,
  Textarea,
} from "@/components/ui";
import { Tour } from "@/models";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { IoMdCloseCircle, IoMdClose } from "react-icons/io";
import { useTourForm } from "./TourForm.hooks";
import { addTourImage, deleteTourImage } from "@/lib/actions/tour.actions";

export const TourForm = ({ tourData }: { tourData?: Tour }) => {
  const { form, onSubmit, options, excludes, includes, media, add } =
    useTourForm(tourData);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    onDrop: async (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      if (tourData) {
        for (const file of acceptedFiles) {
          const formData = new FormData();
          formData.append("media", file);
          const res = await addTourImage(tourData.id, formData);
          console.log(res);
        }
      }
      media.append(
        acceptedFiles.map((file) => ({
          file,
        }))
      );
    },
    multiple: true,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="mx-10 my-6 px-4 py-6 space-y-4 bg-white rounded-lg shadow-md"
      >
        <div
          {...getRootProps({
            className: `cursor-pointer bg-blue-100 p-2 rounded-md h-16 text-center 
                  flex justify-center items-center text-gray-700 transition-all
                  ${isDragActive ? "border-2" : ""}

                  `,
          })}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Release to Drop ...</p>
          ) : (
            <p className="text-neutral-400">
              <span className="text-gray-800">drag and drop</span> some images
              here
              <br />
              or <span className="text-gray-800">click</span> to select images
            </p>
          )}
        </div>
        {!!media.fields.length && (
          <div
            className={`flex gap-2 justify-start items-center overflow-x-auto bg-neutral-200 rounded-md px-2 py-4`}
          >
            {media.fields.map((image, index) => (
              <ImagePreview
                key={image.id}
                image={image.file instanceof File ? image.file : image.file.url}
                remove={async () => {
                  media.remove(index);
                  if (!(image.file instanceof File)) {
                    await deleteTourImage(tourData!.id, String(image.file.id));
                  }
                }}
              />
            ))}
          </div>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tour Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter tour name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tour description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter tour description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tour Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter tour location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tour Duration</FormLabel>
              <FormControl>
                <Input placeholder="Enter tour duration" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tour Price</FormLabel>
              <FormControl>
                <Input
                  min={1}
                  type="number"
                  placeholder="Enter tour price"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* includes */}
        <div className="flex flex-col ">
          <FormLabel className="">Include list</FormLabel>
          <div className="my-4 space-y-4">
            {includes.fields.map((field, index) => (
              <div key={field.id} className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name={`includes.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="button" onClick={() => includes.remove(index)}>
                  <IoMdClose size={20} />
                </Button>
              </div>
            ))}
            {form.formState.errors.includes && (
              <p className="text-red-500">
                {form.formState.errors.includes.message}
              </p>
            )}
          </div>

          <Button
            onClick={() =>
              add(
                includes,
                "includes",
                (item) => item?.value === "",
                "Include name cannot be empty",
                { value: "" }
              )
            }
            type="button"
            variant={"outline"}
            className="w-32"
          >
            + add item
          </Button>
        </div>
        {/* end of includes */}
        {/* excludes */}
        <div className="flex flex-col ">
          <FormLabel className="">Exclude list</FormLabel>
          <div className="my-4 space-y-4">
            {excludes.fields.map((field, index) => (
              <div key={field.id} className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name={`excludes.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="button" onClick={() => excludes.remove(index)}>
                  <IoMdClose size={20} />
                </Button>
              </div>
            ))}
            {form.formState.errors.excludes && (
              <p className="text-red-500">
                {form.formState.errors.excludes.message}
              </p>
            )}
          </div>
          <Button
            onClick={() =>
              add(
                excludes,
                "excludes",
                (item) => item?.value === "",
                "Excludes name cannot be empty",
                { value: "" }
              )
            }
            type="button"
            variant={"outline"}
            className="w-32"
          >
            + add item
          </Button>
        </div>
        {/* options */}
        <div className="flex flex-col ">
          <FormLabel className="">Options</FormLabel>
          <div className="my-4 space-y-4">
            {options.fields.map((field, index) => (
              <div key={field.id} className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name={`options.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`options.${index}.price`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="button" onClick={() => options.remove(index)}>
                  <IoMdClose size={20} />
                </Button>
              </div>
            ))}
            {form.formState.errors.options && (
              <p className="text-red-500">
                {form.formState.errors.options.message}
              </p>
            )}
          </div>

          <Button
            onClick={() =>
              add(
                options,
                "options",
                (item) => item?.name === "",
                "Option name cannot be empty",
                { name: "", price: 0 }
              )
            }
            type="button"
            variant={"outline"}
            className="w-32"
          >
            + add option
          </Button>
        </div>
        {/* end of options */}
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full"
        >
          {form.formState.isSubmitting && <LoadingSpinner />}
          {tourData ? "Update" : "Add"} tour
        </Button>{" "}
      </form>
    </Form>
  );
};

const ImagePreview = ({
  image,
  remove,
}: {
  image: File | string;
  remove: () => void;
}) => {
  const url = typeof image === "string" ? image : URL.createObjectURL(image);
  return (
    <div className="relative">
      <span onClick={remove} className="absolute top-0 right-0 cursor-pointer">
        <IoMdCloseCircle color="red" />
      </span>
      <Image src={url} alt="image" width={100} height={100} />
    </div>
  );
};
