export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-black)]">
      <div className="text-center">
        <h1 className="font-display text-[96px] font-black text-[var(--text-inverted)]">
          404
        </h1>
        <p className="mt-4 text-[var(--text-muted)]">Page not found</p>
        <a
          href="/"
          className="mt-8 inline-block bg-[var(--accent)] px-8 py-4 font-body text-sm font-bold tracking-[1.5px] text-[var(--text-primary)] hover:bg-[var(--accent-bright)] transition-colors"
        >
          GO HOME
        </a>
      </div>
    </div>
  );
}
