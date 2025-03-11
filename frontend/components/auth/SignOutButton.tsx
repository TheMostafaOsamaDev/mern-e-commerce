"use client";

import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { axiosBase } from "@/lib/api";
import { toast } from "sonner";
import { signOut } from "@/actions/auth.actions";

export default function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await axiosBase.delete("/auth/sign-out");

      await signOut();

      toast.success("You have been signed out");

      window.location.reload();
    } catch (error) {
      toast.error("Sorry an error occurred, please try again later");
    }
  };

  return (
    <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
      <LogOut /> Sign out
    </DropdownMenuItem>
  );
}
