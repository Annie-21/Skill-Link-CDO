import { useState } from "react";
import StatusBadge from "./StatusBadge";

function WorkerCard({ worker, onSendOffer, offerSentTo }) {
  const [expanded, setExpanded] = useState(false);

  const isOfferSent = offerSentTo === worker.workerId;
  const stars =
    "★".repeat(Math.round(worker.avgRating)) +
    "☆".repeat(5 - Math.round(worker.avgRating));

  return (
    <article
      className={`rounded-xl border border-gray-200 border-l-4 p-5 transition-shadow hover:shadow-md
        ${expanded
          ? "bg-white border-l-emerald-500"
          : "bg-gray-50 border-l-[#2e75b6]"
        }`}
    >

      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-bold text-[#1f4e79]">
            {worker.fullName}
          </h3>
          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-0.5 rounded-full">
            {worker.skillCategory}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <StatusBadge status={worker.verificationStatus} />
          <button
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="text-xs font-semibold text-[#2e75b6] border border-gray-200 bg-white px-3 py-1 rounded-md hover:bg-[#2e75b6] hover:text-white hover:border-[#2e75b6] transition-colors"
          >
            {expanded ? "▲ Hide" : "▼ Details"}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 mb-4 max-sm:grid-cols-2">
        <StatItem label="Rate"        value={`₱${worker.declaredRate}/day`} />
        <StatItem label="Rating"      value={`${stars} ${worker.avgRating}`} />
        <StatItem label="Distance"    value={`${worker.distanceKm} km`} />
        <StatItem
          label="Match Score"
          value={`${Math.round(worker.compositeScore * 100)}%`}
          isHighlight
        />
      </div>

      {/* Expanded score breakdown — Interaction */}
      {expanded && (
        <div className="border-t border-gray-200 pt-4 mb-4">
          <h4 className="text-sm font-bold text-[#1f4e79] mb-3">
            Score Breakdown
          </h4>
          <div className="flex flex-col gap-2">
            <ScoreBar label="Skill Match" value={worker.scoreBreakdown.skillMatch}  />
            <ScoreBar label="Proximity"   value={worker.scoreBreakdown.proximity}   />
            <ScoreBar label="Price Match" value={worker.scoreBreakdown.priceCompat} />
            <ScoreBar label="Rating"      value={worker.scoreBreakdown.rating}      />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="flex justify-end items-center">
        {isOfferSent ? (
          <span className="text-sm font-semibold text-emerald-700">
            ✓ Offer sent — waiting for response
          </span>
        ) : (
          <button
            onClick={() => onSendOffer(worker)}
            className="px-6 py-2 bg-[#2e75b6] text-white text-sm font-bold rounded-lg hover:bg-[#1f4e79] transition-colors"
          >
            Send Job Offer
          </button>
        )}
      </footer>

    </article>
  );
}

// ── Internal sub-components ───────────────────────────────────────────────────

function StatItem({ label, value, isHighlight }) {
  return (
    <div className="text-center">
      <span className="block text-xs text-gray-400 mb-0.5">{label}</span>
      <span
        className={`text-sm font-semibold
          ${isHighlight ? "text-emerald-600" : "text-gray-700"}`}
      >
        {value}
      </span>
    </div>
  );
}

function ScoreBar({ label, value }) {
  const pct = Math.round(value * 100);
  return (
    <div className="grid grid-cols-[100px_1fr_40px] items-center gap-3 max-sm:grid-cols-[80px_1fr_36px]">
      <span className="text-xs text-gray-500">{label}</span>
      <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-[#2e75b6] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-[#1f4e79] text-right">
        {pct}%
      </span>
    </div>
  );
}

export default WorkerCard;
