"use client";

import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import { checkUserInDatabase } from "@/actions/user";

export function ConnectWallet() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      if (connected && publicKey) {
        const user = await checkUserInDatabase(publicKey.toString());

        if (!user) return;

        if (user.isOnboarded) router.push("/done");
        else router.push("/onboarding");
      }
    };

    verifyUser();
  }, [ publicKey]);

  return (
    <div className="flex items-center">
      <WalletMultiButton />
    </div>
  );
}
