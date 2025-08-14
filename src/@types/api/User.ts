export type User = {
  id: string;
  displayName?: string;
  birthdate?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  email?: string;
  token: string;
  refreshToken: string;
  photoURL?: string;
  subscribed: boolean;
  bio?: string;
  notificationTime?: string;
  attributes?: UserAttribute[];
  placeId: string;
};

export type UserAttribute = {
  id: string;
  title: string;
  value: string;
  slug: string;
};
