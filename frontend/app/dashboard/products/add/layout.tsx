import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Product",
  description: "Add a single product or multiple to shoop!",
};

export default function AddProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
