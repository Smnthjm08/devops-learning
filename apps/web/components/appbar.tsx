"use client";

import Link from "next/link";
import Image from "next/image";
import { ConnectWallet } from "./connect-wallet";

export default function Appbar() {
  return (
    <header className="flex items-center justify-between px-8 py-3 border-gray-500 h-16 shadow-sm">
      <Link
        href="/app"
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <Image src="/logo.svg" alt="Blink2Donate Logo" width={30} height={30} />
        <h1 className="text-xl font-bold">Blink2Donate</h1>
      </Link>

      <div className="flex items-center space-x-4">
        <ConnectWallet />
      </div>
    </header>
  );
}
