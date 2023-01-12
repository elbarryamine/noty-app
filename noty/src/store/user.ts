import create, {StateCreator} from 'zustand';
import {persist} from 'zustand/middleware';

export type UserStore = {
  token: string | null;
  setToken: (token: string) => void;
  removeUser: () => void;
};

const reducer: StateCreator<UserStore, [], never, UserStore> = set => ({
  token: '',
  setToken: (token: string) => {
    set(state => ({...state, token}));
  },
  removeUser: () => {
    set(state => ({...state, token: null}));
  },
});

export const useUserStore = create<UserStore>(persist(reducer, {name: 'user'}));
