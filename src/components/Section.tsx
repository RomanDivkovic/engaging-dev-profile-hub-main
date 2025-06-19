import { cn } from '@/lib/utils'
import { ReactNode, useRef, useEffect, useState } from 'react'

interface SectionProps {
  id?: string
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  titleClassName?: string
  fullWidth?: boolean
}

const Section = ({
  id,
  title,
  subtitle,
  children,
  className,
  titleClassName,
  fullWidth = false,
}: SectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'py-16 sm:py-20 opacity-0 translate-y-8 transition-all duration-1000',
        visible && 'opacity-100 translate-y-0',
        className
      )}
    >
      <div className={cn(!fullWidth && 'container mx-auto px-4 sm:px-6 lg:px-8')}>
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2
                className={cn(
                  'text-3xl font-bold mb-3 inline-block',
                  'after:block after:h-1 after:w-1/3 after:bg-secondary after:mx-auto after:mt-2',
                  titleClassName
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

export default Section
