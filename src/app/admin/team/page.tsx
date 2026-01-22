"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/helpers/api";
import {
  ApiDestinationItem,
  ApiDestinationsResponse,
} from "@/types/destination";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import DestinasiTable from "@/components/admin/destinasi/DestinasiTable";
import DestinasiFormModal from "@/components/admin/destinasi/DestinasiFormModal";
import DestinasiDeleteModal from "@/components/admin/destinasi/DestinasiDeleteModal";

export default function TeamPage() {
  const [items, setItems] = useState<ApiDestinationItem[]>([]);
  const [loading, setLoading] = useState(true);

  // pagination
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  // modal state
  const [openForm, setOpenForm] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selected, setSelected] = useState<ApiDestinationItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch<ApiDestinationsResponse>(
        `/api/destinations?page=${page}&limit=${limit}`
      );
      setItems(res.data.items);
      setTotalPages(res.data.total_pages);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-blue-700 tracking-tight">
            Manajemen Destinasi
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola destinasi wisata dan informasinya
          </p>
        </div>

        <Button
          onClick={() => {
            setMode("add");
            setSelected(null);
            setOpenForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tambah Destinasi
        </Button>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="border-b">
          <div>
            <CardTitle className="text-gray-800">Daftar Destinasi</CardTitle>
            <CardDescription className="mt-1">
              Halaman {page} dari {totalPages}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <DestinasiTable
            items={items}
            loading={loading}
            page={page}
            limit={limit}
            totalPages={totalPages}
            onPageChange={setPage}
            onEdit={(item) => {
              setMode("edit");
              setSelected(item);
              setOpenForm(true);
            }}
            onDelete={(id) => setDeleteId(id)}
          />
        </CardContent>
      </Card>

      <DestinasiFormModal
        open={openForm}
        mode={mode}
        data={selected}
        onClose={() => setOpenForm(false)}
        onSuccess={load}
      />

      <DestinasiDeleteModal
        id={deleteId}
        onClose={() => setDeleteId(null)}
        onSuccess={load}
      />
    </div>
  );
}
