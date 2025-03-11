import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) return redirect("/");

  return (
    <div className="container h-[85vh] grid place-items-center">{children}</div>
  );
}
