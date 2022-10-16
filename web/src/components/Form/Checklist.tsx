import * as SelectPrimitive from '@radix-ui/react-select'
import cx from 'classnames'
import { CaretDown, CaretUp, Check } from 'phosphor-react'
import Button from './Button'

export function Checklist() {
  return (
    <SelectPrimitive.Root defaultValue="blueberry">
      <SelectPrimitive.Trigger asChild aria-label="Games">
        <Button>
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon>
            <CaretDown size={24} className="text-zinc-400" />
          </SelectPrimitive.Icon>
        </Button>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content>
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-zinc-400">
          <CaretUp />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="inline-flex bg-zinc-900 p-2 rounded-lg shadow-lg">
          <SelectPrimitive.Group>
            {['Apple', 'Banana', 'Blueberry', 'Strawberry', 'Grapes'].map((f, i) => (
              <SelectPrimitive.Item
                key={`${f}-${i}`}
                value={f.toLowerCase()}
                className={cx(
                  'flex items-center px-8 py-2 rounded text-sm font-medium focus:bg-zinc-700',
                  'focus:outline-none select-none'
                )}
              >
                <SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <Check />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-zinc-400">
          <CaretDown />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  )
}
