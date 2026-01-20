export interface ValueItem {
  id: number;
  header: string;
  name: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ValueType {
  status: number;
  message: string;
  data: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
    items: ValueItem[];
    links: {
      prev: string | null;
      next: string | null;
    };
  };
}
