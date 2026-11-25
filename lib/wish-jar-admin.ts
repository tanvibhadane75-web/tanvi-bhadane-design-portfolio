import { profile } from '@/lib/content'
import { createClient } from '@/lib/supabase/server'

export type WishInput = {
  name: string
  destination: string
  message: string
}

export async function getWishJarOwner() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  const user = data.user

  if (
    error ||
    !user?.email_confirmed_at ||
    user.email?.toLowerCase() !== profile.email.toLowerCase()
  ) {
    return null
  }

  return user
}

function cleanText(value: unknown) {
  return typeof value === 'string'
    ? value.replace(/[\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim()
    : ''
}

export function parseWishInput(payload: unknown): WishInput | null {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null

  const values = payload as Record<string, unknown>
  const name = cleanText(values.name)
  const destination = cleanText(values.destination)
  const message = cleanText(values.message)

  if (destination.length < 2 || destination.length > 120 || name.length > 60 || message.length > 240) {
    return null
  }

  return { name, destination, message }
}

export function hasSameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return false

  try {
    return new URL(origin).origin === new URL(request.url).origin
  } catch {
    return false
  }
}
