import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { WishJarAdmin } from '@/components/wish-jar-admin'
import { createAdminClient } from '@/lib/supabase/admin'
import { getWishJarOwner } from '@/lib/wish-jar-admin'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Wish jar owner desk — Tanvi Bhadane',
  robots: { index: false, follow: false },
}

const wishFields = 'id, visitor_name, destination, message, created_at'

export default async function AdminPage() {
  const owner = await getWishJarOwner()
  if (!owner) redirect('/admin/login')

  const { data, error } = await createAdminClient()
    .from('dream_wishes')
    .select(wishFields)
    .order('created_at', { ascending: false })
    .limit(1000)

  return <WishJarAdmin initialWishes={data ?? []} initialError={error ? 'The wishes could not be loaded. Try refreshing the page.' : undefined} />
}
