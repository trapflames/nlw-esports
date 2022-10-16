import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Check, GameController } from 'phosphor-react'

import { Input } from './Form/Input'
import { Checklist } from './Form/Checklist' // TODO: Replace select in modal with Radix Select
import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Game {
  id: string
  title: string
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>()
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    axios('http://localhost:3333/games').then((response) => {
      setGames(response.data)
    })
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    console.log(data.hourStart)
    if (!data.game) {
      return toast.error('Please select your game!')
    }
    if (!data.name) {
      return toast.error('Please insert your nickname!')
    }
    if (!data.yearsPlaying) {
      return toast.error('Please insert years of experience!')
    }
    if (!data.discord) {
      return toast.error('Please insert your discord!')
    }
    if (!weekDays?.length) {
      return toast.error('Please insert at least one week day!')
    }
    if (!data.hourStart || !data.hourEnd) {
      return toast.error('Please insert your gaming hours!')
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays?.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      })
      toast.success('Created Ad Successfully!')
    } catch (err) {
      console.log(err)
      toast.error('Something went wrong!')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content
        className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      rounded-lg w-full max-w-[480px] shadow-lg shadow-black/25 text-sm sm:text-base"
      >
        <Dialog.Title className="text-3xl font-black">Post an ad</Dialog.Title>
        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              What's your game?
            </label>
            {/* <Checklist /> 
            Checklist is a Select Radix Component that I can't center over the modal screen
            */}
            <select
              name="game"
              id="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none truncate"
              defaultValue=""
            >
              <option className="text-zinc-500" disabled value="">
                Select the game that you want to play
              </option>
              {games.map((game) => {
                return (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Your nickname</label>
            <Input name="name" type="text" id="name" placeholder="What's your gamer name" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Years of experience?</label>
              <Input
                name="yearsPlaying"
                type="number"
                id="yearsPlaying"
                placeholder="It's ok to be ZERO"
                className="placeholder:truncate"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">What's your discord?</label>
              <Input name="discord" type="text" id="discord" placeholder="Discord_#0000" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="weekDays">Your Gaming days</label>
            <ToggleGroup.Root
              type="multiple"
              className="flex justify-between gap-2 text-xs sm:text-sm h-8"
              value={weekDays}
              onValueChange={setWeekDays}
            >
              <ToggleGroup.Item
                value="0"
                className={`w-11 rounded transition-colors 
                ${weekDays?.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}
                `}
                title="Sunday"
              >
                Sun
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="1"
                className={`w-11 rounded transition-colors 
                ${weekDays?.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}
                `}
                title="Monday"
              >
                Mon
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="2"
                className={`w-11 rounded transition-colors 
                ${weekDays?.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}
                `}
                title="Tuesday"
              >
                Tue
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="3"
                className={`w-11 rounded transition-colors 
                ${weekDays?.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}
                `}
                title="Wednesday"
              >
                Wed
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="4"
                className={`w-11 rounded transition-colors 
                ${weekDays?.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}
                `}
                title="Thursday"
              >
                Thr
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="5"
                className={`w-11 rounded transition-colors 
                ${weekDays?.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}
                `}
                title="Friday"
              >
                Fri
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="6"
                className={`w-11 rounded transition-colors 
                ${weekDays?.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}
                `}
                title="Saturday"
              >
                Sat
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="hourStart">When do you usually play? (time interval)</label>
            <div className="grid grid-cols-2 gap-4 items-center justify-items-stretch">
              <Input type="time" name="hourStart" id="hourStart" placeholder="From" />
              <Input type="time" name="hourEnd" id="hourEnd" placeholder="To" />
            </div>
          </div>

          <label className="mt-8 flex gap-2 items-center">
            <Checkbox.Root
              checked={useVoiceChannel}
              className="w-6 h-6 rounded bg-zinc-900 p-1"
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)
                }
              }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            I'm able to use chat voice
          </label>

          <footer className="mt-4 flex justify-end gap-4 font-semibold ">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md
            hover:bg-zinc-600 transition-colors"
            >
              Cancel
            </Dialog.Close>
            <button
              type="submit"
              className="flex items-center gap-3  bg-violet-500 px-5 h-12 rounded-md
            hover:bg-violet-600 transition-colors"
            >
              <GameController size={24} />
              Find Duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
