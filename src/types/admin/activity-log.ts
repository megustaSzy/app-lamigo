export type AdminActivityLogItem = {
  id: number;
  description: string;
  createdAt: string;
};

export type AdminActivityLogResponse = {
  data: {
    items: AdminActivityLogItem[];
    page: number;
    limit: number;
    total_items: number;
    total_pages: number;
  };
};
