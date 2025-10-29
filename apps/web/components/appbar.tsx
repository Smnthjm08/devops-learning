"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const ConnectWallet = dynamic(
  () => import("./connect-wallet").then((mod) => mod.ConnectWallet),
  { ssr: false },
);

export default function Appbar() {
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
