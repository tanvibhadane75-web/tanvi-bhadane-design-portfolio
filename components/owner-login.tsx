'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { profile } from '@/lib/content'
import { createClient } from '@/lib/supabase/client'

type Mode = 'sign-in' | 'create-account'

function authMessage(code: string | undefined, mode: Mode) {
  if (code === 'email_not_confirmed') return 'Check your inbox for the confirmation link before signing in.'
  if (code === 'weak_password') return 'Choose a stronger password and try again.'
  if (code?.includes('rate') || code === 'over_email_send_rate_limit') return 'Too many attempts. Please wait a little before trying again.'
  return mode === 'sign-in'
    ? 'The email or password could not be verified. Please check your details and try again.'
    : 'We could not complete account setup right now. Please try again shortly.'
}

export function OwnerLogin() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('sign-in')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setMessage('')
    setIsSuccess(false)

    const supabase = createClient()
    if (mode === 'create-account') {
      const { data, error } = await supabase.auth.signUp({
        email: profile.email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setMessage(authMessage(error.code, mode))
      } else if (data.session) {
        router.replace('/admin')
        router.refresh()
      } else {
        setIsSuccess(true)
        setMessage('If this owner address is eligible, a confirmation link is on its way. Confirm it before signing in.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: profile.email, password })
      if (error) {
        setMessage(authMessage(error.code, mode))
      } else {
        router.replace('/admin')
        router.refresh()
      }
    }

    setIsSubmitting(false)
  }

  return (
    <main className="grid-paper flex min-h-svh items-center justify-center px-5 py-16">
      <section className="paper-card paper-edge relative w-full max-w-md p-7 md:p-10" aria-labelledby="owner-login-title">
        <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" aria-hidden="true" />
        <Link href="/" className="font-hand text-lg text-[#766c62] hover:text-[#9c604e]">← back to the portfolio</Link>
        <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#8a6c57]">private corner · owner access</p>
        <h1 id="owner-login-title" className="mt-3 font-serif-display text-3xl text-[#34312f]">
          {mode === 'sign-in' ? 'A key for the wish jar' : 'Set up owner access'}
        </h1>
        <p className="mt-3 leading-relaxed text-[#625c55]">
          Only the confirmed portfolio-owner account can manage wishes. Visitors can still add their own wishes from the public jar.
        </p>

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="owner-email" className="mb-2 block text-sm font-medium text-[#34312f]">Owner email</label>
            <input id="owner-email" type="email" value={profile.email} readOnly autoComplete="username" className="owner-input cursor-not-allowed bg-[#f1ede5] text-[#766c62]" />
          </div>
          <div>
            <label htmlFor="owner-password" className="mb-2 block text-sm font-medium text-[#34312f]">Password</label>
            <input id="owner-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={mode === 'create-account' ? 12 : 1} autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'} required className="owner-input" />
            {mode === 'create-account' && <p className="mt-2 text-xs text-[#766c62]">Use at least 12 characters. You&apos;ll confirm ownership by email.</p>}
          </div>
          {message && <p role={isSuccess ? 'status' : 'alert'} className={`text-sm leading-relaxed ${isSuccess ? 'text-[#58735b]' : 'text-[#9c4f42]'}`}>{message}</p>}
          <button type="submit" disabled={isSubmitting} className="w-full bg-[#34312f] px-5 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#9c604e] disabled:cursor-wait disabled:opacity-60">
            {isSubmitting ? 'One moment…' : mode === 'sign-in' ? 'Unlock the wish jar' : 'Send confirmation link'}
          </button>
        </form>

        <div className="mt-6 border-t border-[#e2d9ce] pt-5 text-center text-sm text-[#625c55]">
          {mode === 'sign-in' ? (
            <>
              First visit?{' '}
              <button type="button" onClick={() => { setMode('create-account'); setPassword(''); setMessage('') }} className="font-medium text-[#8a5e4b] underline decoration-[#cda792] underline-offset-4 hover:text-[#34312f]">Set up owner access</button>
            </>
          ) : (
            <>
              Already set up?{' '}
              <button type="button" onClick={() => { setMode('sign-in'); setPassword(''); setMessage('') }} className="font-medium text-[#8a5e4b] underline decoration-[#cda792] underline-offset-4 hover:text-[#34312f]">Sign in</button>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
