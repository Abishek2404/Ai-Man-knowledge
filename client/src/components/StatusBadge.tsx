import type { ClaimStatus } from "@/lib/types";

const styles: Record<ClaimStatus, string> = {
  Submitted: "bg-slate-100 text-slate-700",
  "Needs Review": "bg-amber-100 text-amber",
  Verified: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-berry",
  "Needs More Evidence": "bg-orange-100 text-orange-700"
};

export function StatusBadge({ status }: { status: ClaimStatus }) {
  return (
    <span className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}
