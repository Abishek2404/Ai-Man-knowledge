import Link from "next/link";
import { BrainCircuit } from "lucide-react";

const links = [
  { href: "/", label: "Overview" },
  { href: "/submit", label: "Submit" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/reviewer", label: "Reviewer" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-md border border-mint/30 bg-mint/10">
            <BrainCircuit className="h-5 w-5 text-mint" aria-hidden="true" />
          </span>
          <span>AIMan Knowledge Commons</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-300">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
