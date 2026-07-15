"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

interface NavLink {
  href: string;
  label: string;
}

const publicNavLinks: NavLink[] = [
  { href: "/events", label: "Explore" },
  { href: "/blogs", label: "Blogs" },
  { href: "/fund", label: "Donate" },
];

const privateNavlinks: NavLink[] =[
  { href: "/listings", label: "MyListings" },
  { href: "/add", label: "AddListings" }
];

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: NavLink[] = session
    ? [...publicNavLinks, ...privateNavlinks]
    : publicNavLinks;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully.");
    setIsOpen(false);
    router.push("/");
  };

  return (
    <nav className="w-full bg-page px-4 py-6">
      <div className="mx-auto max-w-[90%]">
        <div className="flex items-center justify-between rounded-full border border-border bg-surface px-6 py-3">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold text-primary">
            EventHive
          </Link>

          {/* Center nav links — hidden on mobile */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth cluster — hidden on mobile */}
          <div className="hidden items-center gap-4 md:flex">
            {isPending ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-border" />
            ) : session ? (
              <>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-page">
                  {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-muted transition-colors hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/authentication/login"
                  className="text-sm text-muted transition-colors hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  href="/authentication/signup"
                  className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-page transition-colors hover:bg-accent-hover"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span className="h-0.5 w-6 bg-primary" />
            <span className="h-0.5 w-6 bg-primary" />
            <span className="h-0.5 w-6 bg-primary" />
          </button>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="mt-2 flex flex-col gap-1 rounded-2xl border border-border bg-surface p-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-page hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t border-border" />

            {session ? (
              <button
                onClick={handleLogout}
                className="rounded-lg px-3 py-2 text-left text-sm text-muted hover:bg-page hover:text-primary"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/authentication/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-page hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  href="/authentication/signup"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-accent px-3 py-2 text-center text-sm font-semibold text-page hover:bg-accent-hover"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}