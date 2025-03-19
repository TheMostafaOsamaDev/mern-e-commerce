import React from "react";
import { Toaster } from "../ui/sonner";
import QueryClientProvider from "./QueryClientProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
};

export default Providers;
