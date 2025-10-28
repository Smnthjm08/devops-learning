"use client";

import Image from "next/image";
import { ConnectWallet } from "./connect-wallet";

export default function Appbar() {
  return (
    <header className="flex items-center justify-between px-8 py-3 border-gray-500 shadow-sm z-50">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="solDonut Logo" width={30} height={30} />
        <h1 className="text-xl font-bold">solDonut</h1>
      </div>

      <div className="flex items-center space-x-4">
        <ConnectWallet />
      </div>
    </header>
  );
}
