"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import ProfileHeader from "@/components/admin/profile/ProfileHeader";
import ProfileForm from "@/components/admin/profile/ProfileForm";
import { useAdminProfile } from "@/hooks/admin/useAdminProfile";
import { useMounted } from "@/hooks/useMounted";

export default function ProfileAdminPage() {
  const mounted = useMounted();
  const {
    profile,
    loading,
    saving,
    successMsg,
    preview,
    form,
    handleChange,
    handleAvatarChange,
    submit,
  } = useAdminProfile();

  if (!mounted) return null;

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin mr-2" /> Memuat profil...
      </div>
    );

  if (!profile) return null;

  return (
    <div className="space-y-6">
      <ProfileHeader />

      {successMsg && (
        <Alert className="fixed top-4 right-4 bg-green-600 text-white z-50">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{successMsg}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-center">
        <Card className="w-full max-w-3xl rounded-2xl">
          <CardHeader />
          <CardContent>
            <ProfileForm
              profile={profile}
              form={form}
              preview={preview}
              saving={saving}
              onChange={handleChange}
              onAvatarChange={handleAvatarChange}
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
