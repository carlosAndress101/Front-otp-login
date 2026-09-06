import { create } from 'zustand';
import type { AuthState } from '../types';

export const useAuthStore = create<AuthState>((set) => ({
  auth: {
    username: '',
    active: false,
  },
  setUsername: (name: string) => set((state) => ({ auth: { ...state.auth, username: name } })),
}));
