"use server";

import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
};

export const updateProfile = async (formData: FormData) => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  if (firstName && lastName) {
    await auth.api.updateUser({
      headers: await headers(),
      body: {
        firstName: firstName,
        lastName: lastName,
        name: `${firstName} ${lastName}`,
      },
    });

    return redirect("/");
  }
};
