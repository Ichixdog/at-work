import type { User } from "../types/usersType";

const API_BASE = "https://jsonplaceholder.typicode.com";

export const api = {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE}/users`);
    if (!response.ok) throw new Error("Ошибка загрузки");
    const users = await response.json();

    return users.map((user: User) => ({
      ...user,
      isArchived: false,
      isHidden: false,
    }));
  },
};
