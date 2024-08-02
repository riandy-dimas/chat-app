'use client'

import supabase from '@/lib/supabase'
import React, { useEffect, useState } from 'react'
import { set } from 'lodash'
import UserItem from '@/components/user-item'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import { User, UserDB } from '../types'
import { REALTIME_LISTEN_TYPES, REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from '@supabase/supabase-js'

const UserList = () => {
  const [isLoading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const currentUserId = "bddfe222-7d9b-4908-9e84-e032064ce7f6"

  const userObj = users
  .reduce((result, {id, ...rest}) => {
    return {...result, [id]: {...rest, id}}
  }, {} as Record<string, User>)
  const currentUser = userObj[currentUserId]

  const getInitialData = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('online-users')
      .select()
    setUsers(() => {
      return data?.map((payload) => ({
        email: payload.email,
        id: payload.id,
        name: payload.name,
        img: `https://i.pravatar.cc/60?u=${payload.email}`
      })) || []
    })
    setLoading(false)
  }

  useEffect(() => {
    getInitialData()
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel("realtime-online-users")
      .on<UserDB>(REALTIME_LISTEN_TYPES.POSTGRES_CHANGES, {
        event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL,
        schema: 'public',
        table: 'online-users'
      }, (payload) => {
        switch (payload.eventType) {
          case 'DELETE':
            setUsers((state) => state.filter(({ id }) => id !== payload.old.id))
            break
          case 'INSERT':
            setUsers((state) => [
              ...state,
              {
                email: payload.new.email,
                id: payload.new.id,
                name: payload.new.name,
                img: `https://i.pravatar.cc/60?u=${payload.new.email}`
              }
            ])
            break
          default:
            setUsers((state) => {
              const user: User = {
                email: payload.new.email,
                id: payload.new.id,
                name: payload.new.name,
                img: `https://i.pravatar.cc/60?u=${payload.new.email}`
              }
              const index = state.findIndex(({id}) => id === payload.new.id)
              set(state, [index], user)
              return state
            })
            break
        }
      }).subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="rounded-md border flex flex-col h-full bg-blue-50 p-3">
        <UserItem loader self />
        <Separator className="my-2" />
        <div className='flex flex-col gap-2'>
          {new Array(3).fill(true).map((_, i) => <UserItem key={i} loader />)}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-md border flex flex-col h-full bg-blue-50 p-3">
      <UserItem {...currentUser} self />
      <Separator className="my-2" />
      <div className='h-full overflow-auto'>
        <ScrollArea className="h-full rounded-lg">
          {
            users
              .filter(({ id }) => id !== currentUserId)
              .map((props) => (
                <UserItem
                  {...props}
                  key={props.id}
                  className='mb-2 last:mb-0'
                />
              ))
          }
        </ScrollArea>
      </div>
    </div>
  )
}

export default UserList