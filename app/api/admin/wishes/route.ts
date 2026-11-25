import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getWishJarOwner, hasSameOrigin, parseWishInput } from '@/lib/wish-jar-admin'

const wishFields = 'id, visitor_name, destination, message, created_at'

export async function GET() {
  if (!(await getWishJarOwner())) {
    return NextResponse.json({ error: 'Sign in with the portfolio owner account to continue.' }, { status: 401 })
  }

  const { data, error } = await createAdminClient()
    .from('dream_wishes')
    .select(wishFields)
    .order('created_at', { ascending: false })
    .limit(1000)

  if (error) {
    console.error('wish jar admin read failed', error.code)
    return NextResponse.json({ error: 'Wishes could not be loaded right now.' }, { status: 500 })
  }

  return NextResponse.json({ wishes: data })
}

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: 'This request could not be verified.' }, { status: 403 })
  }

  if (!(await getWishJarOwner())) {
    return NextResponse.json({ error: 'Sign in with the portfolio owner account to continue.' }, { status: 401 })
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Please enter a valid wish.' }, { status: 400 })
  }

  const wish = parseWishInput(payload)
  if (!wish) {
    return NextResponse.json({ error: 'Check the required destination and field lengths.' }, { status: 400 })
  }

  const { data, error } = await createAdminClient()
    .from('dream_wishes')
    .insert({
      visitor_name: wish.name || null,
      destination: wish.destination,
      message: wish.message || null,
    })
    .select(wishFields)
    .single()

  if (error) {
    console.error('wish jar admin create failed', error.code)
    return NextResponse.json({ error: 'The wish could not be saved right now.' }, { status: 500 })
  }

  return NextResponse.json({ wish: data }, { status: 201 })
}
