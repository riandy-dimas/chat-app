'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { useEffect, useState } from 'react'
import { Message } from '../types'
import { useChannelStore, useUserStore } from './store'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { SendHorizontal } from 'lucide-react'
import ChatBubble from '../chat-bubble'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { v7 } from 'uuid'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  message: z.string().min(2, {
    message: 'Message must be at least 2 characters.',
  }),
})






const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const currentUsr = useUserStore((state) => state.user)
  const { channel, setChannel } = useChannelStore((state) => state)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  })

  function onSubmit({ message }: z.infer<typeof formSchema>) {
    channel?.send({
      event: 'message',
      type: 'broadcast',
      payload: {
        message,
        id: v7(),
        timestamp: new Date().toISOString(),
        name: currentUsr?.name,
        email: currentUsr?.email,
        userId: currentUsr?.uuid,
      },
    })
    form.resetField('message')
  }

  useEffect(() => {
    if (!channel) return
    channel.on('broadcast', { event: 'message' }, ({ payload }) => {
      setMessages((messages) => [...messages, payload])
    })
  }, [channel, setChannel])

  return (
    <div className="grid h-[700px] grid-rows-[1fr_0.25fr] gap-2 bg-blue-200 p-3">
      <ScrollArea className="flex flex-col gap-3 overflow-auto rounded-md border bg-blue-100 p-4 shadow-inner">
        {messages.map(
          ({ id: msgId, message, timestamp, email, name, userId }) => {
            return (
              <ChatBubble
                key={msgId}
                message={message}
                timestamp={timestamp}
                name={name}
                self={userId === currentUsr?.uuid}
                img={`https://i.pravatar.cc/60?u=${email}`}
              />
            )
          }
        )}
      </ScrollArea>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Type your message..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="hover:shadow-sm active:shadow-inner" type="submit">
            Send
            <SendHorizontal className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default MessageList
