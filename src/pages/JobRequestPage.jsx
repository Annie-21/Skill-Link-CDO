import { useState, useMemo } from "react";
import WorkerCard from "../components/WorkerCard";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";
import {
  currentResident,
  skillCategories,
  matchedWorkers,
  systemMetrics,
} from "../data/sampleData";

function JobRequestPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription]           = useState("");
  const [budgetMin, setBudgetMin]               = useState("");
  const [budgetMax, setBudgetMax]               = useState("");
  const [showMatches, setShowMatches]           = useState(false);
  const [offerSentTo, setOfferSentTo]           = useState(null);
  const [filterCategory, setFilterCategory]     = useState("All");

  // Interaction: filter matched workers by skill category
  const filteredWorkers = useMemo(() => {
    if (filterCategory === "All") return matchedWorkers;
    return matchedWorkers.filter((w) => w.skillCategory === filterCategory);
  }, [filterCategory]);

  // Unique categories from the matched list for filter buttons
  const matchedCategories = [
    "All",
    ...new Set(matchedWorkers.map((w) => w.skillCategory)),
  ];

  function handleSubmit(e) {
    e.preventDefault();
    setShowMatches(true);
    setFilterCategory("All");
    setOfferSentTo(null);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-7 flex flex-col gap-5">

      {/* Metrics row — MetricCard component with props */}
      <section className="flex flex-wrap gap-3" aria-label="System metrics">
        {systemMetrics.map((m) => (
          <MetricCard
            key={m.label}
            label={m.label}
            value={m.value}
            accentColor={m.accentColor}
          />
        ))}
      </section>

      {/* Resident info banner — StatusBadge component with props */}
      <section
        className="bg-white rounded-xl px-5 py-4 flex flex-wrap justify-between items-center gap-3 shadow-sm border-l-4 border-l-emerald-500"
        aria-label="Resident info"
      >
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-sm">
            Hello, <strong>{currentResident.name}</strong>
          </span>
          <span className="text-xs text-gray-500">
            {currentResident.address}
          </span>
        </div>
        <StatusBadge status={currentResident.verificationStatus} />
      </section>

      {/* Job Request Form */}
      <section
        className="bg-white rounded-2xl p-7 shadow-md"
        aria-label="Submit job request"
      >
        <h2 className="text-xl font-bold text-[#1f4e79] mb-5">
          Request a Skilled Worker
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="category"
              className="text-sm font-semibold text-gray-700"
            >
              Skill Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#2e75b6] focus:ring-2 focus:ring-blue-100 transition"
            >
              <option value="">-- Select a skill category --</option>
              {skillCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-gray-700"
            >
              Work Description
            </label>
            <textarea
              id="description"
              placeholder="Describe the work you need done (min. 20 characters)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              minLength={20}
              required
              className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 resize-none focus:outline-none focus:border-[#2e75b6] focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="budgetMin"
                className="text-sm font-semibold text-gray-700"
              >
                Budget Min (₱)
              </label>
              <input
                id="budgetMin"
                type="number"
                placeholder="e.g. 400"
                value={budgetMin}
                onChange={(e) => setBudgetMin(e.target.value)}
                min={1}
                required
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#2e75b6] focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="budgetMax"
                className="text-sm font-semibold text-gray-700"
              >
                Budget Max (₱)
              </label>
              <input
                id="budgetMax"
                type="number"
                placeholder="e.g. 1000"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
                min={1}
                required
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#2e75b6] focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="location"
              className="text-sm font-semibold text-gray-700"
            >
              Job Location
            </label>
            <input
              id="location"
              type="text"
              defaultValue={currentResident.address}
              required
              className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#2e75b6] focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1f4e79] text-white font-bold rounded-lg hover:bg-[#2e75b6] active:scale-[0.99] transition-all mt-1"
          >
            Find Matched Workers
          </button>

        </form>
      </section>

      {/* Matched Workers Section */}
      {showMatches && (
        <section
          className="bg-white rounded-2xl p-7 shadow-md"
          aria-label="Matched workers"
        >

          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#1f4e79]">
              ML-Matched Workers
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Showing <strong>{filteredWorkers.length}</strong> of{" "}
              {matchedWorkers.length} verified workers — ranked by skill,
              proximity, price, and rating.
            </p>
          </div>

          {/* Interaction: category filter buttons */}
          <div
            className="flex flex-wrap items-center gap-2 mb-4"
            role="group"
            aria-label="Filter by category"
          >
            <span className="text-xs font-semibold text-gray-400">
              Filter:
            </span>
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

          {/* Offer confirmation alert */}
          {offerSentTo && (
            <div
              className="bg-emerald-50 border border-emerald-400 text-emerald-800 px-4 py-3 rounded-lg text-sm mb-4"
              role="alert"
            >
              ✓ Job offer sent to{" "}
              <strong>
                {matchedWorkers.find((w) => w.workerId === offerSentTo)?.fullName}
              </strong>
              ! Waiting for their response.
            </div>
          )}

          {/* Empty state */}
          {filteredWorkers.length === 0 ? (
            <p className="text-center text-gray-400 py-8 text-sm">
              No workers found for the selected category filter.
            </p>
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

        </section>
      )}

    </main>
  );
}

export default JobRequestPage;
