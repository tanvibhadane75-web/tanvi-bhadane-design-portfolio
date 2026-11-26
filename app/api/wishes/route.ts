import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const wishFields = 'id, visitor_name, destination, message, created_at';

type WishPayload = {
  name?: unknown;
  destination?: unknown;
  message?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getSupabase() {
  if (!supabaseUrl || !supabaseKey) return null;
  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const unavailable = () =>
  NextResponse.json({ error: 'The wish jar is resting for now. Please try again later.' }, { status: 503 });

function textValue(value: unknown): string {
  return typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim() : '';
}

function toWish(row: {
  id: string;
  visitor_name: string | null;
  destination: string;
  message: string | null;
  created_at: string;
}) {
  return {
    id: row.id,
    name: row.visitor_name ?? '',
    destination: row.destination,
    message: row.message ?? '',
    createdAt: row.created_at,
  };
}

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ wishes: [] });

  const { data, error } = await supabase
    .from('dream_wishes')
    .select(wishFields)
    .order('created_at', { ascending: false })
    .limit(12);

  if (error) {
    console.error('dream wishes read failed', error);
    return NextResponse.json({ error: 'Wishes are unavailable right now.' }, { status: 500 });
  }

  return NextResponse.json({ wishes: data.map(toWish) });
}

export async function POST(request: Request) {
  let payload: WishPayload;

  try {
    payload = (await request.json()) as WishPayload;
  } catch {
    return NextResponse.json({ error: 'Please try again with a valid wish.' }, { status: 400 });
  }

  const name = textValue(payload.name);
  const destination = textValue(payload.destination);
  const message = textValue(payload.message);
  const website = textValue(payload.website);
  const startedAt = typeof payload.startedAt === 'number' ? payload.startedAt : 0;
  const elapsed = Date.now() - startedAt;

  if (website || startedAt <= 0 || elapsed < 1200 || elapsed > 2 * 60 * 60 * 1000) {
    return NextResponse.json({ error: 'Please take a moment and try again.' }, { status: 400 });
  }

  if (destination.length < 2 || destination.length > 120 || name.length > 60 || message.length > 240) {
    return NextResponse.json({ error: 'Please keep your wish within the suggested lengths.' }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) return unavailable();

  const { data, error } = await supabase
    .from('dream_wishes')
    .insert({
      visitor_name: name || null,
      destination,
      message: message || null,
    })
    .select(wishFields)
    .maybeSingle();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'That destination is already in the jar.' }, { status: 409 });
    }

    console.error('dream wish submission failed', error);
    return NextResponse.json({ error: 'Your wish could not be added right now.' }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Your wish could not be added right now.' }, { status: 500 });
  }

  return NextResponse.json({ wish: toWish(data) }, { status: 201 });
}
