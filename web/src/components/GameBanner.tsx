interface GameBannerProps {
  bannerUrl: string
  title: string
  adsCount: number
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a href="" className="relative  overflow-hidden ">
      <img src={props.bannerUrl} alt={props.title} className="w-full" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="text-white font-bold block tracking-[-0.18px]">{props.title}</strong>
        <span className="text-zinc-300 text-sm block">
          {props.adsCount} {props.adsCount === 1 ? 'ad' : 'ads'}{' '}
        </span>
      </div>
    </a>
  )
}
