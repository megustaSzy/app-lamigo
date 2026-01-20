"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/helpers/api";
import {
  ApiPickupItem,
  ApiPickupResponse,
  PickupType,
} from "@/types/pickupLocation";

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

import PickupTable from "@/components/admin/pickup-penjemputan/PickupTable";
import PickupFormModal from "@/components/admin/pickup-penjemputan/PickupFormModal";
import PickupDeleteModal from "@/components/admin/pickup-penjemputan/PickupDeleteModal";

export default function PickupPage() {
  const [items, setItems] = useState<PickupType[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [nameInput, setNameInput] = useState("");

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  type PickupListResponse = {
    status: number;
    message: string;
    data: ApiPickupItem[];
  };

  async function getData(): Promise<void> {
    try {
      setLoading(true);
      setErrorMsg(null);

      const res = await apiFetch<PickupListResponse>("/api/pickup-locations");

      const rawItems = Array.isArray(res.data) ? res.data : [];
      const mapped: PickupType[] = rawItems.map((i) => ({
        id: i.id,
        name: i.name,
      }));

      setItems(mapped);
    } catch {
      setErrorMsg("Gagal memuat data pickup");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function savePickup(): Promise<void> {
    if (!nameInput.trim()) return;

    setSaving(true);

    const payload = { name: nameInput.trim() };
    const method = editId ? "PUT" : "POST";
    const endpoint = editId
      ? `/api/pickup-locations/${editId}`
      : "/api/pickup-locations";

    try {
      await apiFetch<ApiPickupResponse>(endpoint, {
        method,
        body: JSON.stringify(payload),
      });

      setModalOpen(false);
      setNameInput("");
      setEditId(null);

      setSuccessMsg(
        method === "POST"
          ? "Lokasi pickup berhasil ditambahkan"
          : "Lokasi pickup berhasil diperbarui"
      );
      setTimeout(() => setSuccessMsg(null), 2000);

      await getData();
    } catch {
      setErrorMsg("Gagal menyimpan data pickup");
    } finally {
      setSaving(false);
    }
  }

  async function deletePickup(): Promise<void> {
    if (!pendingDeleteId) return;

    setDeletingId(pendingDeleteId);

    try {
      await apiFetch(`/api/pickup-locations/${pendingDeleteId}`, {
        method: "DELETE",
      });

      setSuccessMsg("Lokasi pickup berhasil dihapus");
      setTimeout(() => setSuccessMsg(null), 2000);

      await getData();
    } catch {
      setErrorMsg("Gagal menghapus data pickup");
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

  function openEditModal(item: PickupType) {
    setEditId(item.id);
    setNameInput(item.name);
    setModalOpen(true);
  }

  function openDeleteConfirm(id: number) {
    setPendingDeleteId(id);
    setConfirmDeleteOpen(true);
  }

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-blue-700 tracking-tight">
          Pickup Penjemputan
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola lokasi pickup untuk penjemputan wisatawan
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
              <CardTitle className="text-gray-800">
                Daftar Lokasi Pickup
              </CardTitle>
              <CardDescription className="mt-1">
                Total {items.length} lokasi
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
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-gray-500 text-sm">Belum ada lokasi pickup.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={openAddModal}
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Lokasi Pertama
              </Button>
            </div>
          ) : (
            <PickupTable
              items={items}
              deletingId={deletingId}
              onEdit={openEditModal}
              onDelete={openDeleteConfirm}
            />
          )}
        </CardContent>
      </Card>

      <PickupFormModal
        open={modalOpen}
        editId={editId}
        nameInput={nameInput}
        saving={saving}
        onClose={() => setModalOpen(false)}
        onSave={savePickup}
        onNameChange={setNameInput}
      />

      <PickupDeleteModal
        open={confirmDeleteOpen}
        onCancel={() => setConfirmDeleteOpen(false)}
        onConfirm={deletePickup}
      />
    </div>
  );
}
