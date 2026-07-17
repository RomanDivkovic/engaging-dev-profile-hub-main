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
import { Textarea } from '@/components/ui/forms/textarea'
import { motion, AnimatePresence } from 'framer-motion'
import { useOnlineStatus } from '@/hooks/use-online-status'

const filter = new Filter()
const BANNED_SESSION_KEY = 'banned_from_messages'
const LOCAL_MESSAGES_KEY = 'wall-of-kindness-messages'
const isDevelopment =
  typeof window !== 'undefined' &&
  window.location.hostname !== '' &&
  ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname) &&
  (typeof process === 'undefined' || process.env.NODE_ENV !== 'test')
const BLOCKED_MESSAGE_PATTERNS = [
  /\bass(?:hole)?\b/i,
  /\bfuck(?:er|face|ing)?\b/i,
  /\bshit(?:ty|head)?\b/i,
]

const isMessageInappropriate = (text: string) => {
  const normalizedText = text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[4@]/g, 'a')
    .replace(/[1!]/g, 'i')
    .replace(/3/g, 'e')
    .replace(/0/g, 'o')
    .replace(/\s+/g, ' ')

  return (
    filter.isProfane(text) ||
    BLOCKED_MESSAGE_PATTERNS.some((pattern) => pattern.test(normalizedText))
  )
}

export function MessageWall() {
  type Message = { id: string; text: string; createdAt: unknown }
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [banned, setBanned] = useState(false)
  const [pendingMessages, setPendingMessages] = useState<string[]>([])
  const [connectionError, setConnectionError] = useState('')
  const [currentIdx, setCurrentIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { isOnline } = useOnlineStatus()

  // Load pending messages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pending-messages')
    if (saved) {
      try {
        setPendingMessages(
          JSON.parse(saved).filter(
            (message: unknown): message is string =>
              typeof message === 'string' && !isMessageInappropriate(message)
          )
        )
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
    const savedMessages = localStorage.getItem(LOCAL_MESSAGES_KEY)
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages))
      } catch (error) {
        console.error('Failed to parse local messages:', error)
      }
    }
    if (isDevelopment) return

    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'), limit(10))
    const unsub = onSnapshot(
      q,
      (snap) => {
        setConnectionError('')
        setMessages(
          snap.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }) as Message)
            .filter(
              (message) => typeof message.text === 'string' && !isMessageInappropriate(message.text)
            )
        )
      },
      (error) => {
        console.error('Failed to load messages:', error)
        setConnectionError(
          'Messages could not be loaded from the server. Check your Firebase configuration.'
        )
      }
    )
    return () => unsub()
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(messages))
  }, [messages])

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
    if (isMessageInappropriate(input)) {
      setError('Inappropriate language detected. You are blocked from posting.')
      setBanned(true)
      localStorage.setItem(BANNED_SESSION_KEY, '1')
      return
    }

    const messageText = input.trim()
    const showLocalMessage = () => {
      setMessages((previous) =>
        [
          { id: `local-${Date.now()}`, text: messageText, createdAt: new Date() },
          ...previous.filter((message) => message.text !== messageText),
        ].slice(0, 10)
      )
    }

    if (!isOnline || isDevelopment) {
      if (!isDevelopment) setPendingMessages((prev) => [...prev, messageText])
      showLocalMessage()
      setInput('')
      setError(
        isDevelopment
          ? 'Development message saved only in this browser.'
          : 'Message saved locally. It will be sent when you are back online.'
      )
      return
    }

    try {
      const document = await addDoc(collection(db, 'messages'), {
        text: messageText,
        createdAt: serverTimestamp(),
      })
      setMessages((previous) =>
        [
          { id: document.id, text: messageText, createdAt: new Date() },
          ...previous.filter((message) => message.text !== messageText),
        ].slice(0, 10)
      )
      setInput('')
    } catch (err) {
      // If sending fails, save locally as fallback
      console.error('Failed to send message:', err)
      setPendingMessages((prev) => [...prev, messageText])
      showLocalMessage()
      setInput('')
      setError('Failed to send message. Saved locally for later.')
    }
  }

  // Try to send pending messages when coming back online
  useEffect(() => {
    if (!isDevelopment && isOnline && pendingMessages.length > 0) {
      const sendPendingMessages = async () => {
        const remainingMessages = [...pendingMessages]

        for (const message of pendingMessages) {
          if (isMessageInappropriate(message)) {
            remainingMessages.shift()
            continue
          }
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
    <>
      <section className="max-w-xl mx-auto my-8 p-4 bg-card rounded shadow">
        <h2 className="text-xl font-bold mb-2">💬 Leave a Message</h2>
        {!isOnline && (
          <div className="mb-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200 text-sm">
            📴 You are offline - messages are saved locally and will be sent when you are back
            online.
            {pendingMessages.length > 0 &&
              ` (${pendingMessages.length} pending message${pendingMessages.length > 1 ? 's' : ''})`}
          </div>
        )}
        <div className="text-xs text-muted-foreground mb-2">
          Notice: Abuse, hate, or inappropriate language is strictly prohibited. If misuse is
          detected, technical information (such as browser and timestamp) may be saved and you will
          be blocked from posting further messages.
        </div>
        <div className="text-sm font-medium text-muted-foreground mb-4">
          Here you can leave a message that will be saved and displayed for everyone. A new message
          is shown every 10 seconds.
          {!isOnline && ' (Offline mode - limited functionality)'}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
            disabled={banned}
            maxLength={200}
            rows={3}
          />
          <button
            type="submit"
            className="bg-primary text-white dark:text-black font-bold px-4 py-2 rounded disabled:opacity-50 w-full"
            disabled={banned}
          >
            {isOnline ? 'Post' : 'Offline - Spara lokalt'}
          </button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {connectionError && <div className="text-red-500 mt-2">{connectionError}</div>}
      </section>

      <div className="max-w-4xl mx-auto my-12 min-h-[250px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={messages[currentIdx]?.id}
            initial={{ scale: 0.5, opacity: 0, rotateX: -180 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 1.5, opacity: 0, rotateX: 180 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-center px-4 text-foreground"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            {messages.length > 0 ? messages[currentIdx]?.text : 'No messages yet.'}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
