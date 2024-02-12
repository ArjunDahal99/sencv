import { UserType } from '@/types/UserTypes'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UserAuthState
{
    user: UserType | null;
    isLoggedIn: boolean;
    setUserAuth: (userData: UserType | null) => void; // Define setUserAuth function signature
}

export const useUserStore = create<UserAuthState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                isLoggedIn: false,
                setUserAuth: (userData: UserType | null) =>
                {
                    if (!userData)
                    {
                        set({ user: userData, isLoggedIn: false });
                    }
                    else
                    {
                        set({ user: userData, isLoggedIn: true });
                    }
                },
            }),
            { name: 'userStore' },
        ),
    ),
);
