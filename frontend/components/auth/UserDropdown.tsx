import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisVertical, User } from "lucide-react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary" className="px-4 cursor-pointer">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <UserDropdownContent />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const UserDropdownContent = () => {
  return (
    <>
      <DropdownMenuItem asChild>
        <Link href={"/profile"}>
          <User /> Profile
        </Link>
      </DropdownMenuItem>

      <SignOutButton />
    </>
  );
};
