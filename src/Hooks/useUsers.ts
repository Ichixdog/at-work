import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "../stores/useUsersStore";
import { api } from "../services/api";
import { useEffect } from "react";

export function useUsers() {
  const activeUsers = useUserStore(
    useShallow((state) => state.getActiveUsers()),
  );

  const archiveUsers = useUserStore(
    useShallow((state) => state.getArchivedUsers()),
  );

  const hiddenUsers = useUserStore(
    useShallow((state) => state.getHiddenUsers()),
  );

  const setUsers = useUserStore((state) => state.setUsers);
  const updateUser = useUserStore((state) => state.updateUser);
  const archiveUser = useUserStore((state) => state.archiveUser);
  const restoreUser = useUserStore((state) => state.restoreUser);
  const hideUser = useUserStore((state) => state.hideUser);
  const unhideUser = useUserStore((state) => state.unhideUser);

  const {
    data: serverUsers,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      console.log("🌐 Загрузка с API...");
      // Искусственная задержка 2 секунды
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const users = await api.getUsers();
      console.log("✅ Загружено:", users.length);
      return users;
    },
  });

  useEffect(() => {
    if (serverUsers) {
      setUsers(serverUsers);
    }
  }, [serverUsers, setUsers]);

  return {
    activeUsers,
    archiveUsers,
    hiddenUsers,
    isLoading,
    error,
    refetch,
    updateUser,
    archiveUser,
    restoreUser,
    hideUser,
    unhideUser,
  };
}
