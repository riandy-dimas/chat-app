'use client'

import supabase from '@/lib/supabase'
import { useEffect, useState } from 'react'
import UserItem from '@/components/user-item'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { User } from '@/components/types'
import { useChannelStore, useUserStore } from './store'
import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable'
import { Ghost, UsersIcon } from 'lucide-react'
import { cn, getInitials } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '../ui/skeleton'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'

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
      <>
        <div
          className={cn(
            'absolute left-0 right-0 top-0 z-10 h-16 w-dvw bg-blue-500 p-3',
            'flex justify-between rounded-b-sm shadow sm:hidden'
          )}
        >
          <div className="grid grid-cols-[40px_1fr] gap-2">
            <div>
              <Skeleton className="h-[40px] w-[40px] rounded-full" />
            </div>
            <div className="grid grid-rows-2 gap-1 overflow-hidden pt-0.5">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
          </div>
          <Button
            variant="outline"
            disabled
            className="border-amber-500"
            size="icon"
          >
            <UsersIcon />
          </Button>
        </div>
        <ResizablePanel
          id="user-list"
          order={1}
          defaultSize={35}
          minSize={25}
          maxSize={50}
          className="relative hidden grow-0 bg-blue-400 p-0 sm:block sm:p-3"
        >
          <div className="flex h-full flex-col bg-blue-50 p-3 sm:rounded-md sm:border">
            <UserItem loader self />
            <Separator className="my-2" />
            <div className="flex flex-col gap-2">
              {new Array(3).fill(true).map((_, i) => (
                <UserItem key={i} loader />
              ))}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle className="hidden sm:block" />
      </>
    )
  }

  const renderList = () => (
    <div className="h-[600px] overflow-auto">
      <ScrollArea className="h-full rounded-lg">
        {users
          .filter(({ uuid }) => uuid !== currentUsr?.uuid)
          .map((props) => (
            <UserItem {...props} key={props.uuid} className="mb-2 last:mb-0" />
          ))}
        {users.length === 1 && (
          <div className="my-6 flex flex-col items-center justify-center gap-3">
            <Ghost className="h-12 w-12 text-slate-400" />
            <p className="text-sm font-light text-slate-400">
              No one listening to you :(
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  )

  return (
    <>
      <div
        className={cn(
          'absolute left-0 right-0 top-0 z-10 h-16 w-dvw bg-blue-500 p-3',
          'flex justify-between rounded-b-sm shadow sm:hidden'
        )}
      >
        <div className="relative grid max-w-[70%] grid-cols-[40px_1fr] gap-2">
          <div>
            <Avatar className="h-[40px] w-[40px]">
              <AvatarImage src={currentUsr?.img} alt="avatar" />
              <AvatarFallback>{getInitials(currentUsr?.name)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="grid grid-rows-2 pt-0.5">
            <h3 className="overflow-hidden text-ellipsis text-nowrap text-sm font-semibold text-slate-50">
              {currentUsr?.name}
            </h3>
            <p className="overflow-hidden text-ellipsis text-nowrap text-xs text-muted-foreground text-slate-300">
              {currentUsr?.email}
            </p>
          </div>
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="border-amber-500 text-amber-400"
              size="icon"
            >
              <UsersIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-blue-200">
            <div className="mx-auto mt-3 w-full max-w-sm p-3 pt-0">
              {renderList()}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <ResizablePanel
        id="user-list"
        order={1}
        defaultSize={35}
        minSize={25}
        maxSize={50}
        className="relative hidden grow-0 bg-blue-400 p-0 sm:block sm:p-3"
      >
        <div className="flex h-full flex-col bg-blue-50 p-3 sm:rounded-md sm:border">
          <UserItem
            name={currentUsr?.name || ''}
            email={currentUsr?.email || ''}
            img={currentUsr?.img}
            self
          />
          <Separator className="my-2" />
          {renderList()}
        </div>
      </ResizablePanel>
      <ResizableHandle className="hidden sm:block" />
    </>
  )
}

export default UserList
