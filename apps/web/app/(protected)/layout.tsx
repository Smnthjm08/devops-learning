"use client";

import type React from "react";

import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { publicKey, connected } = useWallet();
  const router = useRouter();

  if (!connected || !publicKey) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8">
        <h2 className="text-4xl font-bold">🔐 Connect your wallet</h2>
        <p className="text-muted-foreground text-2xl">
          Please connect your wallet to access this page.
        </p>

        <Button onClick={() => router.push("/")} className="mt-8">
          Home
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
