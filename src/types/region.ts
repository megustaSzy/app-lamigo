export interface RegionItem {
  id: number;
  name: string;
  imageUrl?: string;
}

export interface RegionApiResponse {
  status: number;
  message: string;
  data: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
    items: RegionItem[];
  };
}

export interface Area {
  id: number;
  nama: string;
}

export interface ReverseGeocodeResponse {
  address?: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
  };
}
