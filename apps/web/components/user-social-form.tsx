"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { UserSocialsData, userSocialsSchema } from "@/schemas/user";

const socialsSchema = z.object({
  github: z.string().optional(),
  twitter: z.string().optional(),
  discord: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type SocialFormData = z.infer<typeof socialsSchema>;

export function UserSocialsForm({
  onBack,
  onFinish,
  loading,
}: {
  onBack: () => void;
  onFinish: (data: SocialFormData) => void;
  loading?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSocialsData>({ resolver: zodResolver(userSocialsSchema) });

  const onSubmit = (data: SocialFormData) => onFinish(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend>Social Links</FieldLegend>
        <FieldDescription>
          Add your public social accounts (optional).
        </FieldDescription>
        <FieldSeparator />

        <FieldGroup>
          <Field orientation="responsive">
            <FieldLabel>GitHub</FieldLabel>
            <Input placeholder="githubUsername" {...register("github")} />
          </Field>

          <FieldSeparator />

          <Field orientation="responsive">
            <FieldLabel>Twitter</FieldLabel>
            <Input placeholder="@username" {...register("twitter")} />
          </Field>

          <FieldSeparator />

          <Field orientation="responsive">
            <FieldLabel>Discord</FieldLabel>
            <Input placeholder="username#1234" {...register("discord")} />
          </Field>

          <FieldSeparator />

          <Field orientation="responsive">
            <FieldLabel>Website</FieldLabel>
            <Input placeholder="https://example.com" {...register("website")} />
            {errors.website && (
              <p className="text-sm text-red-500">{errors.website.message}</p>
            )}
          </Field>

          <FieldSeparator />

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Finish"}
            </Button>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
