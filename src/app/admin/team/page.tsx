"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/helpers/api";
import { TeamItem, TeamResponse } from "@/types/admin/team";
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

import TeamTable from "@/components/admin/team/TeamTable";
import TeamFormModal from "@/components/admin/team/TeamFormModal";
import TeamDeleteModal from "@/components/admin/team/TeamDeleteModal";

export default function KontenPage() {
  const [items, setItems] = useState<TeamItem[]>([]);
  const [loading, setLoading] = useState(true);

  // modal state
  const [openForm, setOpenForm] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selected, setSelected] = useState<TeamItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch<TeamResponse>("/api/team");
      setItems(res.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-blue-700 tracking-tight">
            Manajemen Team
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola team dan informasinya
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
          Tambah Team
        </Button>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="border-b">
          <div>
            <CardTitle className="text-gray-800">Daftar Team</CardTitle>
            <CardDescription className="mt-1">
              Total {items.length} data
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <TeamTable
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

      <TeamFormModal
        open={openForm}
        mode={mode}
        data={selected}
        onClose={() => setOpenForm(false)}
        onSuccess={() => {
          load();

          setSuccessMsg(
            mode === "add"
              ? "Team berhasil ditambahkan"
              : "Team berhasil diperbarui",
          );

          setTimeout(() => setSuccessMsg(null), 2000);
        }}
      />

      <TeamDeleteModal
        id={deleteId}
        onClose={() => setDeleteId(null)}
        onSuccess={() => {
          load();

          setSuccessMsg("Team berhasil dihapus");
          setTimeout(() => setSuccessMsg(null), 2000);
        }}
      />
    </div>
  );
}
