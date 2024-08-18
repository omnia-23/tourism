import { ApiResponse } from "@/models";
import { toast } from "sonner";

export function toastResponse(res: ApiResponse<unknown>, message: string) {
  if (res.success) {
    toast.success(message);
  } else {
    toast.error(res.errors);
  }
}
