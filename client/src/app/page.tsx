import Link from "next/link";
import { ArrowRight, ClipboardCheck, DatabaseZap, UsersRound } from "lucide-react";

const steps = [
  {
    title: "Submit knowledge",
    text: "Contributors share real-world observations, AI corrections, evidence, location, date, and consent.",
    icon: DatabaseZap
  },
  {
    title: "Score quality",
    text: "A lightweight scoring engine estimates value, completeness, confidence, and missing trust signals.",
    icon: ClipboardCheck
  },
  {
    title: "Validate with humans",
    text: "Reviewers approve, reject, request evidence, and classify how the claim can support AI systems.",
    icon: UsersRound
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-mint">
              Human validation infrastructure
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-ink md:text-6xl">
              AIMan Knowledge Commons
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              A prototype platform where people submit real-world knowledge, reviewers validate it,
              and verified claims become useful for more reliable AI systems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 rounded-md bg-mint px-4 py-2 font-semibold text-white hover:bg-teal-800"
              >
                Submit a claim
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/reviewer"
                className="rounded-md border border-line px-4 py-2 font-semibold text-ink hover:bg-slate-100"
              >
                Review queue
              </Link>
            </div>
          </div>
          <div className="rounded-md border border-line bg-paper p-5">
            <div className="grid gap-3">
              {[
                "Hallucination corrections",
                "Local infrastructure changes",
                "Expert and field observations",
                "Evidence-backed environmental updates"
              ].map((item) => (
                <div key={item} className="rounded-md bg-white p-4 text-sm font-medium shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="rounded-md border border-line bg-white p-5">
                <Icon className="h-7 w-7 text-mint" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-semibold">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
