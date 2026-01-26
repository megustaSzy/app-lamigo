"use client";

import NavBar from "../app/components/NavBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />

      {/* offset karena navbar fixed */}
      <main className="pt-16">{children}</main>
    </>
  );
}
