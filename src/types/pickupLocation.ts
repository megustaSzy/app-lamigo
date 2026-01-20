// Interface response dari backend
 export interface ApiPickupItem {
  no: number;
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiPickupResponse {
  status: number;
  message: string;
  data: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
    items: ApiPickupItem[];
    links: {
      prev: string | null;
      next: string | null;
    };
  };
}

// Type untuk UI
export interface PickupType {
  id: number;
  name: string;
}
