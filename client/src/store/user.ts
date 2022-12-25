import create, { StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserStore = { token: string; setToken: (token: string) => void };

const reducer: StateCreator<UserStore, [], never, UserStore> = (set) => ({
  token: '',
  setToken: (token: string) => {
    set((state) => ({ ...state, token }));
  },
});

export const useUserStore = create<UserStore>(persist(reducer, { name: 'user' }));
