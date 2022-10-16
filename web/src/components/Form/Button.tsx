import cx from 'classnames'
import React from 'react'

type Props = Omit<React.ComponentProps<'button'>, 'className'> & {}

const Button = React.forwardRef<HTMLButtonElement, Props>(({ children, ...props }, ref) => (
  <button
    ref={ref}
    {...props}
    className={cx(
      'inline-flex justify-between items-center select-none rounded px-4 py-3 text-sm font-medium',
      'bg-zinc-900 placeholder:text-zinc-500 ',
      'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
      // Register all radix states
      'group',
      'radix-state-open:bg-zinc-900',
      'radix-state-on:bg-zinc-900',
      'radix-state-instant-open:bg-zinc-900 radix-state-delayed-open:bg-zinc-900'
    )}
  >
    {children}
  </button>
))

Button.displayName = 'Button'
export default Button
