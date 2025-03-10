import { AxiosError } from "axios";
import { ErrorContext } from "better-auth/react";

export const formatAxiosError = (error: AxiosError<any>): any => {
  let finalMessage = "";
  const res =
    error.response?.data?.message || error.response?.data || error.message;

  console.log(`~~~~~~~ ERROR ~~~~~~~`);
  console.log(res);

  if (typeof res === "string") {
    finalMessage = res;
  } else if (typeof res?.data?.message === "string") {
    finalMessage = res.data.message;
  } else if (typeof res.data === "string") {
    finalMessage = res.response.data;
  } else if (typeof res.message === "string") {
    finalMessage = res.message;
  } else if (Array.isArray(res.message)) {
    finalMessage = res.message.join(", ");
  } else if (error.status) {
    finalMessage = `Error occurred with status code: ${error.status}`;
  } else {
    finalMessage = "An error occurred";
  }

  return finalMessage;
};

import { toast } from "sonner";

export const tanstackGlobalErrorHandler = (error: AxiosError) => {
  const axiosError = formatAxiosError(error as AxiosError);

  toast.error(axiosError || "An error occurred");
};

export const betterAuthGlobalErrorHandler = (ctx: ErrorContext) => {
  toast.error(ctx.error?.message || "An error occurred");
};
