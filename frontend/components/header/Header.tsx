import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import SearchInput from "../ui/search-input";
import HeaderContent from "./HeaderContent";
import { Skeleton } from "../ui/skeleton";

export default async function Header() {
  return (
    <header className="container py-2">
      <div className="flex items-center justify-between gap-4 border-b">
        <Link href={"/"} className="block w-24 h-14 overflow-hidden ">
          <Image
            src={"/images/logo.png"}
            width={500}
            height={500}
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </Link>

        <SearchInput />

        <Suspense fallback={<Skeleton className="h-9 w-28" />}>
          <HeaderContent />
        </Suspense>
      </div>
    </header>
  );
}
