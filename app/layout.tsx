import React from "react";
import type { Metadata } from "next";
import ToasterClient from "@/components/toast/ToasterClient";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Modal } from "@/components/modal/Modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Modal />
        <ToasterClient />
        {children}
      </body>
    </html>
  );
}
