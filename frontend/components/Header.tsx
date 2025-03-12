import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchInput from "./ui/search-input";
import { Button } from "./ui/button";
import {
  ChartColumnStacked,
  CircleAlert,
  LogIn,
  ShoppingBasket,
  UserPlus,
} from "lucide-react";
import { auth } from "@/auth";
import { headers } from "next/headers";
import UserDropdown from "./auth/UserDropdown";

export default async function Header() {
  // If dashboard don't show the header
  const headersList = await headers();
  const path = headersList.get("x-url") || headersList.get("referer");
  const url = new URL(path?.toString() || "", "http://localhost:3000");
  if (url.pathname === "/dashboard") {
    return null;
  }

  // Content
  let content;

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      content = (
        <>
          <Button asChild>
            <Link href={"/sign-up"}>
              <UserPlus /> Sign up
            </Link>
          </Button>
          <Button asChild variant={"outline"}>
            <Link href={"/sign-in"}>
              <LogIn /> Sign in
            </Link>
          </Button>
        </>
      );
    } else {
      content = (
        <>
          <UserDropdown />

          {session.user.isAdmin ? (
            <Button asChild>
              <Link href={"/dashboard"}>
                <ChartColumnStacked /> Dashboard
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={"/cart"}>
                <ShoppingBasket /> Cart
              </Link>
            </Button>
          )}
        </>
      );
    }
  } catch (error) {
    content = (
      <Button variant={"secondary"} disabled>
        <CircleAlert />
      </Button>
    );
  }

  return (
    <header className="container py-2">
      <div className="flex items-center justify-between gap-4 border-b">
        <Link href={"/"} className="block w-24 h-14 overflow-hidden ">
          <Image
            src={"/images/logo.png"}
            width={500}
            height={500}
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </Link>

        <SearchInput />

        {content}
      </div>
    </header>
  );
}
