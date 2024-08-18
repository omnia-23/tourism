"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  LoadingSpinner,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { LoginFormData, loginFormSchema } from "./loginform.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "./loginForm.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const LoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const router = useRouter();

  const onSubmit = form.handleSubmit(async (data) => {
    const userData = await login(data);
    if (userData.success) {
      toast.success("Login Successful");
      router.push("/dashboard/tours");
    } else {
      form.setError("root", {
        type: "custom",
        message: "user name or password is incorrect",
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {form.formState.errors.root && (
          <p className=" text-sm font-medium text-red-500 dark:text-red-900 w-full text-center  p-2 rounded-md">
            {form.formState.errors.root.message}
          </p>
        )}
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-28 mt-10"
        >
          {form.formState.isSubmitting && <LoadingSpinner />}
          Login
        </Button>
      </form>
    </Form>
  );
};
