
export interface TitleItem {
  id: number;
  title: string;
  history: string;
  vision: string;
  mission: string;
  createdAt: string;
  updatedAt: string;
}
export interface TitleResponse {
  status: number;
  message: string;
  data: TitleItem;
}
