"use client";

import { useState, useTransition } from "react";
import { UserProfileForm } from "@/components/user-profile-form";
import { UserSocialsForm } from "@/components/user-social-form";
import { completeOnboarding } from "@/actions/onboarding";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

export default function OnboardPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [isPending, startTransition] = useTransition();
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    github: "",
    twitter: "",
    discord: "",
    website: "",
  });

  const handleProfileNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleSocialsFinish = async (data: any) => {
    const fullData = { ...formData, ...data, publicKey: publicKey?.toBase58() };

    startTransition(async () => {
      const res = await completeOnboarding(fullData);
      if (res.success) {
        router.push("/app");
      } else {
        alert("Error: " + res.message);
      }
    });
  };

  if (connection && publicKey) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {step === 1 && <UserProfileForm onNext={handleProfileNext} />}
          {step === 2 && (
            <UserSocialsForm
              onBack={() => setStep(1)}
              onFinish={handleSocialsFinish}
              loading={isPending}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-lg text-center space-y-4">
        <h2 className="text-2xl font-semibold">Connect your wallet</h2>
        <p className="text-muted-foreground">
          Please connect your Solana wallet to start the onboarding process.
        </p>
      </div>
    </div>
  );
}
