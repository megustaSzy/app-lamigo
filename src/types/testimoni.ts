export type TestimoniItem = {
  no: number;
  id: number;
  name: string | null;
  email: string | null;
  profession: string | null;
  comment: string;
  rating: number;
  approvalStatus: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse = {
  status: number;
  message: string;
  data: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
    items: TestimoniItem[];
  };
};
