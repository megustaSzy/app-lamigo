"use client";

import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { CheckCircle2, Loader2, Camera, Edit2, Save, X } from "lucide-react";

import MainLayout from "@/components/MainLayout";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
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

  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
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
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal update profile");

      setSuccess(true);
      setFile(null);
      setPreview(null);
      setIsEditing(false);
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
    <MainLayout>
      <div className="bg-linear-to-b via-blue-200 from-blue-200 to-blue-50 min-h-screen pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          {/* HEADER (SAMA GAYA LOG AKTIVITAS) */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-700 tracking-tight">
              Profil Saya
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Kelola informasi pribadi
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* PROFILE CARD */}
            <Card className="shadow-sm">
              <div className="h-24 bg-blue-600 rounded-t-xl" />

              <CardContent className="-mt-12 pb-6 text-center">
                {loading ? (
                  <>
                    <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
                    <Skeleton className="h-5 w-32 mx-auto mb-2" />
                    <Skeleton className="h-4 w-40 mx-auto mb-3" />
                    <Skeleton className="h-6 w-20 mx-auto rounded-full" />
                  </>
                ) : (
                  <>
                    <div className="relative inline-block mb-4">
                      <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                        <AvatarImage src={preview || user.avatar} />
                        <AvatarFallback className="bg-blue-600 text-white text-2xl">
                          {user.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>

                      {isEditing && (
                        <Label className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition">
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
                      )}
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900">
                      {user.name || "-"}
                    </h2>
                    <p className="text-sm text-gray-500 mb-3">
                      {user.email || "-"}
                    </p>

                    <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                      {user.role || "-"}
                    </span>
                  </>
                )}
              </CardContent>
            </Card>

            {/* FORM CARD */}
            <Card className="lg:col-span-2 shadow-sm">
              <CardHeader className="border-b bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Informasi Pribadi
                  </h3>

                  {!loading && (
                    <Button
                      size="sm"
                      variant={isEditing ? "outline" : "default"}
                      onClick={() => setIsEditing(!isEditing)}
                      className={
                        isEditing ? "" : "bg-blue-600 hover:bg-blue-700"
                      }
                    >
                      {isEditing ? (
                        <>
                          <X className="mr-2" size={16} /> Batal
                        </>
                      ) : (
                        <>
                          <Edit2 className="mr-2" size={16} /> Edit
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-5">
                {loading ? (
                  <>
                    <Skeleton className="h-11 w-full" />
                    <Skeleton className="h-11 w-full" />
                    <Skeleton className="h-11 w-full" />
                  </>
                ) : (
                  <>
                    <div>
                      <Label>Nama Lengkap</Label>
                      <Input
                        value={user.name}
                        placeholder="Masukkan nama lengkap"
                        disabled={!isEditing}
                        onChange={(e) =>
                          setUser({ ...user, name: e.target.value })
                        }
                        className="mt-1 h-11"
                      />
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Input
                        value={user.email}
                        disabled
                        className="mt-1 h-11 bg-gray-50"
                      />
                    </div>

                    <div>
                      <Label>Nomor Telepon</Label>
                      <Input
                        value={user.notelp}
                        placeholder="Contoh: 081234567890"
                        disabled={!isEditing}
                        onChange={(e) =>
                          setUser({ ...user, notelp: e.target.value })
                        }
                        className="mt-1 h-11"
                      />
                    </div>

                    {isEditing && (
                      <Button
                        onClick={updateProfile}
                        disabled={saving}
                        className="w-full h-11 bg-blue-600 hover:bg-blue-700"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="mr-2 animate-spin" />
                            Menyimpan...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2" />
                            Simpan Perubahan
                          </>
                        )}
                      </Button>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* SUCCESS DIALOG */}
      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 className="mx-auto text-green-600" size={56} />
            <DialogHeader>
              <DialogTitle>Berhasil</DialogTitle>
              <DialogDescription>
                Profil Anda berhasil diperbarui
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={() => setSuccess(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
