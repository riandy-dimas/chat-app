'use client'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useEffect, useState } from 'react'
import { Message } from '../types'
import { useChannelStore, useUserStore } from './store'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import ChatBubble from '../chat-bubble'
import { v7 } from 'uuid'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'

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
    <div className="grid h-dvh grid-rows-[1fr_0fr] gap-2 bg-blue-200 p-3 pt-[4.5rem] sm:h-full sm:pt-3">
      <div className="flex h-[664px] overflow-auto rounded-md border-none bg-blue-100 p-4 shadow-inner sm:border">
        <ScrollArea className="flex h-full w-full flex-col gap-3">
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
      </div>
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
                  <Input
                    {...field}
                    enterKeyHint="send"
                    className="resize-none bg-slate-50"
                    placeholder="Type your message.."
                    onKeyDown={(e) => {
                      if (e.code === 'Enter') {
                        if (e.shiftKey) return
                        form.handleSubmit((e) => {
                          onSubmit(e)
                        })()
                        e.preventDefault()
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default MessageList
