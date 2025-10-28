import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@workspace/ui/components/sonner";
import { SolanaProvider } from "@/components/solana-provider";
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
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <SolanaProvider>
          <Providers>
            <div className="flex-1 border-l border-r border-dashed  border-white min-w-[1400px] max-w-[1800px] mx-auto w-full">
              <Appbar />
              {children}
              <Toaster />
            </div>
          </Providers>
        </SolanaProvider>
      </body>
    </html>
  );
}
