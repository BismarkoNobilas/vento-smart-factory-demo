"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import Clock from "../custom/Clock";
import RoleSwitcher from "../custom/RoleSwitcher";

export default function AppNavbar() {
  return (
    <Navbar isBordered className="py-3">
      {/* Left logo / brand */}
      <NavbarBrand>
        <img src="/VE_Logo.png" alt="Logo" className="rounded-lg h-8 w-auto" />
      </NavbarBrand>

      {/* Middle navigation links */}
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Link href="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/component">Components</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/machine">Machine</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/OEE">OEE</Link>
        </NavbarItem>
      </NavbarContent>

      {/* Right side widgets */}
      <NavbarContent justify="end" className="gap-6 font-mono text-sm">
        <NavbarItem>
          <Clock />
        </NavbarItem>
        <NavbarItem>
          <RoleSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
