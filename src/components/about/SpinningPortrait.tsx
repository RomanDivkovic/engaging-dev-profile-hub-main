import { profileImage } from '@/data/about'

export const SpinningPortrait = () => {
  return (
    <div className="relative shrink-0 reveal-animation">
      <div
        aria-hidden="true"
        className="absolute inset-5 translate-y-6 rounded-full bg-secondary/15 blur-2xl"
      />
      <div className="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-full border border-white/30 shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
        <img src={profileImage} alt="Roman Divković" className="h-full w-full object-cover" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 32% 25%, rgba(255,255,255,0.16), transparent 48%, rgba(0,0,0,0.22) 88%, rgba(0,0,0,0.38) 100%)',
            boxShadow:
              'inset 3px 3px 12px rgba(255,255,255,0.18), inset -10px -12px 24px rgba(0,0,0,0.18)',
          }}
        />
      </div>
    </div>
  )
}
