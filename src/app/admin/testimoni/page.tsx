"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/helpers/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

import TestimoniTable from "@/components/admin/testimoni/TestimoniTable";
import TestimoniModal from "@/components/admin/testimoni/TestimoniModal";
import TestimoniDeleteModal from "@/components/admin/testimoni/TestimoniDeleteModal";

import { TestimoniItem, ApiTestimoniResponse } from "@/types/admin/testimoni";

export default function TestimoniPage() {
  const [testimoni, setTestimoni] = useState<TestimoniItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [professionInput, setProfessionInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [ratingInput, setRatingInput] = useState(5);

  const [saving, setSaving] = useState(false);

  async function getData() {
    try {
      setLoading(true);
      const res = await apiFetch<ApiTestimoniResponse>("/api/testimoni/admin");
      setTestimoni(res.data.items);
    } catch {
      setErrorMsg("Gagal memuat data testimoni");
      setTimeout(() => setErrorMsg(null), 2000);
    } finally {
      setLoading(false);
    }
  }

  async function saveTestimoni() {
    setSaving(true);

    try {
      const payload = {
        name: nameInput,
        email: emailInput,
        profession: professionInput,
        comment: commentInput,
        rating: ratingInput,
      };

      if (editId) {
        await apiFetch(`/api/testimoni/${editId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setSuccessMsg("Testimoni berhasil diperbarui");
      } else {
        await apiFetch("/api/testimoni", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setSuccessMsg("Testimoni berhasil dibuat");
      }

      setTimeout(() => setSuccessMsg(null), 2000);

      setModalOpen(false);
      setEditId(null);
      await getData();
    } catch {
      setErrorMsg("Gagal menyimpan testimoni");
      setTimeout(() => setErrorMsg(null), 2000);
    } finally {
      setSaving(false);
    }
  }

  async function approve(id: number) {
    try {
      await apiFetch(`/api/testimoni/admin/${id}/approve`, { method: "PATCH" });
      setSuccessMsg("Testimoni disetujui");
      setTimeout(() => setSuccessMsg(null), 2000);
      await getData();
    } catch {
      setErrorMsg("Gagal menyetujui testimoni");
      setTimeout(() => setErrorMsg(null), 2000);
    }
  }

  async function reject(id: number) {
    try {
      await apiFetch(`/api/testimoni/admin/${id}/reject`, { method: "PATCH" });
      setSuccessMsg("Testimoni ditolak");
      setTimeout(() => setSuccessMsg(null), 2000);
      await getData();
    } catch {
      setErrorMsg("Gagal menolak testimoni");
      setTimeout(() => setErrorMsg(null), 2000);
    }
  }

  function openEditModal(t: TestimoniItem) {
    setEditId(t.id);
    setNameInput(t.name || "");
    setEmailInput(t.email || "");
    setProfessionInput(t.profession || "");
    setCommentInput(t.comment);
    setRatingInput(t.rating || 5);
    setModalOpen(true);
  }

  function openDeleteModal(id: number) {
    setDeleteId(id);
    setDeleteOpen(true);
  }

  async function confirmDelete() {
    if (!deleteId) return;

    try {
      await apiFetch(`/api/testimoni/${deleteId}`, { method: "DELETE" });
      setSuccessMsg("Testimoni berhasil dihapus");
      setTimeout(() => setSuccessMsg(null), 2000);
      await getData();
    } catch {
      setErrorMsg("Gagal menghapus testimoni");
      setTimeout(() => setErrorMsg(null), 2000);
    } finally {
      setDeleteOpen(false);
      setDeleteId(null);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="space-y-6">
      {successMsg && (
        <Alert className="fixed top-4 right-4 bg-green-600 text-white border-green-700 shadow-lg z-50 w-auto">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{successMsg}</AlertDescription>
        </Alert>
      )}

      {errorMsg && (
        <Alert className="fixed top-4 right-4 bg-red-600 text-white border-red-700 shadow-lg z-50 w-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-800">Daftar Testimoni</CardTitle>
          <CardDescription>Total {testimoni.length} testimoni</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
              <p className="text-gray-500">Memuat data...</p>
            </div>
          ) : testimoni.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-gray-500 text-sm">Belum ada testimoni.</p>
            </div>
          ) : (
            <TestimoniTable
              items={testimoni}
              onApprove={approve}
              onReject={reject}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          )}
        </CardContent>
      </Card>

      <TestimoniModal
        open={modalOpen}
        editMode={!!editId}
        name={nameInput}
        email={emailInput}
        profession={professionInput}
        comment={commentInput}
        rating={ratingInput}
        saving={saving}
        onClose={() => setModalOpen(false)}
        onSave={saveTestimoni}
        setName={setNameInput}
        setEmail={setEmailInput}
        setProfession={setProfessionInput}
        setComment={setCommentInput}
        setRating={setRatingInput}
      />

      <TestimoniDeleteModal
        open={deleteOpen}
        onCancel={() => {
          setDeleteOpen(false);
          setDeleteId(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
