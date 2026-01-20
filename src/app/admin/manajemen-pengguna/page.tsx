"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/helpers/api";

import {
  UserItem,
  ApiUsersResponse,
  ApiBaseResponse,
} from "@/types/admin/manajemen-pengguna";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

import Pagination from "@/components/Pagination";

import UsersTable from "@/components/admin/manajemen-pengguna/UsersTable";
import UserEditModal from "@/components/admin/manajemen-pengguna/UserEditModal";
import UserDeleteModal from "@/components/admin/manajemen-pengguna/UserDeleteModal";

export default function UsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [notelpInput, setNotelpInput] = useState("");

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  async function getData() {
    try {
      setLoading(true);
      const res = await apiFetch<ApiUsersResponse>(
        `/api/users?page=${page}&limit=${limit}`
      );

      setUsers(res.data.items);
      setTotalPages(res.data.total_pages);
    } catch {
      setErrorMsg("Gagal memuat data pengguna");
    } finally {
      setLoading(false);
    }
  }

  async function saveUser() {
    if (!editId) return;

    setSaving(true);

    const fd = new FormData();
    fd.append("name", nameInput);
    fd.append("notelp", notelpInput);
    fd.append("_method", "PUT");

    try {
      await apiFetch(`/api/users/${editId}`, {
        method: "POST",
        body: fd,
      });

      setModalOpen(false);
      setEditId(null);

      setSuccessMsg("Pengguna berhasil diperbarui");
      setTimeout(() => setSuccessMsg(null), 2000);

      await getData();
    } catch {
      setErrorMsg("Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
  }

  async function deleteUser() {
    if (!pendingDeleteId) return;

    setDeletingId(pendingDeleteId);

    try {
      await apiFetch<ApiBaseResponse>(`/api/users/${pendingDeleteId}`, {
        method: "DELETE",
      });

      setSuccessMsg("Pengguna berhasil dihapus");
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

  function openEditModal(user: UserItem) {
    setEditId(user.id);
    setNameInput(user.name);
    setEmailInput(user.email);
    setNotelpInput(user.notelp ?? "");
    setModalOpen(true);
  }

  function openDeleteConfirm(id: number) {
    setPendingDeleteId(id);
    setConfirmDeleteOpen(true);
  }

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-blue-700 tracking-tight">
          Manajemen Pengguna
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola data pengguna yang terdaftar di sistem
        </p>
      </div>

      {/* SUCCESS TOAST */}
      {successMsg && (
        <Alert className="fixed top-4 right-4 bg-green-600 text-white border-green-700 shadow-lg z-50 w-auto">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{successMsg}</AlertDescription>
        </Alert>
      )}

      {/* ERROR TOAST */}
      {errorMsg && (
        <Alert className="fixed top-4 right-4 bg-red-600 text-white border-red-700 shadow-lg z-50 w-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="border-b">
          <div>
            <CardTitle className="text-gray-800">Daftar Pengguna</CardTitle>
            <CardDescription className="mt-1">
              Total {users.length} pengguna terdaftar
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
              <p className="text-gray-500">Memuat data...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-gray-500 text-sm">Tidak ada data pengguna.</p>
            </div>
          ) : (
            <>
              <UsersTable
                users={users}
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

      <UserEditModal
        open={modalOpen}
        nameInput={nameInput}
        emailInput={emailInput}
        notelpInput={notelpInput}
        saving={saving}
        onClose={() => setModalOpen(false)}
        onSave={saveUser}
        onNameChange={setNameInput}
        onNotelpChange={setNotelpInput}
      />

      <UserDeleteModal
        open={confirmDeleteOpen}
        onCancel={() => setConfirmDeleteOpen(false)}
        onConfirm={deleteUser}
      />
    </div>
  );
}
