import logoImg from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then((response) => {
      setGames(response.data)
    })
  }, [])

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: false,
      breakpoints: {
        '(min-width: 200px)': {
          slides: { perView: 2.2, spacing: 5 },
        },
        '(min-width: 400px)': {
          slides: { perView: 2.5, spacing: 5 },
        },
        '(min-width: 600px)': {
          slides: { perView: 3.5, spacing: 5 },
        },
        '(min-width: 800px)': {
          slides: { perView: 4.5, spacing: 5 },
        },
        '(min-width: 1000px)': {
          slides: { perView: 5.5, spacing: 10 },
        },
        '(min-width: 1200px)': {
          slides: { perView: 6.5, spacing: 10 },
        },
      },
      mode: 'snap',
      slides: { origin: 'center', perView: 5.5, spacing: 10, number: games.length },
      // range: {
      //     min: 1,
      //     max: 100,
      //     align: true,
      // },
    },
    [
      // add plugins here
    ]
  )
  console.log(games.length)

  return (
    <div className="lg:max-w-screen-lg xl:lg:max-w-[1344px] md:max-w-screen-md sm:max-w-screen-sm mx-auto flex flex-col items-center my-20 ">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {},
          error: { style: { background: '#7c3aed', color: '#fff' } },
          success: {
            style: { background: 'rgb(22 101 52)', color: '#fff' },
          },
        }}
      />
      <img src={logoImg} alt="logo" />

      <h1 className="sm:text-6xl text-5xl text-white font-black mt-20 text-center">
        Your{' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text animate-text"> duo</span> is
        here.
      </h1>

      <div className="mt-16 keen-slider" ref={sliderRef}>
        {games.map((game) => {
          return (
            <div key={game.id} className="keen-slider__slide rounded-lg">
              <GameBanner
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
              />
            </div>
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
