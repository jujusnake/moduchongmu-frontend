import { User } from '@/types/user';
import { create } from 'zustand';

type UserStore = {
  user: User['user'] | null;
  setUser: (user: User['user'] | null) => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export { useUserStore };
