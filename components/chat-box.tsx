import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from './ui/resizable'
import UserList from './client/user-list'
import InitialDialog from './client/initial-dialog'
import MessageList from './client/message-list'

const ChatBox = () => {
  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-[700px] max-w-3xl rounded-lg border-2 border-solid border-blue-700"
      >
        <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
          <div className="relative h-full bg-blue-400 p-3">
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
