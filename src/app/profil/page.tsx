"use client";

import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { CheckCircle2, Upload } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ApiProfileResponse = {
  status: number;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string | null;
  };
};

type UserProfile = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
};

export default function ProfilePage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [user, setUser] = useState<UserProfile>({
    id: 0,
    name: "",
    email: "",
    role: "",
    avatar: "/images/default-avatar.png",
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const buildAvatarUrl = useCallback(
    (avatar?: string | null) =>
      avatar
        ? avatar.startsWith("http")
          ? avatar
          : `${API_URL}${avatar}`
        : "/images/default-avatar.png",
    [API_URL]
  );

  // ✅ Dibungkus useCallback
  const fetchProfile = useCallback(async () => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return;

      const result: ApiProfileResponse = await res.json();

      setUser({
        id: result.data.id,
        name: result.data.name,
        email: result.data.email,
        role: result.data.role,
        avatar: buildAvatarUrl(result.data.avatar),
      });
    } catch (error) {
      console.error("FETCH PROFILE ERROR:", error);
    }
  }, [API_URL, buildAvatarUrl]);

  const updateProfile = async () => {
    setSaving(true);
    const token = Cookies.get("accessToken");

    const formData = new FormData();
    formData.append("name", user.name);
    if (file) formData.append("avatar", file);

    try {
      await fetch(`${API_URL}/api/users/${user.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      setOpenSuccess(true);
    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error);
    } finally {
      setSaving(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <>
      <div className="min-h-screen bg-muted/40 px-4 py-10">
        <Card className="mx-auto max-w-lg rounded-2xl border shadow-sm">
          <CardContent className="space-y-6 p-6">
            {/* ===== HEADER ===== */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={preview ?? user.avatar} />
                <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <p className="font-medium leading-tight">
                  {user.name || "Nama Pengguna"}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>

                <Label className="mt-1 inline-flex cursor-pointer items-center gap-1 text-xs  text-blue-500">
                  <Upload className="h-3.5 w-3.5" />
                  Ubah foto
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
            </div>

            <Separator />

            {/* ===== FORM ===== */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-sm">Nama</Label>
                <Input
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">Email</Label>
                <Input value={user.email} disabled />
              </div>
            </div>

            <Separator />

            {/* ===== ACTION ===== */}
            <Button
              onClick={updateProfile}
              disabled={saving}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600 cursor-pointer"
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* SUCCESS DIALOG */}
      <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
        <DialogContent className="rounded-2xl">
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            <DialogHeader>
              <DialogTitle>Profil Berhasil Diperbarui</DialogTitle>
              <DialogDescription>
                Perubahan profil kamu telah disimpan.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpenSuccess(false)}>Tutup</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
