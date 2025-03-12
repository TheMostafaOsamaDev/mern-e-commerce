import { auth } from "@/auth";
import { headers } from "next/headers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { UserDropdownContent } from "../auth/UserDropdown";

export default async function UserDropdown() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between p-3 rounded-md border cursor-pointer text-sm font-medium hover:bg-secondary">
        {session?.user?.name} <ChevronDown size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[235px]">
        <UserDropdownContent />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
