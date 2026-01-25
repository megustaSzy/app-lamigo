"use client";

import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import {
  CheckCircle2,
  Loader2,
  User,
  Camera,
  Mail,
  Phone,
  Edit2,
  Save,
  X,
} from "lucide-react";

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
    <>
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Profile Saya
            </h1>
            <p className="text-slate-600">Kelola informasi pribadi Anda</p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="border shadow-sm">
                <div className="h-24 bg-slate-800"></div>

                <CardContent className="pt-16 pb-6 text-center -mt-12">
                  <div className="relative inline-block mb-4">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                      <AvatarImage src={preview || user.avatar} />
                      <AvatarFallback className="text-2xl bg-slate-700 text-white">
                        {user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <Label className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition-opacity">
                      <Camera className="text-white" size={24} />
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

                  <h2 className="text-xl font-bold text-slate-800 mb-1">
                    {user.name}
                  </h2>
                  <p className="text-sm text-slate-500 mb-4">{user.email}</p>

                  <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800 text-white text-sm font-medium">
                    {user.role}
                  </div>

                  {preview && (
                    <div className="mt-4">
                      <Button
                        onClick={() => {
                          setFile(null);
                          setPreview(null);
                        }}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <X size={16} className="mr-2" />
                        Batalkan
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Form Card */}
            <div className="lg:col-span-2">
              <Card className="border shadow-sm">
                <CardHeader className="border-b bg-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Informasi Pribadi
                    </h3>
                    <Button
                      variant={isEditing ? "destructive" : "default"}
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className={
                        isEditing ? "" : "bg-slate-800 hover:bg-slate-700"
                      }
                    >
                      {isEditing ? (
                        <>
                          <X size={16} className="mr-2" />
                          Batal
                        </>
                      ) : (
                        <>
                          <Edit2 size={16} className="mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  {/* Nama */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Nama Lengkap
                    </Label>
                    <Input
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      disabled={!isEditing}
                      className="h-11 disabled:bg-slate-50"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Email
                    </Label>
                    <Input
                      value={user.email}
                      disabled
                      className="h-11 bg-slate-50"
                    />
                    <p className="text-xs text-slate-500">
                      Email tidak dapat diubah
                    </p>
                  </div>

                  {/* Telepon */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Nomor Telepon
                    </Label>
                    <Input
                      value={user.notelp}
                      onChange={(e) =>
                        setUser({ ...user, notelp: e.target.value })
                      }
                      disabled={!isEditing}
                      placeholder="081234567890"
                      className="h-11 disabled:bg-slate-50"
                    />
                  </div>

                  {/* Save Button */}
                  {isEditing && (
                    <div className="pt-4">
                      <Button
                        onClick={updateProfile}
                        disabled={saving}
                        className="w-full h-11 bg-slate-800 hover:bg-slate-700"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="mr-2 animate-spin" size={18} />
                            Menyimpan...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2" size={18} />
                            Simpan Perubahan
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center space-y-4 py-4">
            <div className="inline-block p-3 bg-green-100 rounded-full">
              <CheckCircle2 className="text-green-600" size={48} />
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Berhasil!</DialogTitle>
              <DialogDescription>
                Profil Anda telah berhasil diperbarui
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={() => setSuccess(false)}
              className="bg-slate-800 hover:bg-slate-700"
            >
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
