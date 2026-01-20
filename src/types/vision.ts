export interface VisionType {
  status: number;
  message: string;
  data: VisionData;
}

export interface VisionData {
  id: number;
  title: string;
  history: string;
  vision: string;
  mission: string;
  createdAt: string;
  updatedAt: string;
}