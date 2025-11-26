"use client";
import React from "react";
import Link from "next/link";
import Clock from "../custom/Clock";
import RoleSwitcher from "../custom/RoleSwitcher";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { label: "Monitoring", href: "/monitoring" },
    { label: "Machine", href: "/machine" },
    { label: "Widgets", href: "/widgets" },
  ];

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-[1536px] mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* left: brand + mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen((s) => !s)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden mr-1 inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
            >
              {/* hamburger / X */}
              <span className="sr-only">Toggle navigation</span>
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Brand */}
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/VE_Logo.png"
                alt="Logo"
                className="h-8 w-auto rounded-md"
              />
            </Link>
          </div>

          {/* center: desktop nav */}
          <nav className="hidden md:flex items-center gap-4">
            {menuItems.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                {m.label}
              </Link>
            ))}
          </nav>

          {/* right: widgets */}
          <div className="items-center gap-2 hidden md:flex">
            <div>
              <Clock />
            </div>
            <div>
              <RoleSwitcher />
            </div>
          </div>
        </div>

        {/* Mobile Menu: slide down */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!isMenuOpen}
        >
          <div className="py-3 border-t">
            <div className="flex flex-col gap-2">
              {menuItems.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-50 rounded"
                >
                  {m.label}
                </Link>
              ))}
            </div>
            {/* optional quick items under menu on mobile */}
            <div className="mt-3 px-3">
              <div className="flex items-center gap-3">
                <div className="block lg:hidden">
                  <Clock />
                </div>
                <div>
                  <RoleSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
