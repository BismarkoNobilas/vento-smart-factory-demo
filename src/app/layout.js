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
import Clock from "@/components/Clock";
import RoleSwitcher from "@/components/RoleSwitcher";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <AppProvider>
          <SidebarProvider>
            <div className="flex flex-col h-screen w-full">
              {/* Top Navbar */}
              <div className="h-16 p-2 flex items-center justify-end-safe border-b bg-white w-full">
                <div className="flex items-center gap-6 text-sm font-mono">
                  <Clock />
                  <RoleSwitcher />
                </div>
              </div>

              {/* Sidebar + Content */}
              <div className="grid grid-cols-[180px_auto]">
                <Sidebar className="w-45 border-r">
                  <SidebarContent>
                    <SidebarHeader>
                      <div className="flex items-center gap-3">
                        <img
                          src="/VE_Logo.png"
                          alt="Logo"
                          className="rounded-lg h-auto w-auto"
                        />
                      </div>
                    </SidebarHeader>
                    <SidebarGroup>
                      <SidebarGroupLabel>Menu</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <Link href="/">
                              <SidebarMenuButton asChild>
                                <span>Home</span>
                              </SidebarMenuButton>
                            </Link>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <Link href="/dashboard">
                              <SidebarMenuButton asChild>
                                <span>Dashboard</span>
                              </SidebarMenuButton>
                            </Link>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <Link href="/machine">
                              <SidebarMenuButton asChild>
                                <span>Machine</span>
                              </SidebarMenuButton>
                            </Link>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <Link href="/monitor">
                              <SidebarMenuButton asChild>
                                <span>Monitoring</span>
                              </SidebarMenuButton>
                            </Link>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>
                </Sidebar>
                {children}
              </div>
            </div>
          </SidebarProvider>
        </AppProvider>
      </body>
    </html>
  );
}
