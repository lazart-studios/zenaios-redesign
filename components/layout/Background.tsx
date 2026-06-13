/** Global decorative backdrop: deep-navy gradient, soft brand glows, faint grid. */
export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base vertical gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#06164a_0%,#02081c_55%,#02081c_100%)]" />

      {/* Brand glows */}
      <div className="absolute -top-40 left-1/2 size-[680px] -translate-x-1/2 rounded-full bg-zen/20 blur-[140px]" />
      <div className="absolute right-[-10%] top-[20%] size-[420px] rounded-full bg-sky/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-8%] size-[460px] rounded-full bg-zen/10 blur-[130px]" />

      {/* Faint grid + vignette */}
      <div className="bg-grid absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(100%_70%_at_50%_0%,#000_0%,transparent_75%)]" />
    </div>
  );
}
