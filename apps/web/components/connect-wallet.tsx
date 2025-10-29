"use client";

import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";

export function ConnectWallet() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();

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
        const user = await res.json();

        if (user.isOnboarded) router.push("/app");
        else router.push("/onboarding");
      } catch (err) {
        console.error("Error verifying user:", err);
      }
    };

    verifyUser();
  }, [connected, publicKey, router]);

  return (
    <div className="flex items-center">
      <WalletMultiButton />
    </div>
  );
}
