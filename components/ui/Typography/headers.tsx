import { cn } from '@/utils/helpers'

interface HeadingProps<HeadType>
  extends React.HTMLAttributes<HTMLHeadingElement> {
  headingLevel?: HeadType
  children: React.ReactNode
  className?: string
}

interface BlockQuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode
  className?: string
}

export function H1({ children, className, ...props }: HeadingProps<'h1'>) {
  return (
    <h1
      className={cn(
        'scroll-m-20 font-extrabold tracking-tight text-5xl md:text-6xl leading-tight mt-10 mb-5 text-primary relative group',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export function H2({ children, className, ...props }: HeadingProps<'h2'>) {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-4xl md:text-5xl font-semibold tracking-tight first:mt-0 leading-tight md:leading-relaxed mt-10 mb-5  text-teal-600 dark:text-teal-500 relative group',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function H3({ children, className, ...props }: HeadingProps<'h3'>) {
  return (
    <h3
      className={cn(
        'relative group scroll-m-20 text-2xl md:text-3xl font-semibold tracking-tight',
        'mt-10 mb-5 text-sky-600 dark:text-sky-500',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

export function H4({ children, className, ...props }: HeadingProps<'h4'>) {
  return (
    <h4
      className={cn(
        'relative group scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight',
        'mt-10 mb-5 text-amber-600 dark:text-amber-500',
        className
      )}
      {...props}
    >
      {children}
    </h4>
  )
}

export function P({ children, className, ...props }: HeadingProps<'p'>) {
  return (
    <p className={cn('[&:not(:first-child)]:mt-6', className)} {...props}>
      {children}
    </p>
  )
}

export function BlockQuote({ children, className, ...props }: BlockQuoteProps) {
  return (
    <blockquote
      className={cn(
        'ltr:border-l-purple-500 rtl:border-r-purple-500 ltr:border-l-4 rtl:border-r-4 ltr:pl-5 rtl:pr-5 py-5 my-5',
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  )
}
