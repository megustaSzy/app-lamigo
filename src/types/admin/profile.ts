export type Profile = {
  id: number;
  name: string;
  email: string;
  notelp?: string | null;
  role: string;
  avatar?: string | undefined;
  avatarPublicId?: string | null;
};

export type ProfileFormState = {
  name: string;
  email: string;
  notelp: string;
  password: string;
};
