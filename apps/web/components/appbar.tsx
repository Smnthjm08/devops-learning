"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WalletLoginButton } from "./WalletLoginButton";
import { useState } from "react";
import { shrinkDown } from "@/lib/utils";
import { ConnectWallet } from "./connect-wallet";

export default function Appbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  console.log("Session in Appbar:", isOpen);

  const handleCopy = () => {
    if (isCopied) return;
    setIsCopied(true);
    // @ts-ignore
    navigator.clipboard.writeText(session?.user?.publicKey || "");
    setTimeout(() => setIsCopied(false), 1000);
  };

  const handleSignout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="flex items-center justify-between px-8 py-3 border-gray-500 shadow-sm z-50">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="solDonut Logo" width={30} height={30} />
        <h1 className="text-xl font-bold">solDonut</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* @ts-ignore */}
        {session?.user?.publicKey ? (
          <>
            {/* Copy wallet address button */}
            <button
              onClick={handleCopy}
              className="group inline-flex items-center gap-2 rounded-sm bg-[#1a1d2d] px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              title="Copy Public Key"
            >
              {/* @ts-ignore */}
              <span>{shrinkDown(session.user?.publicKey)}</span>
              {!isCopied ? (
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16h8M8 12h8M12 8h4m-7 8h.01M8 20h.01M16 20h.01M20 16v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </button>

            {/* Disconnect button */}
            <button
              onClick={handleSignout}
              className="group inline-flex items-center rounded-sm bg-[#1a1d2d] px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Disconnect
            </button>
          </>
        ) : (
          <>
            {/* Connect Wallet trigger */}
            <WalletLoginButton
              buttonlabel="Connect Wallet"
              address=""
              onClick={() => setIsOpen(true)} // ✅ open ConnectWallet popup
            />
          </>
        )}
      </div>

      {/* ✅ Wallet popup controlled by Appbar */}
      <ConnectWallet open={isOpen} onOpenChange={setIsOpen} />
    </header>
  );
}
