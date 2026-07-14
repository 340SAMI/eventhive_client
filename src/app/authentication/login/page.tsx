"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Better Auth sign-in call goes here later
    console.log({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-page px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8">
        <Link href="/" className="mb-8 block text-center text-lg font-bold text-primary">
          EventHive
        </Link>

        <h1 className="mb-1 text-xl font-semibold text-primary">Welcome back</h1>
        <p className="mb-6 text-sm text-muted">Log in to continue to your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-border bg-page px-3 py-2 text-sm text-primary outline-none focus:border-accent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-muted">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-border bg-page px-3 py-2 text-sm text-primary outline-none focus:border-accent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-page transition-colors hover:bg-accent-hover"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-accent hover:text-accent-hover">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}