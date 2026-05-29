import { ClaimForm } from "@/components/ClaimForm";

export default function SubmitPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase text-mint">Knowledge submission</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">Submit a knowledge claim</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Add the claim, supporting context, and evidence that a reviewer should inspect.
        </p>
      </div>
      <ClaimForm />
    </main>
  );
}
