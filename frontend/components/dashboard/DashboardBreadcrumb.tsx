"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function DashboardBreadcrumb() {
  const pathname = usePathname();

  // /dashboard/products/add
  const breadcrumbPaths: { path: string; name: string }[] = [];
  pathname
    .slice(1)
    .split("/")
    .reduce((prev, curr) => {
      if (curr === "dashboard") return "";
      const path = prev ? `${prev}/${curr}` : `dashboard/${curr}`;
      breadcrumbPaths.push({ path, name: curr });
      return path;
    }, "");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Shop</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {breadcrumbPaths.map((item, index) => (
          <React.Fragment key={item.path}>
            <BreadcrumbItem>
              {/* <BreadcrumbLink href={`/${item.path}`}>
                
              </BreadcrumbLink> */}
              <Link href={`/${item.path}`} className="hover:text-primary">
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Link>
            </BreadcrumbItem>
            {index < breadcrumbPaths.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
