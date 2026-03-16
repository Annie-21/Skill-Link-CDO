import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";
import {
  ShieldCheck,
  BarChart3,
  CheckCircle,
  XCircle,
  User,
  Wrench,
  Search,
  FileText,
  AlertCircle,
  CalendarDays,
} from "lucide-react";
import {
  adminMetrics,
  initialPendingProfiles,
  workersByCategory,
} from "../data/sampleData";

function AdminDashboard({ currentUser, onLogout }) {
  const [activeTab, setActiveTab]     = useState("queue");
  const [profiles, setProfiles]       = useState(initialPendingProfiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter]   = useState("all");

  // Reject form state
  const [rejectingId, setRejectingId]   = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError]   = useState("");

  function handleApprove(userId) {
    setProfiles((prev) =>
      prev.map((p) =>
        p.userId === userId ? { ...p, status: "verified" } : p
      )
    );
  }

  function openRejectForm(userId) {
    setRejectingId(userId);
    setRejectReason("");
    setRejectError("");
  }

  function handleRejectSubmit(e) {
    e.preventDefault();
    if (!rejectReason.trim()) {
      setRejectError("Please provide a reason for rejection.");
      return;
    }
    setProfiles((prev) =>
      prev.map((p) =>
        p.userId === rejectingId
          ? { ...p, status: "rejected", rejectReason }
          : p
      )
    );
    setRejectingId(null);
    setRejectReason("");
  }

  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole =
        roleFilter === "all" || p.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [profiles, searchQuery, roleFilter]);

  const pendingCount = profiles.filter((p) => !p.status).length;

  const tabs = [
    { key: "queue",     label: "Verification Queue", icon: ShieldCheck, badge: pendingCount },
    { key: "analytics", label: "Analytics",          icon: BarChart3,   badge: null },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar currentUser={currentUser} onLogout={onLogout} />

      <main className="max-w-4xl mx-auto px-4 py-7 flex flex-col gap-5">

        {/* Greeting */}
        <div>
          <h1 className="text-xl font-bold text-[#1f4e79]">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Brgy. Bulua — Manage profiles, rates, and analytics.
          </p>
        </div>

        {/* Metrics */}
        <section className="flex flex-wrap gap-3" aria-label="Admin metrics">
          {adminMetrics.map((m) => (
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
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-colors
                    ${activeTab === tab.key
                      ? "text-[#1f4e79] border-b-2 border-[#1f4e79] bg-blue-50/50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                  {tab.badge > 0 && (
                    <span className="bg-amber-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-6">

            {/* ── Verification Queue Tab ─────────────────────────────── */}
            {activeTab === "queue" && (
              <div className="flex flex-col gap-4">

                {/* Search + filter bar */}
                <div className="flex flex-wrap gap-3">
                  <div className="relative flex-1 min-w-[180px]">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#2e75b6] focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
                  <div className="flex gap-2">
                    {["all", "worker", "resident"].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRoleFilter(r)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all capitalize
                          ${roleFilter === r
                            ? "bg-[#1f4e79] text-white border-[#1f4e79]"
                            : "bg-white text-gray-500 border-gray-300 hover:border-[#2e75b6] hover:text-[#2e75b6]"
                          }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredProfiles.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    <ShieldCheck size={36} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No profiles match your search.</p>
                  </div>
                ) : (
                  filteredProfiles.map((profile) => (
                    <div key={profile.userId}>
                      <ProfileQueueCard
                        profile={profile}
                        onApprove={() => handleApprove(profile.userId)}
                        onReject={() => openRejectForm(profile.userId)}
                        isRejectFormOpen={rejectingId === profile.userId}
                      />

                      {/* Inline reject reason form */}
                      {rejectingId === profile.userId && (
                        <form
                          onSubmit={handleRejectSubmit}
                          className="mt-2 bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col gap-3"
                        >
                          <div className="flex items-center gap-2 text-red-700">
                            <AlertCircle size={15} />
                            <span className="text-sm font-semibold">
                              Provide a rejection reason
                            </span>
                          </div>
                          {rejectError && (
                            <p className="text-xs text-red-600">{rejectError}</p>
                          )}
                          <textarea
                            placeholder="e.g. Missing barangay clearance document..."
                            value={rejectReason}
                            onChange={(e) => {
                              setRejectReason(e.target.value);
                              setRejectError("");
                            }}
                            rows={2}
                            className="px-3 py-2 border border-red-300 rounded-lg text-sm bg-white focus:outline-none focus:border-red-500 resize-none"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setRejectingId(null)}
                              className="px-4 py-1.5 text-xs font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                            >
                              Confirm Rejection
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ── Analytics Tab ──────────────────────────────────────── */}
            {activeTab === "analytics" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-bold text-[#1f4e79] mb-4">
                    Workers by Skill Category
                  </h3>
                  <div className="flex flex-col gap-3">
                    {workersByCategory.map((item) => {
                      const maxCount = Math.max(...workersByCategory.map((w) => w.count));
                      const pct = Math.round((item.count / maxCount) * 100);
                      return (
                        <div
                          key={item.category}
                          className="grid grid-cols-[120px_1fr_36px] items-center gap-3"
                        >
                          <span className="text-sm text-gray-600 font-medium">
                            {item.category}
                          </span>
                          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className="h-full bg-[#2e75b6] rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-[#1f4e79] text-right">
                            {item.count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-5">
                  <h3 className="text-sm font-bold text-[#1f4e79] mb-4">
                    Job Request Status Breakdown
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { label: "Completed",     count: 87, color: "bg-emerald-100 text-emerald-800" },
                      { label: "Active",        count: 12, color: "bg-blue-100 text-blue-800" },
                      { label: "Pending Match", count: 5,  color: "bg-amber-100 text-amber-800" },
                      { label: "Cancelled",     count: 9,  color: "bg-gray-100 text-gray-600" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`rounded-xl p-4 text-center ${item.color}`}
                      >
                        <p className="text-2xl font-bold">{item.count}</p>
                        <p className="text-xs font-semibold mt-0.5">{item.label}</p>
                      </div>
                    ))}
                  </div>
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

function ProfileQueueCard({ profile, onApprove, onReject, isRejectFormOpen }) {
  const isResolved = profile.status === "verified" || profile.status === "rejected";
  const RoleIcon   = profile.role === "worker" ? Wrench : User;

  return (
    <article
      className={`rounded-xl border border-l-4 p-4
        ${profile.status === "verified"
          ? "border-gray-200 border-l-emerald-500 bg-emerald-50/40"
          : profile.status === "rejected"
            ? "border-gray-200 border-l-red-400 bg-red-50/40"
            : "border-gray-200 border-l-[#2e75b6] bg-white"
        }`}
    >
      <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
            <RoleIcon size={16} className="text-gray-500" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">{profile.fullName}</p>
            <p className="text-xs text-gray-400 capitalize">{profile.role}</p>
          </div>
        </div>
        <StatusBadge status={profile.status || "pending"} />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-500 mb-3">
        {profile.skillCategory && (
          <span className="flex items-center gap-1.5">
            <Wrench size={11} />
            {profile.skillCategory} — ₱{profile.declaredRate}/day
          </span>
        )}
        <span className="flex items-center gap-1.5 col-span-2">
          <CalendarDays size={11} />
          Submitted: {profile.submittedAt}
        </span>
        <div className="col-span-2 flex flex-wrap gap-1.5 mt-0.5">
          {profile.documents?.map((doc) => (
            <span
              key={doc}
              className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs"
            >
              <FileText size={10} />
              {doc}
            </span>
          ))}
        </div>
        {profile.status === "rejected" && profile.rejectReason && (
          <p className="col-span-2 text-red-600 bg-red-50 px-2 py-1 rounded text-xs mt-1">
            Reason: {profile.rejectReason}
          </p>
        )}
      </div>

      {!isResolved && !isRejectFormOpen && (
        <div className="flex justify-end gap-2">
          <button
            onClick={onReject}
            className="flex items-center gap-1.5 px-4 py-1.5 border border-red-300 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-50 transition-colors"
          >
            <XCircle size={14} />
            Reject
          </button>
          <button
            onClick={onApprove}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1d9e75] text-white text-xs font-semibold rounded-lg hover:bg-[#0f6e56] transition-colors"
          >
            <CheckCircle size={14} />
            Approve
          </button>
        </div>
      )}
    </article>
  );
}

export default AdminDashboard;
