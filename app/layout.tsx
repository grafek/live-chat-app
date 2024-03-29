"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className="overflow-y-clip">{children}</body>
      </SessionProvider>
    </html>
  );
}
