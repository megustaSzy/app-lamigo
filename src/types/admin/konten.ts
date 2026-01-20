export interface KontenItem {
  id: number;
  number: string;
  header: string;
  name: string;
  imageUrl: string;
  imagePublicId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface KontenResponse {
  status: number;
  message: string;
  data: KontenItem[];
}
