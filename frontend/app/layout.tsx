import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/Header";
import Providers from "@/components/providers/providers";

const montserratFont = localFont({
  src: "./../font/Montserrat/static/Montserrat-Medium.ttf",
});

export const metadata: Metadata = {
  title: "Shoop!",
  description: "Shoop! is a platform for buying and selling products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserratFont.className} antialiased`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
