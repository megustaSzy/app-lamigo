import { useState } from "react";
import { apiFetch } from "@/helpers/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Loader2 } from "lucide-react";

export default function KontenDeleteModal({
  id,
  onClose,
  onSuccess,
}: {
  id: number | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!id) return;

    setLoading(true);
    try {
      await apiFetch(`/api/banner/${id}`, { method: "DELETE" });
      onClose();
      onSuccess();
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={!!id} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <AlertDialogTitle className="text-xl">
              Konfirmasi Hapus
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base">
            Yakin ingin menghapus destinasi ini? Tindakan ini tidak dapat
            dibatalkan dan semua data terkait akan dihapus permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2 sm:gap-2">
          <AlertDialogCancel className="rounded-lg" disabled={loading}>
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 rounded-lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              "Ya, Hapus"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
