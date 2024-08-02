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
import MessageList from './client/message-list'

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
    .reduce((result, {uuid, ...rest}) => {
      return {...result, [uuid]: {...rest, uuid}}
    }, {} as Record<string, User>)
  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-3xl h-[700px] rounded-lg border-2 border-blue-700 border-solid"
      >
      <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
        <div className="h-full p-3 bg-blue-400 relative">
          <UserList />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65}>
        <MessageList />
      </ResizablePanel>
    </ResizablePanelGroup>
    <InitialDialog />
  </>
  )
}

export default ChatBox