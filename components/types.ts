export type Message = {
  id: string
  userId: string
  message: string
  timestamp: string
}

export type User = {
  id: string
  name: string
  email: string
  img?: string
}

export type UserDB = {
  id: string;
  created_at: string;
  name: string;
  email: string
}