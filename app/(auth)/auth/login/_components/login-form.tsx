"use client";
import { FC, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CardWrapper } from "@/components/shared/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, loginSchemaType } from "@/schema/zod-schema";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/app/action/login";
import { ToastEmitter } from "@/lib/toast-emitter";

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
  const [isPending, setIsPending] = useTransition();

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: loginSchemaType) => {
    try {
      setIsPending(async () => {
        const res = await loginAction(values);
        ToastEmitter(res);
        console.log(values);
      });
    } catch (error) {
      console.log(error, "[ERROR_FROM_LOGIN_FORM]");
    }
  };

  return (
    <CardWrapper
      title="Login 🔒"
      description="Sign in with your credentials."
      backButtonHref="/auth/register"
      backButtonLabel="Dont have an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="email"
                    placeholder="john.doe@example.com"
                    {...field}
                  />
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
                  <Input
                    disabled={isPending}
                    type="password"
                    placeholder="*****"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
