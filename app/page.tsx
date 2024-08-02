import ChatBox from "@/components/chat-box";
import { TooltipProvider } from "@/components/ui/tooltip";
import { formatISO, sub } from "date-fns";

const dummyUsers = [
  {
    id: "123qwe",
    name: "John Cena",
    email: "john.cena@mail.com",
    img: "https://i.pravatar.cc/60?u=john.cena@mail.com"
  },
  {
    id: "456rty",
    name: "Pantau Cena",
    email: "pantau.cena@mail.com",
    img: "https://i.pravatar.cc/60?u=pantau.cena@mail.com"
  },
  {
    id: "789qwe",
    name: "Agung Gumelar",
    email: "agung.gumelar@mail.com",
    img: "https://i.pravatar.cc/60?u=agung.gumelar@mail.com"
  },
  {
    id: "9087j",
    name: "Kun Kun Cena",
    email: "kun.cena@mail.com",
    img: "https://i.pravatar.cc/60?u=kun.cena@mail.com"
  }
]

const dummyMessages = [
  {
    id: '1',
    userId: '123qwe',
    message: 'Lorem ipsum',
    timestamp: formatISO(sub(new Date().toISOString(), { hours: 2 })),
  },
  {
    id: '2',
    userId: '123qwe',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    timestamp: formatISO(sub(new Date().toISOString(), { hours: 2 })),
  },
  {
    id: '3',
    userId: '9087j',
    message: 'Siang makan nasi, kalo malam minum susu!',
    timestamp: formatISO(sub(new Date().toISOString(), { minutes: 33 })),
  },
  {
    id: '4',
    userId: '789qwe',
    message: 'Halo halo bandung',
    timestamp: formatISO(sub(new Date().toISOString(), { minutes: 18 })),
  },
  {
    id: '5',
    userId: '789qwe',
    message: 'Ibu kota periangan',
    timestamp: formatISO(sub(new Date().toISOString(), { minutes: 7 })),
  },
  {
    id: '6',
    userId: '9087j',
    message: 'Sudah.. lama beta, tidak berjumpa dengan kau',
    timestamp: formatISO(sub(new Date().toISOString(), { minutes: 6 })),
  },
  {
    id: '7',
    userId: '456rty',
    message: 'Mari bung rebut kembali.',
    timestamp: formatISO(sub(new Date().toISOString(), { minutes: 5 })),
  },
  {
    id: '8',
    userId: '123qwe',
    message: 'Ogah.',
    timestamp: formatISO(sub(new Date().toISOString(), { minutes: 2 })),
  },
  {
    id: '9',
    userId: '9087j',
    message: 'y.',
    timestamp: formatISO(sub(new Date().toISOString(), { minutes: 0 })),
  },
  {
    id: '10',
    userId: '9087j',
    message: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
    timestamp: formatISO(sub(new Date().toISOString(), { minutes: 0 })),
  },
]

export default function Home() {
  return (
    <TooltipProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-blue-900">
        <ChatBox
          users={dummyUsers}
          messages={dummyMessages}
          currentUserId="9087j"
        />
      </main>
    </TooltipProvider>
  );
}
