import { API_URL } from "@/constants";
import { axiosBase } from "..";

export const signUpMutationFn = async ({
  data,
  signal,
}: {
  data: SignUpType;
  signal: AbortSignal;
}) => {
  try {
    console.log({ API_URL: `${API_URL}/auth/sign-up` });
    const res = await axiosBase.post("/auth/sign-up", data, { signal });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const signInMutationFn = async ({
  data,
  signal,
}: {
  data: SignInType;
  signal: AbortSignal;
}) => {
  try {
    const res = await axiosBase.post("/auth/sign-in", data, { signal });
    return res.data;
  } catch (error) {
    throw error;
  }
};
