import Navbar      from "../components/Navbar";
import MetricCard  from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";
import WorkerCard  from "../components/WorkerCard";
import {
  PlusCircle, ClipboardList, UserCircle,
  MapPin, CalendarDays, Banknote, Search,
} from "lucide-react";
import { useResidentDashboard } from "../hooks/useResidentDashboard";
import { skillCategories }      from "../data/categories.data";
import { matchedWorkers }       from "../data/workers.data";
import { currentResident, residentMetrics } from "../data/residents.data";

const tabs = [
  { key: "request", label: "New Request", icon: PlusCircle    },
  { key: "matches", label: "Matches",     icon: Search        },
  { key: "history", label: "My Requests", icon: ClipboardList },
  { key: "profile", label: "Profile",     icon: UserCircle    },
];

function ResidentDashboard({ currentUser, onLogout }) {
  const {
    activeTab,        setActiveTab,
    selectedCategory, setSelectedCategory,
    description,      setDescription,
    budgetMin,        setBudgetMin,
    budgetMax,        setBudgetMax,
    location,         setLocation,
    preferredDate,    setPreferredDate,
    formError,
    showMatches,
    offerSentTo,      setOfferSentTo,
    filterCategory,   setFilterCategory,
    filteredWorkers,
    matchedCategories,
    historySearch,    setHistorySearch,
    filteredHistory,
    handleSubmit,
  } = useResidentDashboard();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar currentUser={currentUser} onLogout={onLogout} />

      <main className="max-w-4xl mx-auto px-4 py-7 flex flex-col gap-5">

        <div>
          <h1 className="text-xl font-bold text-[#1f4e79]">
            Welcome, {currentUser.name}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Find a verified skilled worker near you.
          </p>
        </div>

        <section className="flex flex-wrap gap-3" aria-label="Resident metrics">
          {residentMetrics.map((m) => (
            <MetricCard key={m.label} label={m.label} value={m.value} accentColor={m.accentColor} />
          ))}
        </section>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          {/* Tab bar */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon  = tab.icon;
              const badge = tab.key === "matches" && showMatches ? matchedWorkers.length : null;
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
                  <span className="hidden sm:inline">{tab.label}</span>
                  {badge != null && (
                    <span className="bg-[#1d9e75] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-6">

            {/* ── New Request Tab ─────────────────────────────────────── */}
            {activeTab === "request" && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="text-base font-bold text-[#1f4e79]">Submit a Job Request</h2>

                {formError && (
                  <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {formError}
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="category" className="text-sm font-semibold text-gray-700">Skill Category</label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    required
                    className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#2e75b6] focus:ring-2 focus:ring-blue-100 transition"
                  >
                    <option value="">-- Select a skill category --</option>
                    {skillCategories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="description" className="text-sm font-semibold text-gray-700">
                    Work Description
                    <span className="text-gray-400 font-normal ml-1">
                      ({description.length} / min. 20 chars)
                    </span>
                  </label>
                  <textarea
                    id="description"
                    placeholder="Describe the work you need done..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    required
                    className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 resize-none focus:outline-none focus:border-[#2e75b6] focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="budgetMin" className="text-sm font-semibold text-gray-700">Budget Min (₱)</label>
                    <input id="budgetMin" type="number" placeholder="e.g. 400" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} min={1} required className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#2e75b6] focus:ring-2 focus:ring-blue-100 transition" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="budgetMax" className="text-sm font-semibold text-gray-700">Budget Max (₱)</label>
                    <input id="budgetMax" type="number" placeholder="e.g. 1000" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} min={1} required className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#2e75b6] focus:ring-2 focus:ring-blue-100 transition" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="location" className="text-sm font-semibold text-gray-700">Job Location</label>
                    <div className="relative">
                      <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#2e75b6] focus:ring-2 focus:ring-blue-100 transition" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="preferredDate" className="text-sm font-semibold text-gray-700">Preferred Date</label>
                    <div className="relative">
                      <CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input id="preferredDate" type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} required className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#2e75b6] focus:ring-2 focus:ring-blue-100 transition" />
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full py-3 bg-[#1f4e79] text-white font-bold rounded-lg hover:bg-[#2e75b6] active:scale-[0.99] transition-all mt-1 flex items-center justify-center gap-2">
                  <Search size={17} />
                  Find Matched Workers
                </button>
              </form>
            )}

            {/* ── Matches Tab ─────────────────────────────────────────── */}
            {activeTab === "matches" && (
              <div>
                {!showMatches ? (
                  <div className="text-center py-10 text-gray-400">
                    <Search size={36} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Submit a job request to see matched workers.</p>
                    <button onClick={() => setActiveTab("request")} className="mt-3 text-xs text-[#2e75b6] font-semibold hover:underline">
                      Go to New Request
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-500 mb-4">
                      Showing <strong>{filteredWorkers.length}</strong> of {matchedWorkers.length} verified workers.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="text-xs font-semibold text-gray-400">Filter:</span>
                      {matchedCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFilterCategory(cat)}
                          className={`px-4 py-1 rounded-full text-sm border transition-all
                            ${filterCategory === cat
                              ? "bg-[#1f4e79] text-white border-[#1f4e79] font-semibold"
                              : "bg-white text-gray-600 border-gray-300 hover:border-[#2e75b6] hover:text-[#2e75b6]"
                            }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    {offerSentTo && (
                      <div className="bg-emerald-50 border border-emerald-400 text-emerald-800 px-4 py-3 rounded-lg text-sm mb-4">
                        Offer sent to <strong>{matchedWorkers.find((w) => w.workerId === offerSentTo)?.fullName}</strong>! Waiting for their response.
                      </div>
                    )}
                    {filteredWorkers.length === 0 ? (
                      <p className="text-center text-gray-400 py-8 text-sm">No workers found for the selected filter.</p>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {filteredWorkers.map((worker) => (
                          <WorkerCard
                            key={worker.workerId}
                            worker={worker}
                            onSendOffer={(w) => setOfferSentTo(w.workerId)}
                            offerSentTo={offerSentTo}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* ── History Tab ─────────────────────────────────────────── */}
            {activeTab === "history" && (
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by category, description, or worker..."
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#2e75b6] focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                {filteredHistory.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    <ClipboardList size={36} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No requests found.</p>
                  </div>
                ) : (
                  filteredHistory.map((req) => (
                    <article key={req.requestId} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <div>
                          <span className="text-xs font-semibold text-[#2e75b6] bg-blue-50 px-2.5 py-0.5 rounded-full">{req.category}</span>
                          <p className="text-sm font-medium text-gray-700 mt-1.5">{req.description}</p>
                        </div>
                        <StatusBadge status={req.status} />
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><CalendarDays size={12} />{req.date}</span>
                        <span className="flex items-center gap-1"><Banknote size={12} />₱{req.budgetMin} – ₱{req.budgetMax}</span>
                        {req.workerName && (
                          <span className="flex items-center gap-1"><UserCircle size={12} />{req.workerName}</span>
                        )}
                      </div>
                    </article>
                  ))
                )}
              </div>
            )}

            {/* ── Profile Tab ─────────────────────────────────────────── */}
            {activeTab === "profile" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center">
                    <UserCircle size={32} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{currentUser.name}</p>
                    <p className="text-sm text-gray-500">{currentUser.email}</p>
                    <div className="mt-1"><StatusBadge status="verified" /></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <ProfileField label="Full Name" value={currentResident.name}    />
                  <ProfileField label="Address"   value={currentResident.address} />
                  <ProfileField label="Status"    value="Verified Resident"       />
                  <ProfileField label="Barangay"  value="Bulua, Cagayan de Oro"   />
                </div>
              </div>
            )}

          </div>
        </div>

      </main>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="font-semibold text-gray-700 text-sm">{value}</p>
    </div>
  );
}

export default ResidentDashboard;
