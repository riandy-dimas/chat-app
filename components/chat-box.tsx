import { ResizablePanelGroup, ResizablePanel } from './ui/resizable'
import UserList from './client/user-list'
import InitialDialog from './client/initial-dialog'
import MessageList from './client/message-list'

const ChatBox = () => {
  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-lvh max-w-3xl border-solid border-blue-700 sm:h-full sm:rounded-lg sm:border-2"
      >
        <UserList />
        <ResizablePanel defaultSize={65} order={2}>
          <MessageList />
        </ResizablePanel>
      </ResizablePanelGroup>
      <InitialDialog />
    </>
  )
}

export default ChatBox
