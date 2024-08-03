'use client'





import supabase from '@/lib/supabase'
import { useEffect, useState } from 'react'
import UserItem from '@/components/user-item'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import { User } from '../types'
import { useChannelStore, useUserStore } from './store'

const UserList = () => {
  const [isLoading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const currentUsr = useUserStore((state) => state.user)
  const setChannel = useChannelStore((state) => state.setChannel)

  useEffect(() => {
    if (currentUsr?.uuid) {
      const channel = supabase.channel('chat__room', {
        config: {
          broadcast: {
            self: true,
          },
        },
      })

      setChannel(channel)

      channel.on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState()
        const users = Object.keys(presenceState)
          .map((presenceId) => {
            const presences = presenceState[presenceId] as unknown as User[]
            return presences
          })
          .flat()
        setUsers(users)
      })

      channel.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setLoading(false)
          channel.track(currentUsr)
        }
      })

      return () => {
        channel.unsubscribe()
        setChannel(null)
      }
    }
  }, [currentUsr, setChannel])

  if (isLoading) {
    return (
      <div className="flex h-full flex-col rounded-md border bg-blue-50 p-3">
        <UserItem loader self />
        <Separator className="my-2" />
        <div className="flex flex-col gap-2">
          {new Array(3).fill(true).map((_, i) => (
            <UserItem key={i} loader />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col rounded-md border bg-blue-50 p-3">
      <UserItem
        name={currentUsr?.name || ''}
        email={currentUsr?.email || ''}
        img={currentUsr?.img}
        self
      />
      <Separator className="my-2" />
      <div className="h-full overflow-auto">
        <ScrollArea className="h-full rounded-lg">
          {users
            .filter(({ uuid }) => uuid !== currentUsr?.uuid)
            .map((props) => (
              <UserItem
                {...props}
                key={props.uuid}
                className="mb-2 last:mb-0"
              />
            ))}
        </ScrollArea>
      </div>
    </div>
  )
}

export default UserList
