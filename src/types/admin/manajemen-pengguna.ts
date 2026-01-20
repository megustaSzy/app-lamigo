export interface UserItem {
  id: number;
  name: string;
  email: string;
  notelp: string | null;
}

export interface ApiUsersResponse {
  data: {
    items: UserItem[];
    total_pages: number;
  };
}

export interface ApiBaseResponse {
  message: string;
}
