export interface ApiDestinationItem {
  id: number;
  name: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  description: string | null;
  price: number;
  include: string[];
  ketentuan: string[];
  perhatian: string[];
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
  region: {
    id: number;
    name: string;
  };
}

// Bentuk response API
export interface ApiDestinationsResponse {
  status: number;
  message: string;
  data: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
    items: ApiDestinationItem[];
  };
}

export interface DestinationsType {
  id: number;
  name: string;
  imageUrl: string | null;
  description: string;
  price: number;
  include: string[];
  ketentuan: string[];
  perhatian: string[];
  category: {
    id: number;
    name: string;
  };
  region: {
    id: number;
    name: string;
  };
}
