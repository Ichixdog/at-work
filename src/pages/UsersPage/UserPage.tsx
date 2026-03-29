import { useState } from "react";
import { UserCard } from "../../components/UserCard/UserCard";
import { useUsers } from "../../Hooks/useUsers";
import styles from "./UserPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useUserStore } from "../../stores/useUsersStore";

export const UserPage = () => {
  const { isLoading } = useUsers();
  const [processingId, setProcessingId] = useState<number | null>(null);
  const navigate = useNavigate();
  const activeUsers = useUserStore(
    useShallow((state) => {
      const result = state.getActiveUsers();
      return result;
    }),
  );

  const archiveUsers = useUserStore(
    useShallow((state) => {
      const result = state.getArchivedUsers();
      return result;
    }),
  );

  const archiveUser = useUserStore((state) => state.archiveUser);
  const restoreUser = useUserStore((state) => state.restoreUser);
  const hideUser = useUserStore((state) => state.hideUser);

  const handleEdit = (id: number) => navigate(`/users/${id}/edit`);
  const handleArchive = (id: number) => {
    setProcessingId(id);
    archiveUser(id);
    setProcessingId(null);
  };
  const handleRestore = (id: number) => {
    setProcessingId(id);
    restoreUser(id);
    setProcessingId(null);
  };
  const handleHide = (id: number) => {
    setProcessingId(id);
    hideUser(id);
    setProcessingId(null);
  };

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <p>Загрузка пользователей...</p>
      </div>
    );
  }

  return (
    <>
      <section className={styles.userPage}>
        <div className={styles.container}>
          <div className={styles.userPageWrapper}>
            <div className={styles.userPageTitle}>Активные</div>
            <div className={styles.userList}>
              {activeUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={handleEdit}
                  onArchive={handleArchive}
                  onRestore={handleRestore}
                  onHide={handleHide}
                  isProcessing={processingId === user.id}
                />
              ))}
            </div>
          </div>
          <div className={styles.userPageWrapper}>
            <div className={styles.userPageTitle}>Архивные</div>
            <div className={styles.userList}>
              {archiveUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={handleEdit}
                  onArchive={handleArchive}
                  onRestore={handleRestore}
                  onHide={handleHide}
                  isProcessing={processingId === user.id}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
