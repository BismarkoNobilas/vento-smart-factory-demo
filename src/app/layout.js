import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppProvider } from "@/context/AppContext";
import Link from "next/link";
import Clock from "@/components/custom/Clock";
import RoleSwitcher from "@/components/custom/RoleSwitcher";
import AppNavbar from "@/components/layout/AppNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VE - Smart Factory Monitoring",
  description: "Smart Factory Monitoring",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a549c" />
        <link rel="icon" href="/Vento-Logo.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-screen overflow-x-hidden`}
      >
        <AppProvider>
          <AppNavbar />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
