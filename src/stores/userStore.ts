import { User } from '@/types/user';
import { create } from 'zustand';

type UserStore = {
  user: User['user'] | null;
  setUser: (user: User['user']) => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User['user']) => set({ user }),
}));

export { useUserStore };
