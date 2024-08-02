import ChatBox from "@/components/chat-box";
import { Message } from "@/components/types";
import { TooltipProvider } from "@/components/ui/tooltip";
import { formatISO, sub } from "date-fns";

const dummyUsers = [
  {
    uuid: "123qwe",
    name: "John Cena",
    email: "john.cena@mail.com",
    img: "https://i.pravatar.cc/60?u=john.cena@mail.com"
  },
  {
    uuid: "456rty",
    name: "Pantau Cena",
    email: "pantau.cena@mail.com",
    img: "https://i.pravatar.cc/60?u=pantau.cena@mail.com"
  },
  {
    uuid: "789qwe",
    name: "Agung Gumelar",
    email: "agung.gumelar@mail.com",
    img: "https://i.pravatar.cc/60?u=agung.gumelar@mail.com"
  },
  {
    uuid: "9087j",
    name: "Kun Kun Cena",
    email: "kun.cena@mail.com",
    img: "https://i.pravatar.cc/60?u=kun.cena@mail.com"
  }
]

export default function Home() {
  return (
    <TooltipProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-blue-900">
        <ChatBox
          users={[]}
          messages={[]}
          currentUserId="9087j"
        />
      </main>
    </TooltipProvider>
  );
}
