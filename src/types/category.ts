export type DestinationItem = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
};

export type CategoryItem = {
  no: number;
  id: number;
  name: string;
  destinations: DestinationItem[];
};

export interface ApiBaseResponse {
  status: number;
  message: string;
}

export type ApiCategoryResponse = {
  status: number;
  message: string;
  data: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
    items: CategoryItem[];
    links: {
      prev: string | null;
      next: string | null;
    };
  };
};
