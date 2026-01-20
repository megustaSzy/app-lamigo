/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { RegionItem } from "@/types/region";
import { useRegion } from "@/hooks/admin/useRegion";

import Pagination from "@/components/Pagination";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Plus, AlertCircle, CheckCircle2 } from "lucide-react";

import KabupatenTable from "@/components/admin/kategori-kabupaten/KabupatenTable";
import KabupatenFormModal from "@/components/admin/kategori-kabupaten/KabupatenFormModal";
import KabupatenDeleteModal from "@/components/admin/kategori-kabupaten/KabupatenDeleteModal";

export default function KategoriKabupaten() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const perPage = 10;

  const {
    regions,
    loading,
    error,
    totalPages,
    createRegion,
    updateRegion,
    deleteRegion,
  } = useRegion({
    page,
    limit: perPage,
  });

  async function saveRegion() {
    if (!nameInput.trim()) return;

    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("name", nameInput.trim());
      if (image) fd.append("image", image);

      if (editId !== null) {
        await updateRegion(editId, fd);
        setSuccessMsg("Kabupaten berhasil diperbarui");
      } else {
        await createRegion(fd);
        setSuccessMsg("Kabupaten berhasil ditambahkan");
      }

      setModalOpen(false);
      setNameInput("");
      setImage(null);
      setEditId(null);

      setTimeout(() => setSuccessMsg(null), 2000);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteRegion() {
    if (!pendingDeleteId) return;

    setDeletingId(pendingDeleteId);

    try {
      await deleteRegion(pendingDeleteId);
      setSuccessMsg("Kabupaten berhasil dihapus");
      setTimeout(() => setSuccessMsg(null), 2000);
    } finally {
      setDeletingId(null);
      setPendingDeleteId(null);
      setConfirmDeleteOpen(false);
    }
  }

  function openAddModal() {
    setEditId(null);
    setNameInput("");
    setImage(null);
    setModalOpen(true);
  }

  function openEditModal(region: RegionItem) {
    setEditId(region.id);
    setNameInput(region.name);
    setImage(null);
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
          Kategori Kabupaten
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola data kabupaten dan wilayah
        </p>
      </div>

      {/* SUCCESS TOAST */}
      {successMsg && (
        <Alert className="fixed top-4 right-4 bg-green-600 text-white border-green-700 shadow-lg z-50 w-auto">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{successMsg}</AlertDescription>
        </Alert>
      )}

      {/* ERROR ALERT */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-800">Daftar Kabupaten</CardTitle>
              <CardDescription className="mt-1">
                Total {regions.length} kabupaten
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
          ) : regions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-gray-500 text-sm">Belum ada kabupaten.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={openAddModal}
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Kabupaten Pertama
              </Button>
            </div>
          ) : (
            <>
              <KabupatenTable
                regions={regions}
                page={page}
                perPage={perPage}
                deletingId={deletingId}
                onEdit={openEditModal}
                onDelete={openDeleteConfirm}
              />

              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* MODALS */}
      <KabupatenFormModal
        open={modalOpen}
        editId={editId}
        nameInput={nameInput}
        saving={saving}
        onClose={() => setModalOpen(false)}
        onSave={saveRegion}
        onNameChange={setNameInput}
        onImageChange={setImage}
      />

      <KabupatenDeleteModal
        open={confirmDeleteOpen}
        onCancel={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDeleteRegion}
      />
    </div>
  );
}
