"use client";

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
import { Loader2, MapPin } from "lucide-react";

type Props = {
  open: boolean;
  editId: number | null;
  nameInput: string;
  saving: boolean;
  onClose: () => void;
  onSave: () => void;
  onNameChange: (v: string) => void;
};

export default function PickupFormModal({
  open,
  editId,
  nameInput,
  saving,
  onClose,
  onSave,
  onNameChange,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {editId ? "Edit Lokasi Pickup" : "Tambah Lokasi Pickup"}
          </DialogTitle>
          <DialogDescription>
            {editId
              ? "Perbarui informasi lokasi pickup yang sudah ada"
              : "Tambahkan lokasi pickup baru untuk penjemputan wisatawan"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nama Lokasi
            </Label>
            <div className="relative">
              <Input
                id="name"
                value={nameInput}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Contoh: Hotel Grand Elty, Stasiun Tanjung Karang"
                className="rounded-lg pl-10"
                disabled={saving}
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <p className="text-xs text-muted-foreground">
              Masukkan nama lokasi yang akan dijadikan titik penjemputan
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
