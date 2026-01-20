"use client";

import { useEffect, useState } from "react";
import { Profile, ProfileFormState } from "@/types/admin/profile";
import { getAdminProfile, updateAdminProfile } from "@/services/profileService";

export function useAdminProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState<ProfileFormState>({
    name: "",
    email: "",
    notelp: "",
    password: "",
  });

  /* ================= FETCH PROFILE ================= */
  async function fetchProfile() {
    try {
      setLoading(true);
      const res = await getAdminProfile();

      setProfile(res.data);
      setForm({
        name: res.data.name ?? "",
        email: res.data.email ?? "",
        notelp: res.data.notelp ?? "",
        password: "",
      });
      setPreview(res.data.avatar ?? null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  async function submit() {
    if (!profile) return;

    try {
      setSaving(true);
      const fd = new FormData();

      // ⬇️ kirim hanya jika ADA & BERUBAH
      if (form.name && form.name !== profile.name) {
        fd.append("name", form.name);
      }

      if (form.email && form.email !== profile.email) {
        fd.append("email", form.email);
      }

      if (form.notelp && form.notelp !== profile.notelp) {
        fd.append("notelp", form.notelp);
      }

      if (form.password) {
        fd.append("password", form.password);
      }

      if (avatarFile) {
        fd.append("avatar", avatarFile);
      }

      if ([...fd.keys()].length === 0) return;

      await updateAdminProfile(profile.id, fd);

      setSuccessMsg("Profil berhasil diperbarui");
      setTimeout(() => setSuccessMsg(null), 2000);

      setAvatarFile(null);
      setForm((p) => ({ ...p, password: "" }));

      await fetchProfile();
    } finally {
      setSaving(false);
    }
  }

  return {
    profile,
    loading,
    saving,
    successMsg,
    preview,
    form,
    handleChange,
    handleAvatarChange,
    submit,
  };
}
