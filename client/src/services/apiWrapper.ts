import { toast } from "sonner";

interface ApiWrapperOptions {
  skipToast?: boolean; // optional flag to skip toast
}
export async function apiWrapper<T>(fn:()=>Promise<T>, options?:ApiWrapperOptions){
    try {
      const response = await fn()
      return response;
    } catch (error) {
      if (!options?.skipToast) {
        const status = error?.response?.status;
        const message = error?.response?.data?.message || "Something went wrong";
        const handledStatus = [400, 401, 404, 500];
        if (!handledStatus.includes(status)) {
          toast.error(message);
        }
      }
      return null;
    }
  }