import { headers } from "next/headers";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  ChartColumnStacked,
  CircleAlert,
  LogIn,
  ShoppingBasket,
  UserPlus,
} from "lucide-react";
import UserDropdown from "../auth/UserDropdown";

export default async function HeaderContent() {
  let content;

  try {
    const session = false;

    if (!session) {
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

          {false ? (
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

  return content;
}
