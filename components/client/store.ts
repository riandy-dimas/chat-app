'use client'

import { create } from 'zustand'
import { User } from '../types'

export const useUserStore = create<{ user: User | null, setUser: (props: User | null) => void }>((set) => ({
  setUser: (user) => set(() => ({ user })),
  user: null
}))
