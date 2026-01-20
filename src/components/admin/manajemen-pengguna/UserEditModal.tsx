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
import { Loader2, User, Mail, Phone } from "lucide-react";

type Props = {
  open: boolean;
  nameInput: string;
  emailInput: string;
  notelpInput: string;
  saving: boolean;
  onClose: () => void;
  onSave: () => void;
  onNameChange: (v: string) => void;
  onNotelpChange: (v: string) => void;
};

export default function UserEditModal({
  open,
  nameInput,
  emailInput,
  notelpInput,
  saving,
  onClose,
  onSave,
  onNameChange,
  onNotelpChange,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Pengguna</DialogTitle>
          <DialogDescription>
            Perbarui informasi pengguna yang sudah terdaftar
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nama Lengkap
            </Label>
            <div className="relative">
              <Input
                id="name"
                value={nameInput}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="rounded-lg pl-10"
                disabled={saving}
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                value={emailInput}
                disabled
                className="rounded-lg pl-10 bg-gray-100 cursor-not-allowed"
                placeholder="Email"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <p className="text-xs text-muted-foreground">
              Email tidak dapat diubah
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notelp" className="text-sm font-medium">
              No. Telepon
            </Label>
            <div className="relative">
              <Input
                id="notelp"
                value={notelpInput}
                onChange={(e) => onNotelpChange(e.target.value)}
                placeholder="Contoh: 08123456789"
                className="rounded-lg pl-10"
                disabled={saving}
                type="tel"
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
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
