import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account | LightMart Nepal" },
      { name: "description", content: "Create a LightMart account for faster checkout and order history." },
      { property: "og:title", content: "Create Account | LightMart Nepal" },
      { property: "og:description", content: "Create a LightMart account for faster checkout and order history." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="text-center"><Logo /></div>
      <h1 className="mt-8 text-2xl font-semibold tracking-tight">Create Account</h1>
      <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        {["Full name", "Phone number", "Email"].map((l) => (
          <label key={l} className="block text-xs">
            <span className="text-muted-foreground">{l}</span>
            <input required className="mt-1.5 w-full border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink" />
          </label>
        ))}
        <label className="block text-xs">
          <span className="text-muted-foreground">Password</span>
          <input type="password" required className="mt-1.5 w-full border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink" />
        </label>
        <button type="submit" className="w-full bg-ink py-3.5 text-xs font-semibold uppercase tracking-wider text-white">Sign Up</button>
      </form>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Already have an account? <Link to="/login" className="text-brand">Login</Link>
      </p>
    </div>
  ),
});
