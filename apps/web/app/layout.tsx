"use client";

import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@workspace/ui/components/sonner";
import { SolanaProviders } from "@/components/solana-providers";
import Appbar from "@/components/appbar";

import "@solana/wallet-adapter-react-ui/styles.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <SolanaProviders>
          <Providers>
            {/* Full viewport height */}
            <div className="flex flex-col max-w-[1800px] mx-auto w-full min-h-screen">
              {/* Keep Appbar normal */}
              <Appbar />

              {/* Content area — allow scrolling but no clipping */}
              <main className="flex-1 h-[calc(100vh-64px)] overflow-y-auto relative z-0">
                {children}
              </main>

              <Toaster />
            </div>
          </Providers>
        </SolanaProviders>
      </body>
    </html>
  );
}
