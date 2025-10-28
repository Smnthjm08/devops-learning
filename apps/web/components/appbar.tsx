"use client";

import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";

export default function Appbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="flex items-center justify-between px-8 py-3 border-b border-dashed border-gray-500 shadow-sm">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="solDonut Logo" width={30} height={30} />
        <h1 className="text-xl font-bold">solDonut</h1>
      </div>

      {mounted ? (
        <WalletMultiButton />
      ) : (
        <div className="w-[160px] h-[40px] bg-gray-200 rounded-lg animate-pulse" />
      )}
    </header>
  );
}
