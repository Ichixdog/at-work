export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  company?: {
    name: string;
  };
  address?: {
    city: string;
  };
  isArchived: boolean;
  isHidden: boolean;
  archivedAt?: string;
}

export type UpdateUserDTO = Partial<Pick<User, "name" | "email" | "username" | "phone">> & {
  company?: {name: string};
  address?: {city: string};
};