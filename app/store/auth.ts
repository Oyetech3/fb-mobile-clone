import { create } from 'zustand'

interface AuthState {
  token: string | null,
  name: string ,
  setToken: (token: string | null) => void
  setName: (name: string ) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  name: '',
  setToken: (token) => set({ token }),
  setName: (name) => set({name})
}))
