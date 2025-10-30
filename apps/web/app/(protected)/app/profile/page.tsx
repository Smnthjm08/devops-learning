"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getUserProfileByPublicKey,
  updateUserProfile,
} from "@/actions/profile";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Button } from "@workspace/ui/components/button";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@workspace/ui/components/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group";
import { Github, Twitter, PiIcon, Link } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function ProfilePage() {
  const { publicKey } = useWallet();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [website, setWebsite] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function fetchProfile() {
      if (publicKey) {
        const profile = await getUserProfileByPublicKey(publicKey.toString());
        if (profile) {
          setName(profile.name);
          setUsername(profile.username);
          setBio(profile.bio);
          setEmail(profile.email);
          setGithub(profile.socials.github);
          setTwitter(profile.socials.twitter);
          setDiscord(profile.socials.discord);
          setWebsite(profile.socials.website);
        }
      }
    }
    fetchProfile();
  }, [publicKey]);

  const handleSave = () => {
    if (!publicKey) {
      toast.error("Connect your wallet first.");
      return;
    }
    startTransition(async () => {
      try {
        await updateUserProfile(publicKey.toString(), {
          name,
          username,
          bio,
          email,
          socials: { github, twitter, discord, website },
        });
        toast.success("Profile updated successfully!");
      } catch {
        toast.error("Failed to update profile");
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
    // TODO: upload file and get URL, then save in DB on save
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>

      <div className="flex flex-col items-center space-y-4">
        {imageUrl ? (
          <Image
            className="w-32 h-32 rounded-full object-cover"
            src={imageUrl}
            alt="Profile Image"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl">
            No Image
          </div>
        )}
        <button
          className="px-4 py-2 border rounded text-sm"
          onClick={() => fileInputRef.current?.click()}
        >
          Change Profile Image
        </button>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input value={name} onChange={(e)=>setName(e.target.value)} className="bg-gray-100" />
        </Field>

        <Field>
          <FieldLabel>Username</FieldLabel>
<Input value={name} disabled readOnly className="bg-gray-100" />
        </Field>

        <Field>
          <FieldLabel>Wallet Public Key</FieldLabel>
          <Input
            value={publicKey?.toString() ?? ""}
            disabled
            className="bg-gray-100 font-mono text-sm select-all"
          />
        </Field>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" value={email} disabled className="bg-gray-100" />
        </Field>
      </div>

      <Field>
        <FieldLabel>Bio</FieldLabel>
        <FieldDescription>Tell us about yourself</FieldDescription>
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <Field>
          <FieldLabel>GitHub</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <Github />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="GitHub username or URL"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel>Twitter</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <Twitter />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Twitter handle or URL"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel>Discord</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <PiIcon />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Discord ID or webhook"
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
            />
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel>Website</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <Link />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Your website URL"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </InputGroup>
        </Field>
      </div>

      <Button onClick={handleSave} disabled={isPending}>
        {isPending ? "Saving..." : "Save Profile"}
      </Button>
    </div>
  );
}
