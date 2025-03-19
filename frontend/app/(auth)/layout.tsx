import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container h-[85vh] grid place-items-center">{children}</div>
  );
}
