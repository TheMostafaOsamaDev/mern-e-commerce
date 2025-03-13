import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "All Products",
  description: "All products available in the store.",
};

export default function AllProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
