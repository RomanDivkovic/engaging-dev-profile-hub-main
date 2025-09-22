import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useContactForm } from '@/hooks/use-contact-form'

export const ContactForm = () => {
  const { form, isSubmitting, showSuccess, onSubmit } = useContactForm()

  return (
    <div className="bg-card shadow-sm rounded-lg p-6 md:p-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Send me a message</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message here..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Sending</span>
                <span className="inline-block w-4 h-4 border-2 border-t-2 border-t-transparent border-primary rounded-full animate-spin"></span>
              </>
            ) : (
              'Send Message'
            )}
          </Button>
          {showSuccess && (
            <div className="mt-6 flex flex-col items-center animate-fade-in">
              <svg
                className="w-16 h-16 text-green-500 mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <div className="text-lg font-semibold text-green-600">Message sent! Thank you 🙌</div>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}
