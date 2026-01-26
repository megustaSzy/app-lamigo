"use client";

import NavBar from "../app/components/NavBar";
import Footer from "../app/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
