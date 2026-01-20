export interface MissionType {
  status: number;
  message: string;
  data: MissionData;
}

export interface MissionData {
  id: number;
  title: string;
  history: string;
  vision: string;
  mission: string;
  createdAt: string;
  updatedAt: string;
}