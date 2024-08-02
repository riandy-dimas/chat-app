import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn, getInitials } from '@/lib/utils'
import { format, formatDistanceToNow, differenceInMinutes  } from 'date-fns'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

type ChatBubbleProps = {
  name: string
  message: string
  timestamp: string
  img?: string
  self?: boolean
}
const ChatBubble = ({
  message,
  name,
  timestamp,
  img,
  self
}: ChatBubbleProps) => {
  return (
    <div className={cn(
      'grid grid-cols-[32px_1fr] gap-2 w-fit max-w-[75%]',
      self && 'grid-cols-1 self-end'
    )}>
      <div className={cn('self-end', self && 'hidden')}>
        <Avatar className='w-[32px] h-[32px] shadow-sm'>
          <AvatarImage src={img} alt="avatar" />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      </div>
      <div className='flex flex-col gap-1'>
        <div className={cn(
          'rounded-xl bg-slate-100 shadow-sm p-2 w-fit',
          self
            ? 'rounded-br-none bg-amber-500 text-white shadow-md text self-end'
            : 'rounded-bl-none'
        )}>
          <p className='text-sm'>{message}</p>
        </div>
        <div className={cn('flex items-center gap-1', self && 'flex-row-reverse')}>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className={cn(
                'text-xs cursor-default font-semibold',
                'text-muted-foreground max-w-28 text-ellipsis',
                'overflow-hidden whitespace-nowrap',
              )}>
                {self ? 'You' : name}
              </p>
            </TooltipTrigger>
            {!self && <TooltipContent className='text-xs bg-slate-100' side='bottom'>
              {name}
            </TooltipContent>}
          </Tooltip>
          <p className='text-xs text-muted-foreground font-thin'>
            {differenceInMinutes(new Date(), timestamp) <= 5 ? formatDistanceToNow(timestamp, { addSuffix: true }) : format(timestamp, 'HH:mm')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatBubble