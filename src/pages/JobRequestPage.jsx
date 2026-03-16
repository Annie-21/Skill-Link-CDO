import { useState } from "react";
import WorkerCard from "../components/WorkerCard";
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
  const [sentOffer, setSentOffer]               = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setShowMatches(true);
  }

  function handleSendOffer(worker) {
    setSentOffer(worker.fullName);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-7 flex flex-col gap-5">

      {/* System metrics banner */}
      <section
        className="flex flex-wrap gap-3"
        aria-label="System metrics"
      >
        <article className="bg-white rounded-xl p-5 text-center flex-1 min-w-[120px] shadow-sm border-t-4 border-t-[#2e75b6]">
          <span className="block text-3xl font-bold text-[#1f4e79] leading-tight">
            {systemMetrics.totalWorkers}
          </span>
          <span className="block text-xs text-gray-500 mt-1">
            Verified Workers
          </span>
        </article>
        <article className="bg-white rounded-xl p-5 text-center flex-1 min-w-[120px] shadow-sm border-t-4 border-t-[#1d9e75]">
          <span className="block text-3xl font-bold text-[#1f4e79] leading-tight">
            {systemMetrics.activeRequests}
          </span>
          <span className="block text-xs text-gray-500 mt-1">
            Active Requests
          </span>
        </article>
        <article className="bg-white rounded-xl p-5 text-center flex-1 min-w-[120px] shadow-sm border-t-4 border-t-[#534ab7]">
          <span className="block text-3xl font-bold text-[#1f4e79] leading-tight">
            {systemMetrics.completedJobs}
          </span>
          <span className="block text-xs text-gray-500 mt-1">
            Completed Jobs
          </span>
        </article>
        <article className="bg-white rounded-xl p-5 text-center flex-1 min-w-[120px] shadow-sm border-t-4 border-t-[#ba7517]">
          <span className="block text-3xl font-bold text-[#1f4e79] leading-tight">
            {systemMetrics.totalResidents}
          </span>
          <span className="block text-xs text-gray-500 mt-1">
            Registered Residents
          </span>
        </article>
      </section>

      {/* Job request form */}
      <section
        className="bg-white rounded-2xl p-7 shadow-md"
        aria-label="Submit job request"
      >
        <h2 className="text-xl font-bold text-[#1f4e79] mb-2">
          Request a Skilled Worker
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Hello,{" "}
          <strong className="text-gray-700">{currentResident.name}</strong>!
          Fill in the details below to find a verified worker near you.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Skill Category — rendered from skillCategories array */}
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

      {/* Matched workers list — rendered from matchedWorkers array */}
      {showMatches && (
        <section
          className="bg-white rounded-2xl p-7 shadow-md"
          aria-label="Matched workers"
        >
          <h2 className="text-xl font-bold text-[#1f4e79] mb-1">
            ML-Matched Workers
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Showing{" "}
            <strong>{matchedWorkers.length}</strong> verified workers ranked
            by skill match, proximity, price compatibility, and rating.
          </p>

          {sentOffer && (
            <div
              className="bg-emerald-50 border border-emerald-400 text-emerald-800 px-4 py-3 rounded-lg text-sm mb-4"
              role="alert"
            >
              ✓ Job offer sent to <strong>{sentOffer}</strong>! Waiting for
              their response.
            </div>
          )}

          <div className="flex flex-col gap-4">
            {matchedWorkers.map((worker) => (
              <WorkerCard
                key={worker.workerId}
                worker={worker}
                onSendOffer={handleSendOffer}
              />
            ))}
          </div>

        </section>
      )}

    </main>
  );
}

export default JobRequestPage;
