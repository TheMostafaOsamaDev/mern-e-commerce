import { ChartPie, Package, PackagePlus, ScrollText } from "lucide-react";

// Variables that are used throughout the application
export const DB_HOST = process.env.DB_HOST!;
export const DB_PORT = parseInt(process.env.DB_PORT!);
export const DB_USER = process.env.DB_USER!;
export const DB_PASS = process.env.DB_PASS!;
export const DB_NAME = process.env.DB_NAME!;

export const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// Sidebar Items

export const sidebarItems = [
  {
    icon: Package,
    title: "Product",
    isCollapsible: true,
    isActive: true,
    items: [
      {
        icon: PackagePlus,
        title: "Add",
        href: "/dashboard/products/add",
      },
      {
        icon: ChartPie,
        title: "Statistics",
        href: "/dashboard/products/statistics",
      },
      {
        icon: ScrollText,
        title: "All products",
        href: "/dashboard/products",
      },
    ],
  },
];
