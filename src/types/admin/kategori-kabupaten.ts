import { RegionItem } from "@/types/region";

export type KabupatenTableProps = {
  regions: RegionItem[];
  page: number;
  perPage: number;
  deletingId: number | null;
  onEdit: (region: RegionItem) => void;
  onDelete: (id: number) => void;
};

export type KabupatenFormModalProps = {
  open: boolean;
  editId: number | null;
  nameInput: string;
  saving: boolean;
  onClose: () => void;
  onSave: () => void;
  onNameChange: (val: string) => void;
  onImageChange: (file: File | null) => void;
};

export type KabupatenDeleteModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};
