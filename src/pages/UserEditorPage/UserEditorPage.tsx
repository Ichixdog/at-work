import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserEditorPage.module.scss";
import { useUsers } from "../../Hooks/useUsers";
import avatar from "../../assets/images/avatar.png";
import { UserForm } from "../../components/UserForm/UserForm";
import { useEffect, useRef, useState } from "react";
import success from "../../assets/images/success.png";

export const UserEditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const [submited, setSubmited] = useState(false);

  const navigate = useNavigate();
  const { activeUsers, updateUser } = useUsers();

  const userId = id ? parseInt(id) : null;
  const user = [...activeUsers].find((u) => u.id === userId);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleBack = () => {
    navigate("/");
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleSubmit = (formData: any) => {
    if (!userId) return;

    const updateData = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      company: { name: formData.company },
      address: { city: formData.city },
    };

    updateUser(userId, updateData);

    setSubmited(true);

    clearTimer();

    timerRef.current = setTimeout(() => {
      setSubmited(false);
      handleBack();
    }, 4000);
  };

  const handleCloseModal = () => {
    clearTimer();
    setSubmited(false);
    handleBack();
  };

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  if (!user && userId) {
    handleBack();
    return null;
  }

  return (
    <>
      <div className={styles.UserEditorPage}>
        <div className={styles.container}>
          <div className={styles.back}>
            <svg
              className={styles.arrowIcon}
              onClick={() => handleBack()}
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.125 14H0.875"
                stroke="#595959"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 20.125L0.875 14L7 7.875"
                stroke="#595959"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className={styles.arrowIconMob}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.7803 16.5303C13.4874 16.8232 13.0126 16.8232 12.7197 16.5303L8.71967 12.5303C8.42678 12.2374 8.42678 11.7626 8.71967 11.4697L12.7197 7.46967C13.0126 7.17678 13.4874 7.17678 13.7803 7.46967C14.0732 7.76256 14.0732 8.23744 13.7803 8.53033L10.3107 12L13.7803 15.4697C14.0732 15.7626 14.0732 16.2374 13.7803 16.5303Z"
                fill="#595959"
              />
            </svg>
            <span onClick={() => handleBack()}>Назад</span>
          </div>
          <div className={styles.UserEditorPageMain}>
            <div className={styles.info}>
              <div className={styles.infoImg}>
                <img src={avatar} alt="" />
              </div>
              <div className={styles.infoDetailed}>
                <div className={styles.infoTitle}>Данные профиля</div>
                <div className={styles.infoDesc}>Рабочее пространство</div>
                <div className={styles.infoDesc}>Приватность</div>
                <div className={styles.infoDesc}>Безопастность</div>
              </div>
            </div>
            <div className={styles.editor}>
              <div className={styles.editorTitle}>Данные профиля</div>
              <UserForm user={user!} onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
      {submited && (
        <div className={styles.modalWrapper}>
          <div className={styles.modal}>
            <svg
              onClick={() => handleCloseModal()}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.2433 16.494C25.585 16.1523 25.585 15.5982 25.2433 15.2565C24.9016 14.9148 24.3476 14.9148 24.0059 15.2565L20.4998 18.7626L16.9937 15.2565C16.652 14.9148 16.098 14.9148 15.7563 15.2565C15.4146 15.5982 15.4146 16.1523 15.7563 16.494L19.2624 20L15.7563 23.5061C15.4146 23.8478 15.4146 24.4018 15.7563 24.7435C16.098 25.0852 16.652 25.0852 16.9937 24.7435L20.4998 21.2375L24.0059 24.7435C24.3476 25.0853 24.9016 25.0853 25.2433 24.7435C25.585 24.4018 25.585 23.8478 25.2433 23.5061L21.7372 20L25.2433 16.494Z"
                fill="#595959"
              />
            </svg>
            <img src={success} alt="" />
            <div className={styles.modalText}>Изменения сохранены!</div>
          </div>
        </div>
      )}
    </>
  );
};
