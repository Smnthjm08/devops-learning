"use client";

import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";

interface ConnectWalletProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConnectWallet({ open, onOpenChange }: ConnectWalletProps) {
  const { connected } = useWallet();
  const { visible } = useWalletModal(); // 👈 Detect when wallet modal opens

  // Close when Solana wallet modal opens
  useEffect(() => {
    if (visible) {
      onOpenChange(false);
    }
  }, [visible, onOpenChange]);

  // Optional: also close when connected successfully
  useEffect(() => {
    if (connected) {
      onOpenChange(false);
    }
  }, [connected, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] h-auto">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Choose a Solana wallet to connect with solDonut.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center py-4">
          <WalletMultiButton />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
