import { CategoryItem } from "@/types/category";

export type WisataTableProps = {
  cats: CategoryItem[];
  deletingId: number | null;
  onEdit: (cat: CategoryItem) => void;
  onDelete: (id: number) => void;
};

export type WisataFormModalProps = {
  open: boolean;
  editId: number | null;
  nameInput: string;
  saving: boolean;
  onClose: () => void;
  onSave: () => void;
  onNameChange: (val: string) => void;
};

export type WisataDeleteModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};
