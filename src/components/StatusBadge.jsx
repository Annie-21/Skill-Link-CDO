const STATUS_STYLES = {
  verified:       "bg-emerald-50 text-emerald-800",
  pending:        "bg-amber-50 text-amber-800",
  rejected:       "bg-red-50 text-red-800",
  flagged:        "bg-orange-50 text-orange-800",
  offer_sent:     "bg-blue-50 text-blue-800",
  offer_accepted: "bg-emerald-50 text-emerald-800",
  offer_declined: "bg-red-50 text-red-800",
  completed:      "bg-purple-50 text-purple-800",
  pending_match:  "bg-gray-100 text-gray-600",
  cancelled:      "bg-gray-100 text-gray-600",
};

const STATUS_LABELS = {
  verified:       "Verified",
  pending:        "Pending",
  rejected:       "Rejected",
  flagged:        "Flagged",
  offer_sent:     "Offer Sent",
  offer_accepted: "Accepted",
  offer_declined: "Declined",
  completed:      "Completed",
  pending_match:  "Finding Match",
  cancelled:      "Cancelled",
};

function StatusBadge({ status }) {
  const colorClass = STATUS_STYLES[status] || "bg-gray-100 text-gray-600";
  const label      = STATUS_LABELS[status]  || status;

  return (
    <span
      className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${colorClass}`}
    >
      {label}
    </span>
  );
}

export default StatusBadge;
