import { useEffect, useRef, useState } from 'react'
import { db } from '@/lib/firebase'
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { Filter } from 'bad-words'
import { Textarea } from '@/components/ui/textarea'

const filter = new Filter()
const BANNED_SESSION_KEY = 'banned_from_messages'

export function MessageWall() {
  type Message = { id: string; text: string; createdAt: unknown }
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [banned, setBanned] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (localStorage.getItem(BANNED_SESSION_KEY)) setBanned(true)
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'), limit(10))
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Message))
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (messages.length < 2) return
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrentIdx((idx) => (idx + 1) % messages.length)
    }, 30000)
    return () => timerRef.current && clearInterval(timerRef.current)
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (banned) return
    if (!input.trim()) return setError('Message cannot be empty')
    if (filter.isProfane(input)) {
      setError('Inappropriate language detected. You are blocked from posting.')
      setBanned(true)
      localStorage.setItem(BANNED_SESSION_KEY, '1')
      return
    }
    try {
      await addDoc(collection(db, 'messages'), {
        text: input.trim(),
        createdAt: serverTimestamp(),
      })
      setInput('')
    } catch (err) {
      setError('Failed to post message')
    }
  }

  return (
    <section className="max-w-xl mx-auto my-8 p-4 bg-card rounded shadow">
      <h2 className="text-xl font-bold mb-2">💬 Leave a Message</h2>
      <div className="text-sm text-muted-foreground mb-2">
        Notice: Abuse, hate, or inappropriate language is strictly prohibited. If misuse is
        detected, technical information (such as browser and timestamp) may be saved and you will be
        blocked from posting further messages.
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <Textarea
          className="flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={banned ? 'You are blocked from posting.' : 'Say something nice!'}
          disabled={banned}
          maxLength={200}
          rows={3}
        />
        <button
          type="submit"
          className="bg-primary text-white dark:text-black font-bold px-4 py-2 rounded disabled:opacity-50 w-full"
          disabled={banned}
        >
          Post
        </button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div
        key={messages[currentIdx]?.id}
        className="h-16 flex items-center justify-center text-lg font-medium transition-all duration-700 animate-fade-in"
        style={{ opacity: 1, transform: 'translateY(0)' }}
      >
        {messages.length > 0 ? messages[currentIdx]?.text : 'No messages yet.'}
      </div>
    </section>
  )
}
