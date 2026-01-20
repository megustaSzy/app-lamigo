export interface HistoryType {
  status: number;
  message: string;
  data: HistoryData;
}

export interface HistoryData {
  id: number;
  title: string;
  history: string;
  vision: string;
  mission: string;
  createdAt: string;
  updatedAt: string;
}