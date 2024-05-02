import { toast } from "sonner";

export const ToastEmitter = (res: { error?: string; success?: string }) => {
  if (res?.error) {
    return toast.error(res?.error);
  }
  return toast.success(res?.success);
};
