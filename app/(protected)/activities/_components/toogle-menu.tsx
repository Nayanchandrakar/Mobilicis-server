"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useSocket } from "@/app/provider/socket-provider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { userInterface } from "@/types/types";
import { twoFactorSchema, twoFactorSchemaType } from "@/schema/zod-schema";
import { useTransition } from "react";
import { twoFactorAction } from "@/app/action/twofactor";
import { ToastEmitter } from "@/lib/toast-emitter";

interface ToogleMenuProps {
  user: userInterface;
  token: string;
}

const ToogleMenu = ({ user, token }: ToogleMenuProps) => {
  const { socket } = useSocket();
  const [isPending, startTransition] = useTransition();

  const handleSocket = () => {
    if (!socket) {
      return null;
    }
    socket?.emit("logoutAll", user);
  };

  const form = useForm<twoFactorSchemaType>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      twoFactor: user?.isTwoFactorEnabled,
    },
  });

  async function onSubmit(data: twoFactorSchemaType) {
    startTransition(async () => {
      const res = await twoFactorAction(data, token);
      ToastEmitter(res);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 pt-8"
      >
        <div>
          <h3 className="mb-4 text-lg font-medium">Account settings</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="twoFactor"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Two Factor Authentication
                    </FormLabel>
                    <FormDescription>
                      Enable two factor auth for highly secure accout.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      disabled={isPending}
                      onCheckedChange={field.onChange}
                      className="ml-1 sm:ml-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="space-x-4">
          <Button disabled={isPending} type="submit">
            Submit
          </Button>
          <Button
            size="lg"
            onClick={() => handleSocket()}
            variant="destructive"
            disabled={isPending}
            type="button"
          >
            Logout from all devices
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ToogleMenu;
