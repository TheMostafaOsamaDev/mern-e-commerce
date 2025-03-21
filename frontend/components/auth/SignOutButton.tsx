"use client";

import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "sonner";

export default function SignOutButton() {
  const handleSignOut = async () => {
    try {
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
