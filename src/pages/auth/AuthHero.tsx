type AuthHeroProps = {
  caption?: string
}

export default function AuthHero({
  caption = 'Our plans, our adventures. 💗',
}: AuthHeroProps) {
  return (
    <div className="space-y-0 text-center">
      <div className="relative mx-auto w-full max-w-[42rem] overflow-hidden rounded-2xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-8 bg-[radial-gradient(circle_at_center,rgba(251,113,133,0.18),rgba(251,113,133,0.08)_38%,rgba(255,255,255,0)_70%)] blur-sm"
        />
        <img
          src="/authIcon.png"
          alt=""
          aria-hidden="true"
          className="relative z-10 block h-[24rem] w-full object-cover object-top sm:h-[26rem]"
        />
      </div>

      <div className="space-y-0 text-center -mt-35">
        <p className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Together <span className="text-rose-400">♡</span>
        </p>
        <p className="text-sm text-slate-500 sm:text-base">{caption}</p>
      </div>
    </div>
  )
}
