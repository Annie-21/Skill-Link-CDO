import { useState } from "react";
import Navbar from "../components/Navbar";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";
import {
  Inbox,
  History,
  MapPin,
  CalendarDays,
  CheckCircle,
  XCircle,
  Star,
  Banknote,
  ClipboardList,
  UserCircle,
} from "lucide-react";
import {
  initialJobOffers,
  workerJobHistory,
} from "../data/sampleData";

const workerMetrics = [
  { label: "Offers Received", value: 2,    accentColor: "#2e75b6" },
  { label: "Jobs Completed",  value: 3,    accentColor: "#1d9e75" },
  { label: "Average Rating",  value: "4.7", accentColor: "#534ab7" },
  { label: "Total Earned",    value: "₱2,400", accentColor: "#ba7517" },
];

function WorkerDashboard({ currentUser, onLogout }) {
  const [activeTab, setActiveTab]   = useState("offers");
  const [offers, setOffers]         = useState(initialJobOffers);
  const [expandedOffer, setExpandedOffer] = useState(null);

  function handleAccept(offerId) {
    setOffers((prev) =>
      prev.map((o) =>
        o.offerId === offerId ? { ...o, status: "offer_accepted" } : o
      )
    );
  }

  function handleDecline(offerId) {
    setOffers((prev) =>
      prev.map((o) =>
        o.offerId === offerId ? { ...o, status: "offer_declined" } : o
      )
    );
  }

  const pendingOffers   = offers.filter((o) => o.status === "pending_response");
  const respondedOffers = offers.filter((o) => o.status !== "pending_response");

  const tabs = [
    { key: "offers",  label: "Job Offers",  icon: Inbox,       badge: pendingOffers.length },
    { key: "history", label: "Job History", icon: History,     badge: null },
    { key: "profile", label: "My Profile",  icon: UserCircle,  badge: null },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar currentUser={currentUser} onLogout={onLogout} />

      <main className="max-w-4xl mx-auto px-4 py-7 flex flex-col gap-5">

        {/* Greeting */}
        <div>
          <h1 className="text-xl font-bold text-[#1f4e79]">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Here is your activity summary for today.
          </p>
        </div>

        {/* Metrics */}
        <section className="flex flex-wrap gap-3" aria-label="Worker metrics">
          {workerMetrics.map((m) => (
            <MetricCard
              key={m.label}
              label={m.label}
              value={m.value}
              accentColor={m.accentColor}
            />
          ))}
        </section>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          {/* Tab bar */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-colors relative
                    ${activeTab === tab.key
                      ? "text-[#1f4e79] border-b-2 border-[#1f4e79] bg-blue-50/50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.badge > 0 && (
                    <span className="bg-[#2e75b6] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="p-6">

            {/* ── Job Offers Tab ─────────────────────────────────────── */}
            {activeTab === "offers" && (
              <div className="flex flex-col gap-4">
                {pendingOffers.length === 0 && respondedOffers.length === 0 && (
                  <div className="text-center py-10 text-gray-400">
                    <Inbox size={36} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No job offers yet.</p>
                  </div>
                )}

                {pendingOffers.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                      Pending Response
                    </h3>
                    <div className="flex flex-col gap-3">
                      {pendingOffers.map((offer) => (
                        <OfferCard
                          key={offer.offerId}
                          offer={offer}
                          expanded={expandedOffer === offer.offerId}
                          onToggle={() =>
                            setExpandedOffer((prev) =>
                              prev === offer.offerId ? null : offer.offerId
                            )
                          }
                          onAccept={() => handleAccept(offer.offerId)}
                          onDecline={() => handleDecline(offer.offerId)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {respondedOffers.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                      Responded
                    </h3>
                    <div className="flex flex-col gap-3">
                      {respondedOffers.map((offer) => (
                        <OfferCard
                          key={offer.offerId}
                          offer={offer}
                          expanded={expandedOffer === offer.offerId}
                          onToggle={() =>
                            setExpandedOffer((prev) =>
                              prev === offer.offerId ? null : offer.offerId
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Job History Tab ────────────────────────────────────── */}
            {activeTab === "history" && (
              <div className="flex flex-col gap-3">
                {workerJobHistory.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    <History size={36} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No completed jobs yet.</p>
                  </div>
                ) : (
                  workerJobHistory.map((job) => (
                    <article
                      key={job.offerId}
                      className="border border-gray-200 rounded-xl p-4 bg-gray-50"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-700">
                            {job.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Resident: {job.residentName}
                          </p>
                        </div>
                        <StatusBadge status={job.status} />
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <CalendarDays size={12} />
                          {job.date}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Banknote size={12} />
                          ₱{job.rate}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                          <Star size={12} />
                          {job.rating} / 5
                        </span>
                      </div>
                    </article>
                  ))
                )}
              </div>
            )}

            {/* ── Profile Tab ────────────────────────────────────────── */}
            {activeTab === "profile" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                  <div className="w-14 h-14 bg-[#e6f1fb] rounded-full flex items-center justify-center">
                    <UserCircle size={32} className="text-[#2e75b6]" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{currentUser.name}</p>
                    <p className="text-sm text-gray-500">{currentUser.email}</p>
                    <StatusBadge status="verified" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <ProfileField label="Skill Category" value="Plumber" />
                  <ProfileField label="Declared Rate"  value="₱800/day" />
                  <ProfileField label="Experience"     value="5 years" />
                  <ProfileField label="Average Rating" value="4.8 / 5.0" />
                </div>
              </div>
            )}

          </div>
        </div>

      </main>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function OfferCard({ offer, expanded, onToggle, onAccept, onDecline }) {
  const isPending = offer.status === "pending_response";

  return (
    <article
      className={`rounded-xl border border-l-4 p-4 transition-shadow
        ${isPending
          ? "bg-white border-gray-200 border-l-[#2e75b6]"
          : offer.status === "offer_accepted"
            ? "bg-emerald-50 border-gray-200 border-l-emerald-500"
            : "bg-gray-50 border-gray-200 border-l-gray-300"
        }`}
    >
      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
        <div>
          <p className="text-sm font-semibold text-gray-700 leading-snug">
            {offer.description}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            From: {offer.residentName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={offer.status} />
          <button
            onClick={onToggle}
            className="text-xs text-[#2e75b6] font-semibold hover:underline flex items-center gap-1"
          >
            <ClipboardList size={13} />
            {expanded ? "Hide" : "Details"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
          <span className="flex items-center gap-1.5">
            <MapPin size={12} className="text-gray-400" />
            {offer.location}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays size={12} className="text-gray-400" />
            {offer.preferredDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Banknote size={12} className="text-gray-400" />
            Budget: ₱{offer.budgetMin} – ₱{offer.budgetMax}
          </span>
        </div>
      )}

      {isPending && (
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={onDecline}
            className="flex items-center gap-1.5 px-4 py-1.5 border border-red-300 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-50 transition-colors"
          >
            <XCircle size={14} />
            Decline
          </button>
          <button
            onClick={onAccept}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1d9e75] text-white text-xs font-semibold rounded-lg hover:bg-[#0f6e56] transition-colors"
          >
            <CheckCircle size={14} />
            Accept
          </button>
        </div>
      )}
    </article>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="font-semibold text-gray-700">{value}</p>
    </div>
  );
}

export default WorkerDashboard;
