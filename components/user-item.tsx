import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn, getInitials } from '@/lib/utils'
import { Badge } from './ui/badge'
import { Skeleton } from './ui/skeleton'

type UserItemProps = {
  self?: boolean
  name: string
  email: string
  img?: string
  className?: string
  loader?: never
}
type UserItemLoaderProps = {
  loader: true
  self?: boolean
  name?: never
  email?: never
  img?: never
  className?: never
}
const UserItem = ({ name, email, self, img, className, loader }: UserItemProps | UserItemLoaderProps) => {
  if (loader) {
    return (
      <div
        className={
          cn(
            'border border-blue-100 bg-slate-50 rounded-lg p-3 px-2 grid gap-3 grid-cols-[40px_1fr] items-center relative',
            self && 'bg-amber-50 border-amber-200',
            className,
          )
        }
      >
        {self && <Badge className='absolute -top-2.5 -right-2.5 text-amber-700'>You</Badge>}
        <div>
          <Skeleton className="h-[40px] w-[40px] rounded-full" />
        </div>
        <div className='grid grid-rows-2 pt-0.5 gap-1 overflow-hidden'>
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }
  return (
    <div
      className={
        cn(
          'border border-blue-100 bg-slate-50 rounded-lg p-3 px-2 grid gap-3 grid-cols-[40px_1fr] items-center relative',
          self && 'bg-amber-50 border-amber-200',
          className,
        )
      }
    >
      {self && <Badge className='absolute -top-2.5 -right-2.5 text-amber-700'>You</Badge>}
      <div>
        <Avatar className='w-[40px] h-[40px]'>
          <AvatarImage src={img} alt="avatar" />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      </div>
      <div className='grid grid-rows-2 pt-0.5'>
        <h3 className='text-sm font-semibold text-ellipsis text-nowrap overflow-hidden'>{name}</h3>
        <p className='text-xs text-muted-foreground text-ellipsis text-nowrap overflow-hidden'>{email}</p>
      </div>
    </div>
  )
}

export default UserItem