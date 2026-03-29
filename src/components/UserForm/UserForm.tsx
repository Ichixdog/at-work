import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./UserForm.module.scss";
import type { User } from "../../types/usersType";

const userSchema = z.object({
    name: z.string().min(2, "Минимум 2 символа").max(64, "Максимум 64 символа"),
    username: z.string().min(2, "Минимум 2 символа").max(64, "Максимум 64 символа"),
    email: z.string().email("Некорректный email"),
    phone: z.string().optional().refine(val => !val || /^[\d-]+$/.test(val), 'Только цифры и дефис'),
    company: z.string().min(2, "Минимум 2 символа").max(64, "Максимум 64 символа"),
    city: z.string().min(2, "Минимум 2 символа").max(64, "Максимум 64 символа"),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
    user: User;
    onSubmit: (data: UserFormData) => void;
    isLoading?: boolean;
}

export function UserForm({ user, onSubmit, isLoading }: UserFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone || "",
            company: user.company?.name || "",
            city: user.address?.city || "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.field}>
                <label>Имя </label>
                <input {...register("name")} />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.field}>
                <label>Никнейм </label>
                <input {...register("username")} />
                {errors.username && <span className={styles.error}>{errors.username.message}</span>}
            </div>

            <div className={styles.field}>
                <label>Почта </label>
                <input {...register("email")} />
                {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>

            <div className={styles.field}>
                <label>Город</label>
                <input {...register("city")} />
                {errors.city && <span className={styles.error}>{errors.city.message}</span>}
            </div>

            <div className={styles.field}>
                <label>Телефон</label>
                <input {...register("phone")} />
                {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
            </div>

            <div className={styles.field}>
                <label>Название компании</label>
                <input {...register("company")} />
                {errors.company && <span className={styles.error}>{errors.company.message}</span>}
            </div>

            <button type="submit" disabled={isLoading} className={styles.submitBtn}>
                {isLoading ? "Сохранение..." : "Сохранить"}
            </button>
        </form>
    );
}