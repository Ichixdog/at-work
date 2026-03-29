import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UpdateUserDTO, User } from "../types/usersType";

interface UserState {
    users: User[]

    setUsers: (users: User[]) => void
    updateUser: (id: number, data: UpdateUserDTO) => void
    archiveUser: (id: number) => void
    restoreUser: (id: number) => void
    hideUser: (id: number) => void
    unhideUser: (id: number) => void

    getActiveUsers: () => User[]
    getArchivedUsers: () => User[]
    getHiddenUsers: () => User[]
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            users: [],

            setUsers: (users) => set({users}),

            updateUser: (id, data) => {
                set(state => ({
                    users: state.users.map(user => user.id === id ? {...user, ...data} : user)
                }))
            },

            archiveUser: (id) => {
                set(state => ({
                    users: state.users.map(user => user.id === id ? {...user, isArchived: true} : user)
                }))
            },

            restoreUser: (id) => {
                set(state => ({
                    users: state.users.map(user => user.id === id ? {...user, isArchived: false} : user)
                }))
            },

            hideUser: (id) => {
                set(state => ({
                    users: state.users.map(user => user.id === id ? {...user, isHidden: true} : user)
                }))
            },

            unhideUser: (id) => {
                set(state => ({
                    users: state.users.map(user => user.id === id ? {...user, isHidden: false} : user)
                }))
            },

            getActiveUsers: () => {
                return get().users.filter(user => !user.isArchived && !user.isHidden)
            },

            getArchivedUsers: () => {
                return get().users.filter(user => user.isArchived && !user.isHidden)
            },

            getHiddenUsers: () => {
                return get().users.filter(user => user.isHidden)
            }
        }),
        {
            name: "user-storage",
            partialize: (state) => ({
                users: state.users,
            })
        }
    )
)