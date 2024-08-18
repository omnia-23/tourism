"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  LoadingSpinner,
  Checkbox,
  Input,
  Button,
} from "@/components/ui";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useReserveForm } from "./Reservation.hooks";
import { TourOption } from "@/models";
import { Payment } from "@/models/Payment";
import Image from "next/image";
import { useState } from "react";

export function ReservationForm({
  tourOptions,
  tourPrice,
  paymentMethods,
  tourId,
}: {
  tourOptions?: TourOption[];
  tourPrice: number;
  tourId: number;
  paymentMethods: Payment[];
}) {
  const { reserveForm, onSubmit, isSubmitting, isValid } =
    useReserveForm(tourId);
  const [totalPrice, setTotalPrice] = useState<string>(String(tourPrice));

  const calculateTotalPrice = () => {
    let total: number = Number(0);
    const options = reserveForm.getValues().options as TourOption[] | undefined;
    options?.forEach((item) => {
      total += Number(item.price);
    });
    total += Number(tourPrice);
    setTotalPrice(total.toFixed(2));
  };

  return (
    <Form {...reserveForm}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center"
      >
        <div className="lg:w-3/4 w-full space-y-4">
          <FormField
            control={reserveForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Name</FormLabel>
                  <span className="text-sm text-red-600 mx-1">*</span>
                </div>
                <FormControl>
                  <Input required placeholder="Enter your Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex">
            <div className="flex-1 mr-4">
              <FormField
                control={reserveForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Email</FormLabel>
                      <span className="text-sm text-red-600 mx-1">*</span>
                    </div>
                    <FormControl>
                      <Input
                        required
                        placeholder="Enter your Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={reserveForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>phone</FormLabel>
                      <span className="text-sm text-red-600 mx-1">*</span>
                    </div>
                    <FormControl>
                      <Input
                        required
                        placeholder="Enter your phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={reserveForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>city</FormLabel>
                  <span className="text-sm text-red-600 mx-1">*</span>
                </div>
                <FormControl>
                  <Input required placeholder="Enter your City" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex">
            <div className="flex-1 mr-4">
              <FormField
                control={reserveForm.control}
                name="hotel_name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Hotel Name</FormLabel>
                      <span className="text-sm text-red-600 mx-1">*</span>
                    </div>
                    <FormControl>
                      <Input
                        required
                        placeholder="Enter your Hotel Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={reserveForm.control}
                name="room_uid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Number</FormLabel>
                    <span className="text-sm text-red-600 mx-1">*</span>
                    <FormControl>
                      <Input placeholder="Enter your Room Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={reserveForm.control}
            name="num_people"
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel>no. of people </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter no. of people"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {tourOptions && (
            <FormField
              control={reserveForm.control}
              name="options"
              render={({ field }) => (
                <FormItem className="mb-4 my-2">
                  <FormLabel>Select options you want</FormLabel>
                  {tourOptions?.map((item, index) => (
                    <div key={index} className="flex flex-row">
                      <FormControl>
                        <Checkbox
                          className="my-2"
                          checked={(field.value as TourOption[]).some(
                            (obj) => obj.name === item.name
                          )}
                          onCheckedChange={(checked) => {
                            let result = checked
                              ? field.onChange([
                                  ...(field.value as TourOption[]),
                                  item,
                                ])
                              : field.onChange(
                                  (field.value as TourOption[]).filter(
                                    (value) => value.name !== item.name
                                  )
                                );
                            calculateTotalPrice();
                            return result;
                          }}
                        />
                      </FormControl>
                      <div className="mx-2">
                        <FormLabel className="text-base">{item.name}</FormLabel>
                        <FormDescription className="font-base">
                          extra price: {item.price} $
                        </FormDescription>
                      </div>
                    </div>
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {paymentMethods.length > 0 && (
            <FormField
              control={reserveForm.control}
              name="payment_method_id"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>Payment Methods</FormLabel>
                  <span className="text-sm text-red-600 mx-1">*</span>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex flex-col space-y-1"
                    >
                      {paymentMethods.map((item) => (
                        <FormItem key={item.paymentId}>
                          <FormControl>
                            <RadioGroupItem value={String(item.paymentId)} />
                          </FormControl>
                          <FormLabel className="font-medium mx-2">
                            {item.name_en}
                          </FormLabel>

                          <div className="block ml-10">
                            <Image
                              src={item.logo}
                              alt={item.name_en}
                              width={130}
                              height={300}
                            />
                          </div>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="text-2xl font-semibold">
            total price : {totalPrice} $
          </div>
        </div>

        <Button
          disabled={!isValid}
          className="mt-6 w-full md:w-1/2 mx-auto"
          // className="disabled:bg-gray-600 md:w-1/3 text-2xl flex justify-center items-center font-medium mx-auto mt-10 px-5 py-2 rounded-md text-white bg-secondary-foreground transition duration-300 ease-in-out hover:bg-secondary"
          type="submit"
        >
          {!isSubmitting ? (
            "Continue"
          ) : (
            <LoadingSpinner className="size-7 mx-4" />
          )}
        </Button>
      </form>
    </Form>
  );
}
