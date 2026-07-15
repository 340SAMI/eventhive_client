import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-[90%] py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              Event<span className="text-accent">Hive</span>
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              Discover local events, book your spot in seconds, and never miss what&apos;s happening around you.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-primary">Navigation</h3>
            <div className="space-y-3">
              <Link href="/" className="block text-sm text-muted transition hover:text-primary">
                Home
              </Link>
              <Link href="/events" className="block text-sm text-muted transition hover:text-primary">
                Explore
              </Link>
              <Link href="/about" className="block text-sm text-muted transition hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="block text-sm text-muted transition hover:text-primary">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-primary">Account</h3>
            <div className="space-y-3">
              <Link href="/login" className="block text-sm text-muted transition hover:text-primary">
                Login
              </Link>
              <Link href="/register" className="block text-sm text-muted transition hover:text-primary">
                Register
              </Link>
              <Link href="/events/add" className="block text-sm text-muted transition hover:text-primary">
                Host an Event
              </Link>
              <Link href="/events/manage" className="block text-sm text-muted transition hover:text-primary">
                Manage Events
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-primary">Connect</h3>
            <div className="flex items-center gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-page text-muted transition hover:border-accent hover:text-primary">
                F
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-page text-muted transition hover:border-accent hover:text-primary">
                T
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-page text-muted transition hover:border-accent hover:text-primary">
                I
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-sm text-muted">© 2026 EventHive. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-muted transition hover:text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted transition hover:text-primary">
              Terms
            </Link>
            <Link href="/cookies" className="text-sm text-muted transition hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}