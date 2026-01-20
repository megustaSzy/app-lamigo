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
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  User,
  Mail,
  Briefcase,
  MessageSquare,
  Star,
} from "lucide-react";

type Props = {
  open: boolean;
  editMode: boolean;
  name: string;
  email: string;
  profession: string;
  comment: string;
  rating: number;
  saving: boolean;
  onClose: () => void;
  onSave: () => void;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setProfession: (v: string) => void;
  setComment: (v: string) => void;
  setRating: (v: number) => void;
};

export default function TestimoniModal(props: Props) {
  return (
    <Dialog open={props.open} onOpenChange={props.onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {props.editMode ? "Edit Testimoni" : "Buat Testimoni"}
          </DialogTitle>
          <DialogDescription>
            {props.editMode
              ? "Perbarui informasi testimoni yang sudah ada"
              : "Tambahkan testimoni baru dari pengguna"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* NAMA */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nama Lengkap
            </Label>
            <div className="relative">
              <Input
                id="name"
                value={props.name}
                onChange={(e) => props.setName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="rounded-lg pl-10"
                disabled={props.saving}
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
                placeholder="contoh@email.com"
                className="rounded-lg pl-10"
                disabled={props.saving}
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* PROFESI */}
          <div className="space-y-2">
            <Label htmlFor="profession" className="text-sm font-medium">
              Profesi
            </Label>
            <div className="relative">
              <Input
                id="profession"
                value={props.profession}
                onChange={(e) => props.setProfession(e.target.value)}
                placeholder="Contoh: Guru, Pengusaha, Mahasiswa"
                className="rounded-lg pl-10"
                disabled={props.saving}
              />
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* KOMENTAR */}
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-sm font-medium">
              Komentar
            </Label>
            <div className="relative">
              <Textarea
                id="comment"
                value={props.comment}
                onChange={(e) => props.setComment(e.target.value)}
                placeholder="Masukkan komentar atau testimoni..."
                className="rounded-lg pl-10 min-h-[100px]"
                disabled={props.saving}
              />
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* RATING */}
          <div className="space-y-2">
            <Label htmlFor="rating" className="text-sm font-medium">
              Rating (1-5)
            </Label>
            <div className="relative">
              <Input
                id="rating"
                type="number"
                min={1}
                max={5}
                value={props.rating}
                onChange={(e) => props.setRating(Number(e.target.value))}
                className="rounded-lg pl-10"
                disabled={props.saving}
              />
              <Star className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500 pointer-events-none" />
            </div>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 cursor-pointer transition-colors ${
                    star <= props.rating
                      ? "fill-amber-500 text-amber-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => !props.saving && props.setRating(star)}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={props.onClose}
            disabled={props.saving}
            className="rounded-lg"
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={props.onSave}
            disabled={
              props.saving || !props.name.trim() || !props.comment.trim()
            }
            className="bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            {props.saving ? (
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
