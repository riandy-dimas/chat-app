import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn, getInitials } from '@/lib/utils'
import { format, formatDistanceToNow, differenceInMinutes } from 'date-fns'
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
  self,
}: ChatBubbleProps) => {
  return (
    <div
      className={cn(
        'grid w-fit max-w-[75%] grid-cols-[32px_1fr] gap-2',
        self && 'grid-cols-1 self-end'
      )}
    >
      <div className={cn('self-end', self && 'hidden')}>
        <Avatar className="h-[32px] w-[32px] shadow-sm">
          <AvatarImage src={img} alt="avatar" />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            'w-fit rounded-xl bg-slate-100 p-2 shadow-sm',
            self
              ? 'text self-end rounded-br-none bg-amber-500 text-white shadow-md'
              : 'rounded-bl-none'
          )}
        >
          <p className="text-sm">{message}</p>
        </div>
        <div
          className={cn('flex items-center gap-1', self && 'flex-row-reverse')}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <p
                className={cn(
                  'cursor-default text-xs font-semibold',
                  'max-w-28 text-ellipsis text-muted-foreground',
                  'overflow-hidden whitespace-nowrap'
                )}
              >
                {self ? 'You' : name}
              </p>
            </TooltipTrigger>
            {!self && (
              <TooltipContent className="bg-slate-100 text-xs" side="bottom">
                {name}
              </TooltipContent>
            )}
          </Tooltip>
          <p className="text-xs font-thin text-muted-foreground">
            {differenceInMinutes(new Date(), timestamp) <= 5
              ? formatDistanceToNow(timestamp, { addSuffix: true })
              : format(timestamp, 'HH:mm')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatBubble
