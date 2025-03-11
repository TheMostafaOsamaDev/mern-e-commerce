"use server";

import { auth } from "@/auth";
import { headers } from "next/headers";

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
};
