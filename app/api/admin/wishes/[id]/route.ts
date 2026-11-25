import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getWishJarOwner, hasSameOrigin, parseWishInput } from '@/lib/wish-jar-admin'

const wishFields = 'id, visitor_name, destination, message, created_at'
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

type RouteContext = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, { params }: RouteContext) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: 'This request could not be verified.' }, { status: 403 })
  }

  if (!(await getWishJarOwner())) {
    return NextResponse.json({ error: 'Sign in with the portfolio owner account to continue.' }, { status: 401 })
  }

  const { id } = await params
  if (!uuidPattern.test(id)) {
    return NextResponse.json({ error: 'That wish could not be found.' }, { status: 404 })
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
    .update({
      visitor_name: wish.name || null,
      destination: wish.destination,
      message: wish.message || null,
    })
    .eq('id', id)
    .select(wishFields)
    .maybeSingle()

  if (error) {
    console.error('wish jar admin update failed', error.code)
    return NextResponse.json({ error: 'The wish could not be updated right now.' }, { status: 500 })
  }

  if (!data) return NextResponse.json({ error: 'That wish could not be found.' }, { status: 404 })
  return NextResponse.json({ wish: data })
}

export async function DELETE(request: Request, { params }: RouteContext) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: 'This request could not be verified.' }, { status: 403 })
  }

  if (!(await getWishJarOwner())) {
    return NextResponse.json({ error: 'Sign in with the portfolio owner account to continue.' }, { status: 401 })
  }

  const { id } = await params
  if (!uuidPattern.test(id)) {
    return NextResponse.json({ error: 'That wish could not be found.' }, { status: 404 })
  }

  const { data, error } = await createAdminClient()
    .from('dream_wishes')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle()

  if (error) {
    console.error('wish jar admin delete failed', error.code)
    return NextResponse.json({ error: 'The wish could not be removed right now.' }, { status: 500 })
  }

  if (!data) return NextResponse.json({ error: 'That wish could not be found.' }, { status: 404 })
  return NextResponse.json({ success: true })
}
