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
import { Textarea } from "@workspace/ui/components/textarea";
import { Button } from "@workspace/ui/components/button";
import { UserProfileData, userProfileSchema } from "@/schemas/user";

const userSchema = z.object({
  email: z.string().email("Invalid email").optional(),
  username: z.string().min(1, "Username is required"),
  name: z.string().min(1, "Name is required"),
  bio: z.string().max(200, "Max 200 characters").optional(),
});

type UserFormData = z.infer<typeof userSchema>;

export function UserProfileForm({
  onNext,
}: {
  onNext: (data: UserFormData) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileData>({ resolver: zodResolver(userProfileSchema) });

  const onSubmit = (data: UserFormData) => onNext(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend>Profile Information</FieldLegend>
        <FieldDescription>Fill in your core profile details.</FieldDescription>
        <FieldSeparator />

        <FieldGroup>
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel>Name</FieldLabel>
            </FieldContent>
            <Input placeholder="John Doe" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </Field>

          <FieldSeparator />

          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel>Username</FieldLabel>
            </FieldContent>
            <Input placeholder="@johndoe" {...register("username")} />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </Field>

          <FieldSeparator />

          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel>Email</FieldLabel>
            </FieldContent>
            <Input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
          </Field>

          <FieldSeparator />

          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel>Bio</FieldLabel>
            </FieldContent>
            <Textarea
              placeholder="Tell us a bit about yourself..."
              {...register("bio")}
            />
          </Field>

          <FieldSeparator />

          <Button type="submit">Next</Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
