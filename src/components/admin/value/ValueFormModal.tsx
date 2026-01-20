"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ValueItem } from "@/types/value";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, FileText, Upload, Hash, Heading } from "lucide-react";

type Props = {
  open: boolean;
  mode: "add" | "edit";
  data: ValueItem | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ValueFormModal({
  open,
  mode,
  data,
  onClose,
  onSuccess,
}: Props) {
  const token = Cookies.get("accessToken");

  const [header, setHeader] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (data) {
      // edit
      setHeader(data.header);
      setName(data.name);
      setImage(null);
    } else {
      // add
      setHeader("");
      setName("");
      setImage(null);
    }
  }, [data, open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();

      fd.append("header", header);
      fd.append("name", name);
      if (image) {
        fd.append("image", image);
      }

      const url =
        mode === "add"
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/about/value`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/about/value/${data!.id}`;

      await fetch(url, {
        method: mode === "add" ? "POST" : "PATCH",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      });

      onClose();
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] rounded-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle className="text-xl">
              {mode === "add" ? "Tambah Konten" : "Edit Konten"}
            </DialogTitle>
            <DialogDescription>
              {mode === "add"
                ? "Tambahkan konten baru ke dalam sistem"
                : "Perbarui informasi konten yang sudah ada"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* NAME */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nama
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Isi Konten"
                  className="rounded-lg pl-10"
                  disabled={loading}
                  required
                />
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* HEADER */}
            <div className="space-y-2">
              <Label htmlFor="header" className="text-sm font-medium">
                Header
              </Label>
              <div className="relative">
                <Input
                  id="header"
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
                  placeholder="Contoh: Rating"
                  className="rounded-lg pl-10"
                  disabled={loading}
                  required
                />
                <Heading className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* IMAGE */}
            <div className="space-y-2">
              <Label htmlFor="image" className="text-sm font-medium">
                Gambar {mode === "edit" && "(Opsional)"}
              </Label>

              <div className="relative">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                  disabled={loading}
                  className="rounded-lg file:mr-4 file:px-4 file:py-2
                    file:rounded-lg file:border-0 file:text-sm
                    file:font-medium file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100 cursor-pointer"
                />
                <Upload className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              {mode === "edit" && (
                <p className="text-xs text-muted-foreground">
                  Kosongkan jika tidak ingin mengubah gambar
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading || !header.trim() || !name}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
