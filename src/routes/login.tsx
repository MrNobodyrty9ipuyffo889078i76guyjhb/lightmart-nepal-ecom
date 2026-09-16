import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login | LightMart Nepal" },
      { name: "description", content: "Sign in to your LightMart account to track orders and save favourites." },
      { property: "og:title", content: "Login | LightMart Nepal" },
      { property: "og:description", content: "Sign in to your LightMart account to track orders and save favourites." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="text-center"><Logo /></div>
      <h1 className="mt-8 text-2xl font-semibold tracking-tight">Login</h1>
      <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <label className="block text-xs">
          <span className="text-muted-foreground">Email or phone</span>
          <input required className="mt-1.5 w-full border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink" />
        </label>
        <label className="block text-xs">
          <span className="text-muted-foreground">Password</span>
          <input type="password" required className="mt-1.5 w-full border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink" />
        </label>
        <button type="submit" className="w-full bg-ink py-3.5 text-xs font-semibold uppercase tracking-wider text-white">Login</button>
      </form>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        New to LightMart? <Link to="/signup" className="text-brand">Create an account</Link>
      </p>
    </div>
  ),
});
