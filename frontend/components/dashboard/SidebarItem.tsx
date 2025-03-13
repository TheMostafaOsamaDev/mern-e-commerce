import { sidebarItems } from "@/constants";
import React from "react";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import {
  CollapsibleTrigger,
  Collapsible,
  CollapsibleContent,
} from "../ui/collapsible";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SidebarItem({
  item,
}: {
  item: (typeof sidebarItems)[0];
}) {
  let content;

  if (item.isCollapsible) {
    content = (
      <Collapsible
        asChild
        className="group/collapsible"
        defaultOpen={item.isActive}
      >
        <SidebarMenuItem className="list-none">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items?.map((subItem, index) => (
                <SidebarMenuSubItem key={subItem.href}>
                  <SidebarMenuSubButton asChild>
                    <Link href={subItem.href}>
                      {subItem.icon && <subItem.icon />}
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return content;
}
