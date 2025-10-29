// apps/web/components/connect-wallet.tsx
"use client";

import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import { checkUserByPublicKey } from "@/actions/user";
import Link from "next/link";
import Image from "next/image";
import { ConnectWallet } from "./connect-wallet";

export default function Appbar() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      if (!connected || !publicKey) return;

      try {
        const user = await checkUserByPublicKey(publicKey.toString());

        if (user?.isOnboarded) router.push("/app");
        else router.push("/onboarding");
      } catch (err) {
        console.error("Error verifying user:", err);
      }
    };

    verifyUser();
  }, [connected, publicKey, router]);

  return (
    <header className="flex items-center justify-between px-8 py-3 border-gray-500 h-16 shadow-sm">
      <Link
        href="/app"
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <Image src="/logo.svg" alt="solDonut Logo" width={30} height={30} />
        <h1 className="text-xl font-bold">solDonut</h1>
      </Link>

      <div className="flex items-center space-x-4">
        <ConnectWallet />
      </div>
    </header>
  );
}
