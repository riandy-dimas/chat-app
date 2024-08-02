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
const UserItem = ({
  name,
  email,
  self,
  img,
  className,
  loader,
}: UserItemProps | UserItemLoaderProps) => {
  if (loader) {
    return (
      <div
        className={cn(
          'relative grid grid-cols-[40px_1fr] items-center gap-3 rounded-lg border border-blue-100 bg-slate-50 p-3 px-2',
          self && 'border-amber-200 bg-amber-50',
          className
        )}
      >
        {self && (
          <Badge className="absolute -right-2.5 -top-2.5 text-amber-700">
            You
          </Badge>
        )}
        <div>
          <Skeleton className="h-[40px] w-[40px] rounded-full" />
        </div>
        <div className="grid grid-rows-2 gap-1 overflow-hidden pt-0.5">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }
  return (
    <div
      className={cn(
        'relative grid grid-cols-[40px_1fr] items-center gap-3 rounded-lg border border-blue-100 bg-slate-50 p-3 px-2',
        self && 'border-amber-200 bg-amber-50',
        className
      )}
    >
      {self && (
        <Badge className="absolute -right-2.5 -top-2.5 text-amber-700">
          You
        </Badge>
      )}
      <div>
        <Avatar className="h-[40px] w-[40px]">
          <AvatarImage src={img} alt="avatar" />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="grid grid-rows-2 pt-0.5">
        <h3 className="overflow-hidden text-ellipsis text-nowrap text-sm font-semibold">
          {name}
        </h3>
        <p className="overflow-hidden text-ellipsis text-nowrap text-xs text-muted-foreground">
          {email}
        </p>
      </div>
    </div>
  )
}

export default UserItem
