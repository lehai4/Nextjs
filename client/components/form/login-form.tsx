"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import authApiRequest from "@/apiRequest/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginBodyType) {
    try {
      const res = await authApiRequest.login(values);
      toast({
        title: "Success",
        description: res.payload.message,
      });

      await authApiRequest.auth({ sessionToken: res.payload.data.token });
      // setSessionToken(res.payload.data.token);
      // clientSessionToken.value = res.payload.data.token;
      router.push("/me");
    } catch (err: any) {
      const errors = err.payload.errors as {
        field: string;
        message: string;
      }[];

      const status = err.status as number;
      if (status === 422) {
        errors.forEach((error) => {
          form.setError(error.field as "email" | "password", {
            type: "server",
            message: error.message,
          });
        });
        toast({
          title: "Error",
          description: err.payload.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: err.payload.message,
          variant: "destructive",
        });
      }
    }
  }

  function onError(error: any) {
    console.log(error);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-2 max-w-[600px] w-full"
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="!mt-[20px] w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
