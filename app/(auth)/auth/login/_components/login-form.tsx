"use client";
import { FC, useState } from "react";
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
import { DEFAULT_REDIRECT_URL } from "@/routes";

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
  const [isPending, setIsPending] = useState(false);
  const [isTwoFactor, setIsTwoFactor] = useState(false);

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: loginSchemaType) => {
    setIsPending(true);
    try {
      const res = await loginAction(values);
      ToastEmitter(res);
      if (res?.success) {
        window.location.href = DEFAULT_REDIRECT_URL;
      }
    } catch (error) {
      console.log(error, "[ERROR_FROM_LOGIN_FORM]");
    } finally {
      setIsPending(false);
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
          {isTwoFactor ? (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Two Factor Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="code"
                      placeholder="12345"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <>
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
            </>
          )}
          <Button disabled={isPending} className="w-full" type="submit">
            {isTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
