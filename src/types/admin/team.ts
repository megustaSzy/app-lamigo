export interface TeamItem {
  id: number;
  name: string;
  job: string;
  imageUrl: string;
  imagePublicId: string | null;
}

export interface TeamResponse {
  status: number;
  message: string;
  data: TeamItem[];
}
