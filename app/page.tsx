import ChatBox from '@/components/chat-box'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function Home() {
  return (
    <TooltipProvider>
      <main className="flex min-h-screen flex-col items-center justify-center bg-blue-900">
        <ChatBox />
      </main>
    </TooltipProvider>
  )
}
