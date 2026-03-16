function WorkerCard({ worker, onSendOffer }) {
  const stars =
    "★".repeat(Math.round(worker.avgRating)) +
    "☆".repeat(5 - Math.round(worker.avgRating));

  return (
    <article className="bg-white rounded-xl border border-gray-200 border-l-4 border-l-[#2e75b6] p-5 hover:shadow-md transition-shadow">

      {/* Card header */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-bold text-[#1f4e79]">
            {worker.fullName}
          </h3>
          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-0.5 rounded-full">
            {worker.skillCategory}
          </span>
        </div>
        <span className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-0.5 rounded-full">
          Verified
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 mb-4 max-sm:grid-cols-2">
        <div className="text-center">
          <span className="block text-xs text-gray-400 mb-0.5">Rate</span>
          <span className="text-sm font-semibold text-gray-700">
            ₱{worker.declaredRate}/day
          </span>
        </div>
        <div className="text-center">
          <span className="block text-xs text-gray-400 mb-0.5">Rating</span>
          <span className="text-sm font-semibold text-gray-700">
            {stars} {worker.avgRating}
          </span>
        </div>
        <div className="text-center">
          <span className="block text-xs text-gray-400 mb-0.5">Distance</span>
          <span className="text-sm font-semibold text-gray-700">
            {worker.distanceKm} km
          </span>
        </div>
        <div className="text-center">
          <span className="block text-xs text-gray-400 mb-0.5">Match Score</span>
          <span className="text-sm font-semibold text-emerald-600">
            {Math.round(worker.compositeScore * 100)}%
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-end">
        <button
          onClick={() => onSendOffer(worker)}
          className="px-6 py-2 bg-[#2e75b6] text-white text-sm font-bold rounded-lg hover:bg-[#1f4e79] transition-colors"
        >
          Send Job Offer
        </button>
      </footer>

    </article>
  );
}

export default WorkerCard;
