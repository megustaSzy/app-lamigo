"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/helpers/api";
import {
  ApiCategoryResponse,
  ApiBaseResponse,
  CategoryItem,
} from "@/types/category";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Plus, CheckCircle2 } from "lucide-react";

import WisataTable from "@/components/admin/kategori-wisata/WisataTable";
import WisataFormModal from "@/components/admin/kategori-wisata/WisataFormModal";
import WisataDeleteModal from "@/components/admin/kategori-wisata/WisataDeleteModal";

export default function KategoriWisataPage() {
  const [cats, setCats] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [nameInput, setNameInput] = useState("");

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  /* ================= FETCH ================= */
  async function getData() {
    try {
      setLoading(true);
      const res = await apiFetch<ApiCategoryResponse>("/api/category");
      setCats(res.data.items);
    } catch {
      setErrorMsg("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  /* ================= SAVE ================= */
  async function saveCategory() {
    if (!nameInput.trim()) return;

    setSaving(true);

    const payload = { name: nameInput.trim() };
    const method = editId !== null ? "PUT" : "POST";
    const endpoint =
      editId !== null ? `/api/category/${editId}` : `/api/category`;

    try {
      await apiFetch<ApiBaseResponse>(endpoint, {
        method,
        body: JSON.stringify(payload),
      });

      setModalOpen(false);
      setNameInput("");
      setEditId(null);

      setSuccessMsg(
        method === "POST"
          ? "Kategori berhasil ditambahkan"
          : "Kategori berhasil diperbarui"
      );

      setTimeout(() => setSuccessMsg(null), 2000);
      await getData();
    } catch {
      setErrorMsg("Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
  }

  async function deleteCategory() {
    if (!pendingDeleteId) return;

    setDeletingId(pendingDeleteId);

    try {
      await apiFetch<ApiBaseResponse>(`/api/category/${pendingDeleteId}`, {
        method: "DELETE",
      });

      setSuccessMsg("Kategori berhasil dihapus");
      setTimeout(() => setSuccessMsg(null), 2000);

      await getData();
    } catch {
      setErrorMsg("Gagal menghapus data");
    } finally {
      setDeletingId(null);
      setPendingDeleteId(null);
      setConfirmDeleteOpen(false);
    }
  }

  function openAddModal() {
    setEditId(null);
    setNameInput("");
    setModalOpen(true);
  }

  function openEditModal(cat: CategoryItem) {
    setEditId(cat.id);
    setNameInput(cat.name);
    setModalOpen(true);
  }

  function openDeleteConfirm(id: number) {
    setPendingDeleteId(id);
    setConfirmDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-blue-700 tracking-tight">
          Kategori Wisata
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola kategori untuk tempat wisata
        </p>
      </div>

      {/* SUCCESS TOAST */}
      {successMsg && (
        <Alert className="fixed top-4 right-4 bg-green-600 text-white border-green-700 shadow-lg z-50 w-auto">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{successMsg}</AlertDescription>
        </Alert>
      )}

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-800">Daftar Kategori</CardTitle>
              <CardDescription className="mt-1">
                Total {cats.length} kategori
              </CardDescription>
            </div>
            <Button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
              <p className="text-gray-500">Memuat data...</p>
            </div>
          ) : cats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-gray-500 text-sm">Belum ada kategori.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={openAddModal}
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Kategori Pertama
              </Button>
            </div>
          ) : (
            <WisataTable
              cats={cats}
              deletingId={deletingId}
              onEdit={openEditModal}
              onDelete={openDeleteConfirm}
            />
          )}
        </CardContent>
      </Card>

      {/* MODALS */}
      <WisataFormModal
        open={modalOpen}
        editId={editId}
        nameInput={nameInput}
        saving={saving}
        onClose={() => setModalOpen(false)}
        onSave={saveCategory}
        onNameChange={setNameInput}
      />

      <WisataDeleteModal
        open={confirmDeleteOpen}
        onCancel={() => setConfirmDeleteOpen(false)}
        onConfirm={deleteCategory}
      />
    </div>
  );
}
