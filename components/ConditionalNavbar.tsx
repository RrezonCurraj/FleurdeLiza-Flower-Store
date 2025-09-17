"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Only show navbar on home page
  if (pathname === "/") {
    return <Navbar />;
  }

  // Don't render anything on other pages
  return null;
}
