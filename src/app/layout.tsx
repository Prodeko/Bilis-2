import type { Metadata } from "next";
import type { ReactNode } from "react";

import Sidebar from "@ui/Sidebar";

import { getCurrentSeason } from "@server/db/seasons";

import "../styles/globals.css";

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Biliskilke 2.0",
};

export default async function RootLayout({ children }: Props) {
  const currentSeason = await getCurrentSeason().then((s) => s?.toJSON());
  return (
    <html lang="en">
      <body className="grid grid-cols-[auto_minmax(0,_1fr)]">
        <Sidebar currentSeason={currentSeason} />
        <main className="h-screen bg-gradient-to-tr from-primary-900 to-slate-500">
          {children}
        </main>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
