import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from '@/hooks/use-toast'
import emailjs from '@emailjs/browser'
import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } from '../emailjs.config'

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(100),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(1000),
})

type FormValues = z.infer<typeof formSchema>

// Polyfill confetti for non-browser (test) environments
const isTest = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test'
let confetti: (...args: unknown[]) => void = () => {}
if (!isTest && typeof window !== 'undefined') {
  import('canvas-confetti').then((mod) => {
    confetti = mod.default
  })
}

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: data.name,
          message: data.message,
          title: 'Contact Form',
          email: data.email,
        },
        PUBLIC_KEY
      )
      toast({
        title: 'Message sent successfully!',
        description: "Thank you for reaching out. I'll get back to you soon.",
      })
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      })
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      form.reset()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Something went wrong!',
        description: 'Could not send your message. Please try again later.',
        variant: 'destructive',
      })
    }
    setIsSubmitting(false)
  }

  return {
    form,
    isSubmitting,
    showSuccess,
    onSubmit,
  }
}
