export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

export type TestimoniItem = {
  id: number;
  name?: string;
  email?: string;
  profession?: string;
  comment: string;
  rating?: number;
  approvalStatus: ApprovalStatus;
  createdAt: string;
};

export type ApiTestimoniResponse = {
  data: {
    items: TestimoniItem[];
  };
};

export type TestimoniDeleteModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};
