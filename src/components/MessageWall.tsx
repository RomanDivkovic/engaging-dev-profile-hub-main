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
import { motion, AnimatePresence } from 'framer-motion'
import { useOnlineStatus } from '@/hooks/use-online-status'

const filter = new Filter()
const BANNED_SESSION_KEY = 'banned_from_messages'

export function MessageWall() {
  type Message = { id: string; text: string; createdAt: unknown }
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [banned, setBanned] = useState(false)
  const [pendingMessages, setPendingMessages] = useState<string[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { isOnline } = useOnlineStatus()

  // Load pending messages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pending-messages')
    if (saved) {
      try {
        setPendingMessages(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to parse pending messages:', error)
      }
    }
  }, [])

  // Save pending messages to localStorage
  useEffect(() => {
    localStorage.setItem('pending-messages', JSON.stringify(pendingMessages))
  }, [pendingMessages])

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
    }, 10000)
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

    const messageText = input.trim()

    if (!isOnline) {
      // Save message locally when offline
      setPendingMessages((prev) => [...prev, messageText])
      setInput('')
      setError('Message saved locally. It will be sent when you are back online.')
      return
    }

    try {
      await addDoc(collection(db, 'messages'), {
        text: messageText,
        createdAt: serverTimestamp(),
      })
      setInput('')
    } catch (err) {
      // If sending fails, save locally as fallback
      console.error('Failed to send message:', err)
      setPendingMessages((prev) => [...prev, messageText])
      setError('Failed to send message. Saved locally for later.')
    }
  }

  // Try to send pending messages when coming back online
  useEffect(() => {
    if (isOnline && pendingMessages.length > 0) {
      const sendPendingMessages = async () => {
        const remainingMessages = [...pendingMessages]

        for (const message of pendingMessages) {
          try {
            await addDoc(collection(db, 'messages'), {
              text: message,
              createdAt: serverTimestamp(),
            })
            remainingMessages.shift() // Remove sent message
          } catch (error) {
            console.error('Failed to send pending message:', error)
            break // Stop trying if one fails
          }
        }

        setPendingMessages(remainingMessages)

        if (remainingMessages.length < pendingMessages.length) {
          import('sonner').then(({ toast }) => {
            toast.success(
              `Sent ${pendingMessages.length - remainingMessages.length} pending message(s)! 📤`,
              {
                duration: 3000,
              }
            )
          })
        }
      }

      sendPendingMessages()
    }
  }, [isOnline, pendingMessages])

  return (
    <section className="max-w-xl mx-auto my-8 p-4 bg-card rounded shadow">
      <h2 className="text-xl font-bold mb-2">💬 Leave a Message</h2>
      {!isOnline && (
        <div className="mb-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200 text-sm">
          📴 You are offline - messages are saved locally and will be sent when you are back online.
          {pendingMessages.length > 0 &&
            ` (${pendingMessages.length} pending message${pendingMessages.length > 1 ? 's' : ''})`}
        </div>
      )}
      <div className="text-xs text-muted-foreground mb-2">
        Notice: Abuse, hate, or inappropriate language is strictly prohibited. If misuse is
        detected, technical information (such as browser and timestamp) may be saved and you will be
        blocked from posting further messages.
      </div>
      <div className="text-sm font-medium text-muted-foreground mb-4">
        Here you can leave a message that will be saved and displayed for everyone. A new message is
        shown every 10 seconds.
        {!isOnline && ' (Offline mode - limited functionality)'}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <Textarea
          className="flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            banned
              ? 'You are blocked from posting.'
              : !isOnline
                ? 'Offline - meddelanden sparas lokalt'
                : 'Say something nice!'
          }
          disabled={banned || !isOnline}
          maxLength={200}
          rows={3}
        />
        <button
          type="submit"
          className="bg-primary text-white dark:text-black font-bold px-4 py-2 rounded disabled:opacity-50 w-full"
          disabled={banned || !isOnline}
        >
          {isOnline ? 'Post' : 'Offline - Spara lokalt'}
        </button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="h-16 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={messages[currentIdx]?.id}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-medium text-center"
          >
            {messages.length > 0 ? messages[currentIdx]?.text : 'No messages yet.'}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
