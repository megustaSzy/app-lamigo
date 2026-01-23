"use client";

import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { CheckCircle2, Loader2, User, Camera } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type UserProfile = {
  id: number;
  name: string;
  email: string;
  notelp: string;
  role: string;
  avatar: string;
};

export default function ProfilePage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [user, setUser] = useState<UserProfile>({
    id: 0,
    name: "",
    email: "",
    notelp: "",
    role: "",
    avatar: "/images/default-avatar.png",
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const buildAvatarUrl = useCallback(
    (avatar?: string | null) =>
      avatar
        ? avatar.startsWith("http")
          ? avatar
          : `${API_URL}${avatar}`
        : "/images/default-avatar.png",
    [API_URL],
  );

  const fetchProfile = useCallback(async () => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    const res = await fetch(`${API_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return;

    const json = await res.json();
    setUser({
      id: json.data.id,
      name: json.data.name ?? "",
      email: json.data.email ?? "",
      notelp: json.data.notelp ?? "",
      role: json.data.role ?? "",
      avatar: buildAvatarUrl(json.data.avatar),
    });
  }, [API_URL, buildAvatarUrl]);

  const updateProfile = async () => {
    setSaving(true);
    const token = Cookies.get("accessToken");
    if (!token) return;

    const formData = new FormData();
    if (user.name) formData.append("name", user.name);
    if (user.notelp) formData.append("notelp", user.notelp);
    if (file) formData.append("avatar", file);

    try {
      const res = await fetch(`${API_URL}/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Gagal update profile");
      }

      setSuccess(true);
      setFile(null);
      setPreview(null);
      fetchProfile();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 py-8 md:py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* HEADER */}
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-blue-600">
              Profile Saya
            </h1>
            <p className="text-gray-600 mt-1">
              Kelola informasi akun dan foto profil
            </p>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LEFT – PROFILE CARD */}
            <Card className="md:col-span-1">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="relative group">
                  <Avatar className="h-28 w-28 border shadow-sm">
                    <AvatarImage src={preview || user.avatar} />
                    <AvatarFallback className="text-2xl">
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <Label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition">
                    <Camera className="text-white" />
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        setFile(f);
                        setPreview(URL.createObjectURL(f));
                      }}
                    />
                  </Label>
                </div>

                <div>
                  <h2 className="text-lg font-semibold">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600 font-medium">
                  {user.role}
                </span>
              </CardContent>
            </Card>

            {/* RIGHT – FORM */}
            <Card className="md:col-span-2">
              <CardHeader>
                <h3 className="font-semibold flex items-center gap-2">
                  <User size={18} />
                  Informasi Pribadi
                </h3>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nama</Label>
                    <Input
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={user.email} disabled />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>No. Telepon</Label>
                    <Input
                      value={user.notelp}
                      onChange={(e) =>
                        setUser({ ...user, notelp: e.target.value })
                      }
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={updateProfile}
                    disabled={saving}
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      "Simpan Perubahan"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* SUCCESS DIALOG */}
      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent>
          <div className="text-center space-y-4 py-6">
            <CheckCircle2 className="mx-auto text-green-500" size={48} />
            <DialogHeader>
              <DialogTitle>Berhasil</DialogTitle>
              <DialogDescription>Profil berhasil diperbarui</DialogDescription>
            </DialogHeader>
            <Button
              onClick={() => setSuccess(false)}
              className="bg-blue-600 text-white"
            >
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
