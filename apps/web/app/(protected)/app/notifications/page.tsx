"use client";

import { useState, useEffect, useTransition } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  updateNotificationPreferences,
  getUserDetailsByPublicKey,
} from "@/actions/notifications";
import { Switch } from "@workspace/ui/components/switch";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@workspace/ui/components/field";
import { toast } from "sonner";

export default function NotificationsPage() {
  const { publicKey } = useWallet();

  const [email, setEmail] = useState<string>("");
  const [discord, setDiscord] = useState<string>("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [discordNotifications, setDiscordNotifications] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function fetchDetails() {
      if (publicKey) {
        const data = await getUserDetailsByPublicKey(publicKey.toString());
        if (data) {
          setEmail(data.email ?? "");
          setDiscord(data.discord ?? "");
          setEmailNotifications(data.notifications?.emailNotifications ?? true);
          setDiscordNotifications(
            data.notifications?.discordNotifications ?? false
          );
        }
      }
    }
    fetchDetails();
  }, [publicKey]);

  const handleSave = async () => {
    if (!publicKey) {
      toast.error("Connect your wallet first.");
      return;
    }
    startTransition(async () => {
      try {
        await updateNotificationPreferences(publicKey.toString(), {
          emailNotifications,
          discordNotifications,
          email,
          discord,
        });
        toast.success("Preferences updated successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to update preferences");
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      <h1 className="text-3xl font-bold mb-4">Notifications</h1>
      <div className="space-y-6">
        <Field>
          <FieldLabel>Email Notifications</FieldLabel>
          <FieldDescription>
            Toggle and set the email where you'd like to receive donation
            alerts.
          </FieldDescription>
          <div className="flex items-center justify-between mt-2">
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-4 w-2/3"
              disabled
            />
          </div>
        </Field>

        <Field>
          <FieldLabel>Discord Notifications</FieldLabel>
          <FieldDescription>
            Toggle and link your Discord account or webhook.
          </FieldDescription>
          <div className="flex items-center justify-between mt-2">
            <Switch
              checked={discordNotifications}
              onCheckedChange={setDiscordNotifications}
              disabled={discord.trim() === ""}
            />
            <Input
              placeholder="Discord webhook / ID"
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
              className="ml-4 w-2/3"
              disabled
            />
          </div>
        </Field>

        <Button onClick={handleSave} disabled={isPending} className="mt-6">
          {isPending ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
