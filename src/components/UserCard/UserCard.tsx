import type { User } from "../../types/usersType";
import styles from "./UserCard.module.scss"
import avatarCard from "../../assets/images/avatar-card.png"
import avatarCardMob from "../../assets/images/avatar-card-mob.png"
import { useState } from "react";

interface UserCardProps {
    user: User;
    onEdit: (id: number) => void;
    onArchive: (id: number) => void;
    onRestore: (id: number) => void;
    onHide: (id: number) => void;
    isProcessing?: boolean;
}

export const UserCard = ({user, onEdit, onArchive, onRestore, onHide, isProcessing}: UserCardProps) => {

const isArchived = user.isArchived;
const [ dropDownOpen, setDropDownOpen ] = useState(false)

    return(
        <>
        <div className={`${styles.userCard} ${user.isArchived ? styles.archived : ""}`}>
            <div className={styles.avatar}>
                <img src={avatarCard} alt="" className={styles.avatarCard}/>
                <img src={avatarCardMob} alt="" className={styles.avatarCardMob} />
            </div>
            <div className={styles.info}>
                <div className={styles.infoTop}>
                    <div className={styles.userName}><span>{user.username}</span>
                        <svg onClick={() => setDropDownOpen(prev => !prev)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_11_6806)">
                <path d="M10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16C10.9 16 10 16.9 10 18ZM10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6ZM10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12Z" fill="#161616"/>
                </g>
                <defs>
                <clipPath id="clip0_11_6806">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                {dropDownOpen && (
                    <div className={styles.dropDownMenu} onMouseLeave={() => setDropDownOpen(prev => !prev)}>
                    {user.isArchived ? (
                        <div className={styles.dropDownMenuItem} onClick={() => onRestore(user.id)}>Активировать</div>
                    ) : (
                        <>
                            <div className={styles.dropDownMenuItem} onClick={() => onEdit(user.id)}>Редактировать</div>
                            <div className={styles.dropDownMenuItem} onClick={() => onArchive(user.id)}>Архивировать</div>
                            <div className={styles.dropDownMenuItem} onClick={() => onHide(user.id)}>Скрыть</div>
                        </>
                    )}
                </div>
                )}
                    </div>
                    <div className={styles.userWork}>{user.company?.name}</div>
                </div>
                <div className={styles.infoBot}>
                    <div className={styles.userCity}>{user.address?.city}</div>
                </div>
            </div>
        </div>
        </>
    )
}