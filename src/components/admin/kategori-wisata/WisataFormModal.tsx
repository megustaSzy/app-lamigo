"use client";

import { WisataFormModalProps } from "@/types/admin/kategori-wisata";
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
import { Loader2, Tag } from "lucide-react";

export default function WisataFormModal({
  open,
  editId,
  nameInput,
  saving,
  onClose,
  onSave,
  onNameChange,
}: WisataFormModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {editId ? "Edit Kategori" : "Tambah Kategori"}
          </DialogTitle>
          <DialogDescription>
            {editId
              ? "Perbarui nama kategori wisata yang sudah ada"
              : "Tambahkan kategori wisata baru ke dalam sistem"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nama Kategori
            </Label>
            <div className="relative">
              <Input
                id="name"
                value={nameInput}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Contoh: Pantai, Gunung, Budaya"
                className="rounded-lg pl-10"
                disabled={saving}
              />
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <p className="text-xs text-muted-foreground">
              Masukkan nama kategori untuk mengelompokkan destinasi wisata
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg"
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={onSave}
            disabled={saving || !nameInput.trim()}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Simpan"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
