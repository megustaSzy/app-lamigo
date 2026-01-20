"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { Profile } from "@/types/admin/profile";

type Props = {
  profile: Profile;
  preview: string | null;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProfileAvatarSection({
  profile,
  preview,
  onAvatarChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
      <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
        <AvatarImage src={preview || undefined} className="object-cover" />
        <AvatarFallback className="bg-linear-to-br from-blue-500 to-blue-600 text-white text-2xl font-bold">
          {profile.name?.[0]?.toUpperCase() || "A"}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900">{profile.name}</h3>
          <p className="text-sm text-gray-600">{profile.email}</p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="avatar"
            className="text-sm font-medium flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Unggah Foto Profil
          </Label>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={onAvatarChange}
            className="cursor-pointer file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500">
            Format: JPG, PNG, atau WEBP. Maksimal 2MB
          </p>
        </div>
      </div>
    </div>
  );
}
