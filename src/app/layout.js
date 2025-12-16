import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import AppNavbar from "@/components/layout/AppNavbar";
import "@heroui/theme";
import { getInitialData } from "@/lib/getInitialData";
import ToastContainer from "@/components/custom/ToastContainer";
import AlertOverlay from "@/components/custom/AlertOverlay";

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

export default async function RootLayout({ children }) {
  const initialData = await getInitialData(); // ← IMPORTANT
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
        <AppProvider initialData={initialData}>
          <AppNavbar />
          <ToastContainer />
          <AlertOverlay />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
