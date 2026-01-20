export interface TitleType {
  status: number;
  message: string;
  data: TitleData;
}

export interface TitleData {
  id: number;
  title: string;
  history: string;
  vision: string;
  mission: string;
  createdAt: string;
  updatedAt: string;
}