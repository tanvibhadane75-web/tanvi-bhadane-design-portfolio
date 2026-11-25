'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Wish = {
  id: string
  visitor_name: string | null
  destination: string
  message: string | null
  created_at: string
}

type WishDraft = { name: string; destination: string; message: string }
const emptyDraft: WishDraft = { name: '', destination: '', message: '' }

type ApiResult = { wishes?: Wish[]; wish?: Wish; error?: string; success?: boolean }

export function WishJarAdmin({ initialWishes, initialError }: { initialWishes: Wish[]; initialError?: string }) {
  const router = useRouter()
  const [wishes, setWishes] = useState(initialWishes)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<WishDraft>(emptyDraft)
  const [message, setMessage] = useState(initialError ?? '')
  const [messageKind, setMessageKind] = useState<'error' | 'success'>(initialError ? 'error' : 'success')
  const [busy, setBusy] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  function beginEdit(wish: Wish) {
    setEditingId(wish.id)
    setDraft({ name: wish.visitor_name ?? '', destination: wish.destination, message: wish.message ?? '' })
    setMessage('')
    document.getElementById('wish-editor-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function cancelEdit() {
    setEditingId(null)
    setDraft(emptyDraft)
  }

  async function saveWish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setMessage('')

    try {
      const response = await fetch(editingId ? `/api/admin/wishes/${editingId}` : '/api/admin/wishes', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      })
      const result = (await response.json().catch(() => ({}))) as ApiResult

      if (!response.ok || !result.wish) {
        setMessageKind('error')
        setMessage(result.error ?? 'The wish could not be saved. Please try again.')
      } else {
        setWishes((current) => [result.wish!, ...current.filter((wish) => wish.id !== result.wish!.id)].sort((a, b) => b.created_at.localeCompare(a.created_at)))
        setMessageKind('success')
        setMessage(editingId ? 'Your changes have been saved.' : 'The wish has been added to the jar.')
        setDraft(emptyDraft)
        setEditingId(null)
      }
    } catch {
      setMessageKind('error')
      setMessage('The wish could not be saved. Check your connection and try again.')
    } finally {
      setBusy(false)
    }
  }

  async function deleteWish(wish: Wish) {
    if (!window.confirm(`Remove the wish for “${wish.destination}”? This cannot be undone.`)) return
    setMessage('')
    try {
      const response = await fetch(`/api/admin/wishes/${wish.id}`, { method: 'DELETE' })
      const result = (await response.json().catch(() => ({}))) as ApiResult
      if (!response.ok) {
        setMessageKind('error')
        setMessage(result.error ?? 'The wish could not be removed. Please try again.')
        return
      }
      setWishes((current) => current.filter((item) => item.id !== wish.id))
      if (editingId === wish.id) cancelEdit()
      setMessageKind('success')
      setMessage('The wish has been removed.')
    } catch {
      setMessageKind('error')
      setMessage('The wish could not be removed. Check your connection and try again.')
    }
  }

  async function refreshList() {
    setIsRefreshing(true)
    setMessage('')
    try {
      const response = await fetch('/api/admin/wishes', { cache: 'no-store' })
      const result = (await response.json().catch(() => ({}))) as ApiResult
      if (!response.ok || !result.wishes) {
        setMessageKind('error')
        setMessage(result.error ?? 'The wish list could not be refreshed.')
      } else {
        setWishes(result.wishes)
        setMessageKind('success')
        setMessage('The wish list is up to date.')
      }
    } catch {
      setMessageKind('error')
      setMessage('The wish list could not be refreshed. Check your connection and try again.')
    } finally {
      setIsRefreshing(false)
    }
  }

  async function signOut() {
    setIsSigningOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <main className="min-h-svh bg-[#f7f3ec] px-5 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-start justify-between gap-5 border-b border-[#dcd1c4] pb-6">
          <div>
            <a href="/" className="font-hand text-lg text-[#766c62] hover:text-[#9c604e]">← portfolio</a>
            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-[#8a6c57]">owner’s desk · private</p>
            <h1 className="mt-2 font-serif-display text-4xl text-[#34312f]">The wish jar</h1>
            <p className="mt-2 text-[#625c55]">Manage the notes visitors leave for future adventures.</p>
          </div>
          <button type="button" onClick={signOut} disabled={isSigningOut} className="border border-[#cfc3b4] bg-[#fffdf8] px-4 py-2 text-sm text-[#34312f] transition-colors hover:border-[#9c604e] disabled:opacity-60">
            {isSigningOut ? 'Signing out…' : 'Sign out'}
          </button>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <section className="paper-card paper-edge h-fit p-6 md:p-8" aria-labelledby="wish-editor-title">
            <p className="font-hand text-lg text-[#8a6c57]">a note for the jar</p>
            <h2 id="wish-editor-title" className="mt-1 font-serif-display text-2xl text-[#34312f]">{editingId ? 'Edit a wish' : 'Add a wish'}</h2>
            <form className="mt-6 space-y-5" onSubmit={saveWish}>
              <div>
                <label htmlFor="wish-destination" className="mb-2 block text-sm font-medium text-[#34312f]">Dream destination <span aria-hidden="true">*</span></label>
                <input id="wish-destination" name="destination" value={draft.destination} onChange={(event) => setDraft({ ...draft, destination: event.target.value })} minLength={2} maxLength={120} required className="owner-input" />
              </div>
              <div>
                <label htmlFor="wish-name" className="mb-2 block text-sm font-medium text-[#34312f]">Visitor name</label>
                <input id="wish-name" name="name" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} maxLength={60} className="owner-input" />
              </div>
              <div>
                <label htmlFor="wish-message" className="mb-2 block text-sm font-medium text-[#34312f]">Little note</label>
                <textarea id="wish-message" name="message" value={draft.message} onChange={(event) => setDraft({ ...draft, message: event.target.value })} maxLength={240} rows={4} className="owner-input resize-y" />
              </div>
              {message && <p role={messageKind === 'error' ? 'alert' : 'status'} aria-live="polite" className={`text-sm leading-relaxed ${messageKind === 'error' ? 'text-[#9c4f42]' : 'text-[#58735b]'}`}>{message}</p>}
              <div className="flex flex-wrap gap-3">
                <button type="submit" disabled={busy} className="bg-[#34312f] px-5 py-3 text-sm text-white transition-colors hover:bg-[#9c604e] disabled:cursor-wait disabled:opacity-60">
                  {busy ? 'Saving…' : editingId ? 'Save changes' : 'Add wish'}
                </button>
                {editingId && <button type="button" onClick={cancelEdit} className="border border-[#cfc3b4] px-5 py-3 text-sm text-[#34312f] hover:border-[#9c604e]">Cancel</button>}
              </div>
            </form>
          </section>

          <section aria-labelledby="wish-list-title">
            <div className="flex items-end justify-between gap-3 border-b border-[#dcd1c4] pb-3">
              <div>
                <p className="font-hand text-lg text-[#8a6c57]">the collected notes</p>
                <h2 id="wish-list-title" className="font-serif-display text-2xl text-[#34312f]">{wishes.length} {wishes.length === 1 ? 'wish' : 'wishes'}</h2>
              </div>
              <button type="button" onClick={refreshList} disabled={isRefreshing} className="text-sm text-[#8a5e4b] underline decoration-[#cda792] underline-offset-4 hover:text-[#34312f] disabled:opacity-60">{isRefreshing ? 'Refreshing…' : 'Refresh list'}</button>
            </div>
            {wishes.length === 0 ? (
              <p className="paper-card mt-5 p-6 text-sm leading-relaxed text-[#625c55]">The jar is empty for now. Add the first wish, or check back after visitors leave a note.</p>
            ) : (
              <ul className="mt-5 space-y-3">
                {wishes.map((wish) => (
                  <li key={wish.id} className="paper-card paper-edge p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif-display text-xl text-[#34312f]">{wish.destination}</h3>
                        <p className="mt-1 text-xs text-[#766c62]">{wish.visitor_name || 'A kind visitor'} · <time dateTime={wish.created_at}>{new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(wish.created_at))}</time></p>
                      </div>
                      <div className="flex gap-3 text-sm">
                        <button type="button" onClick={() => beginEdit(wish)} aria-label={`Edit wish for ${wish.destination}`} className="text-[#8a5e4b] underline decoration-[#cda792] underline-offset-4 hover:text-[#34312f]">Edit</button>
                        <button type="button" onClick={() => deleteWish(wish)} aria-label={`Delete wish for ${wish.destination}`} className="text-[#934c43] underline decoration-[#cda792] underline-offset-4 hover:text-[#34312f]">Delete</button>
                      </div>
                    </div>
                    {wish.message && <p className="mt-4 border-l-2 border-[#cda792] pl-3 text-sm leading-relaxed text-[#625c55]">{wish.message}</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
