import React from 'react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui/resizable'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { SendHorizontal } from 'lucide-react'
import { Separator } from './ui/separator'
import UserItem from './user-item'
import ChatBubble from './chat-bubble'

type Message = {
  id: string
  userId: string
  message: string
  timestamp: string
}

type User = {
  id: string
  name: string
  email: string
  img?: string
}

type ChatBoxProps = {
  currentUserId: string
  messages: Message[]
  users: User[]
}

const ChatBox = ({
  currentUserId,
  messages,
  users
}: ChatBoxProps) => {
  const userObj = users
    .reduce((result, {id, ...rest}) => {
      return {...result, [id]: {...rest, id}}
    }, {} as Record<string, User>)
  const currentUser = userObj[currentUserId]
  return (
  <ResizablePanelGroup
    direction="horizontal"
    className="max-w-3xl max-h-[700px] rounded-lg border-2 border-blue-700 border-solid"
  >
    <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
      <div className="h-full p-3 bg-blue-400 relative">
        <div className="rounded-md border flex flex-col h-full bg-blue-50 p-3">
          <UserItem {...currentUser} self />
          <Separator className="my-2" />
          <div className='h-full overflow-auto'>
            <ScrollArea className="h-full flex flex-col gap-2 rounded-lg">
              {
                users
                  .filter(({ id }) => id !== currentUserId)
                  .map((props) => <UserItem key={props.id} {...props} />)
              }
            </ScrollArea>
          </div>
        </div>
      </div>
    </ResizablePanel>
    <ResizableHandle withHandle />
    <ResizablePanel defaultSize={65}>
      <div className='grid grid-rows-[1fr_0.25fr] h-full gap-2 p-3 bg-blue-200'>
        <ScrollArea className="rounded-md border p-4 overflow-auto bg-blue-100 flex flex-col gap-3 shadow-inner">
          {
            messages
              .map(({
                id: msgId,
                message,
                timestamp,
                userId
              }) => {
                const { name, img, id } = userObj[userId]
                return (
                  <ChatBubble
                    key={msgId}
                    message={message}
                    timestamp={timestamp}
                    name={name}
                    img={img}
                    self={currentUserId === id}
                  />
                )
              })
          }
        </ScrollArea>
        <div className="w-full flex flex-col gap-2">
          <Textarea placeholder='Type your message here...' className='resize-none min-h-0 h-full' />
          <Button className="hover:shadow-sm active:shadow-inner">
            Send
            <SendHorizontal className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
  )
}

export default ChatBox