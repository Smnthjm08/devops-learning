"use client";

import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import { checkUserByPublicKey } from "@/actions/user";

export function ConnectWallet() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      if (!connected || !publicKey) return;

      try {
        const user = await checkUserByPublicKey(publicKey.toString());
        if (!user) return;

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

  return (
    <div className="flex items-center">
      <WalletMultiButton />
    </div>
  );
}
