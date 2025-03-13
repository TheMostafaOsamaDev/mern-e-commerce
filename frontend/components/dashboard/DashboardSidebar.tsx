import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import UserDropdown from "./UserDropdown";
import { sidebarItems } from "@/constants";
import SidebatItem from "./SidebarItem";

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="p-3">
        {sidebarItems.map((item, index) => (
          <SidebatItem key={index} item={item} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <UserDropdown />
      </SidebarFooter>
    </Sidebar>
  );
}
