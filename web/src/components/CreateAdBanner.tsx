import { MagnifyingGlassPlus } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient animate-text self-stretch rounded-lg mt-8 overflow-hidden sm:mx-0 mx-2">
      <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
        <div>
          <strong className="text-white sm:text-2xl text-xl font-black block">
            Haven't found your duo?
          </strong>
          <span className="text-zinc-400 sm:text-sm text-xs block">
            Post your ad to find other players!
          </span>
        </div>

        <Dialog.Trigger className="px-4 py-3 flex items-center gap-3 bg-violet-500 text-white rounded-md hover:bg-violet-600 transition-colors">
          <MagnifyingGlassPlus size={24} />
          Post ad
        </Dialog.Trigger>
      </div>
    </div>
  )
}
