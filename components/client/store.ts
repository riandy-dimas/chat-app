'use client'

import { create } from 'zustand'
import { User } from '../types'
import { RealtimeChannel } from '@supabase/supabase-js'

export const useUserStore = create<{
  user: User | null,
  setUser: (props: User | null) => void
}>((set) => ({
  setUser: (user) => set(() => ({ user })),
  user: null
}))

export const useChannelStore = create<{
  channel: RealtimeChannel | null,
  setChannel: (props: RealtimeChannel | null) => void
}>((set) => ({
  setChannel: (channel) => set(() => ({ channel })),
  channel: null
}))