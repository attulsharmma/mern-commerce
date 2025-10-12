import { toast } from "sonner";

export interface ApiWrapperOptions {
  skipToast?: boolean;   
}

export async function apiWrapper<T>(fn: () => Promise<T>, options?: ApiWrapperOptions) {
  try {
    const response = await fn(); // await the promise
    return response;
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    if(!options?.skipToast){
      toast.error(message);
    }
    return null;
  }
}
