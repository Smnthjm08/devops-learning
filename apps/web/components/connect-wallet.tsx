"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";

export function ConnectWallet() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const verifyUser = async () => {
      if (!connected || !publicKey) return;

      try {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicKey: publicKey.toString() }),
        });

        if (!res.ok) throw new Error("Failed to verify user");
        const { user } = await res.json(); // destructure properly

        console.log("Verified user:", user);

        if (user.isOnboarded) {
          router.push("/app");
        } else {
          router.push("/onboarding");
        }
      } catch (err) {
        console.error("Error verifying user:", err);
      }
    };

    verifyUser();
  }, [connected, publicKey, router]);

  if (!mounted) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <WalletMultiButton />
    </div>
  );
}
