export type LoginApiResponse = {
  status: number;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      notelp: string;
      role: "Admin" | "User";
      provider: string;
      providerId: string | null;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
    refreshToken: string;
  };
};

export interface LoginUser {
  id: number;
  name: string;
  email: string;
  notelp: string;
  role: string;
  provider: string;
  providerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    user: LoginUser;
    accessToken: string;
    refreshToken: string;
  };
}