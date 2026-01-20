"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Profile, ProfileFormState } from "@/types/admin/profile";
import ProfileAvatarSection from "./ProfileAvatarSection";
import ProfileFormFields from "./ProfileFormFields";
import ProfileRoleSection from "./ProfileRoleSection";

type Props = {
  profile: Profile;
  form: ProfileFormState;
  preview: string | null;
  saving: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function ProfileForm({
  profile,
  form,
  preview,
  saving,
  onChange,
  onAvatarChange,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <ProfileAvatarSection
        profile={profile}
        preview={preview}
        onAvatarChange={onAvatarChange}
      />

      <ProfileFormFields form={form} onChange={onChange} />

      <ProfileRoleSection role={profile.role} />

      <div className="flex justify-end pt-4 border-t">
        <Button disabled={saving} className="bg-blue-600 px-8">
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            "Simpan Perubahan"
          )}
        </Button>
      </div>
    </form>
  );
}
