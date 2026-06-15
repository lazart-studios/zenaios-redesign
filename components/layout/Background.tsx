/** Global backdrop: a near-flat, very light vertical wash. Minimal — no orbs, no grid. */
export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(180deg,#ffffff_0%,#f9fafb_100%)]"
    />
  );
}
