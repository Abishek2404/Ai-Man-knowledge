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
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-ink">
          <BrainCircuit className="h-6 w-6 text-mint" aria-hidden="true" />
          <span>AIMan Knowledge Commons</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 hover:bg-slate-100 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
