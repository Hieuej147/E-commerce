import type { Metadata } from "next";
import { Anton, Noto_Serif, Space_Grotesk, Space_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { HomeLayout } from "@/modules/home/components/layouts/home-layout";
import { AppProviders } from "./providers";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Field Protocol Store",
  description: "High-performance engineered tactical wear and modular hardware systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${anton.variable} ${notoSerif.variable} ${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
      >
        <body className="min-h-full bg-surface text-on-surface font-body-md text-body-md antialiased selection:bg-secondary-container selection:text-on-secondary-container overflow-x-hidden">
          <AppProviders>
            <HomeLayout>{children}</HomeLayout>
          </AppProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
