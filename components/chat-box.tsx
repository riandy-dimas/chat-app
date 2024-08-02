import React from 'react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui/resizable'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { SendHorizontal } from 'lucide-react'
import ChatBubble from './chat-bubble'
import { Message, User } from './types'
import UserList from './client/user-list'
import InitialDialog from './client/initial-dialog'

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
  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-3xl max-h-[700px] rounded-lg border-2 border-blue-700 border-solid"
      >
      <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
        <div className="h-full p-3 bg-blue-400 relative">
          <UserList />
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
    <InitialDialog />
  </>
  )
}

export default ChatBox