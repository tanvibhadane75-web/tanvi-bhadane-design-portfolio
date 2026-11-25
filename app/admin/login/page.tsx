import type { Metadata } from 'next'
import { OwnerLogin } from '@/components/owner-login'

export const metadata: Metadata = {
  title: 'Owner sign in — Tanvi Bhadane',
  robots: { index: false, follow: false },
}

export default function OwnerLoginPage() {
  return <OwnerLogin />
}
