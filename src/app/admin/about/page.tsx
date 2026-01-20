"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/helpers/api";
import { TitleItem, TitleResponse } from "@/types/admin/admin-about";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2 } from "lucide-react";

import AboutTable from "@/components/admin/about/AboutTable";
import AboutFormModal from "@/components/admin/about/AboutFormModal";
import AboutDeleteModal from "@/components/admin/about/AboutDeleteModal";

export default function AboutPage() {
  const [item, setItem] = useState<TitleItem | null>(null);
  const [loading, setLoading] = useState(true);

  // modal state
  const [openForm, setOpenForm] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selected, setSelected] = useState<TitleItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch<TitleResponse>("/api/about");
      setItem(res.data);
      console.log(res);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const items = item ? [item] : [];
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-blue-700 tracking-tight">
            Manajemen About
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola about dan informasinya
          </p>
        </div>

        {/* SUCCESS TOAST */}
        {successMsg && (
          <Alert className="fixed top-4 right-4 bg-green-600 text-white border-green-700 shadow-lg z-50 w-auto">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{successMsg}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={() => {
            setMode("add");
            setSelected(null);
            setOpenForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tambah About
        </Button>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="border-b">
          <div>
            <CardTitle className="text-gray-800">Daftar About</CardTitle>
            <CardDescription className="mt-1">
              Total {items.length} data
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <AboutTable
            items={items}
            loading={loading}
            onEdit={(item) => {
              setMode("edit");
              setSelected(item);
              setOpenForm(true);
            }}
            onDelete={(id) => setDeleteId(id)}
          />
        </CardContent>
      </Card>

      <AboutFormModal
        open={openForm}
        mode={mode}
        data={selected}
        onClose={() => setOpenForm(false)}
        onSuccess={() => {
          load();

          setSuccessMsg(
            mode === "add"
              ? "About berhasil ditambahkan"
              : "About berhasil diperbarui"
          );

          setTimeout(() => setSuccessMsg(null), 2000);
        }}
      />

      <AboutDeleteModal
        id={deleteId}
        onClose={() => setDeleteId(null)}
        onSuccess={() => {
          load();

          setSuccessMsg("About berhasil dihapus");
          setTimeout(() => setSuccessMsg(null), 2000);
        }}
      />
    </div>
  );
}
