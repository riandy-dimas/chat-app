'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Email is not valid.',
  }),
})

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { MessagesSquare } from 'lucide-react'
import { Button } from '../ui/button'
import { useUserStore } from './store'

export default function InitialDialog() {
  const [open, setOpen] = useState(true)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })
  const setUser = useUserStore((state) => state.setUser)
  function onSubmit(values: z.infer<typeof formSchema>) {
    setUser({
      ...values,
      uuid: uuidv4(),
      img: `https://i.pravatar.cc/60?u=${values.email}`,
    })
    setOpen(false)
  }

  return (
    <Form {...form}>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="rounded-sm bg-slate-50 sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Let&apos;s chat!</AlertDialogTitle>
            <AlertDialogDescription>
              Put your name and email here. Click start when you&apos;re ready
              :)
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      autoFocus
                      placeholder="Your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-right font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder="your.name@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-right font-light" />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-3">
              Start chat <MessagesSquare className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  )
}
