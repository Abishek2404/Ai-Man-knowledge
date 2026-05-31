import type { ClaimStatus } from "@/lib/types";

const styles: Record<ClaimStatus, string> = {
  Submitted: "bg-slate-500/15 text-slate-200 ring-slate-400/20",
  "Needs Review": "bg-amber/15 text-amber ring-amber/25",
  Verified: "bg-emerald-400/15 text-emerald-300 ring-emerald-300/25",
  Rejected: "bg-berry/15 text-rose-300 ring-berry/25",
  "Needs More Evidence": "bg-orange-400/15 text-orange-300 ring-orange-300/25"
};

export function StatusBadge({ status }: { status: ClaimStatus }) {
  return (
    <span className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ${styles[status]}`}>
      {status}
    </span>
  );
}
