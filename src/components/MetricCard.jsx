function MetricCard({ label, value, accentColor }) {
  return (
    <article
      className="bg-white rounded-xl p-5 text-center flex-1 min-w-[120px] shadow-sm border-t-4"
      style={{ borderTopColor: accentColor || "#2e75b6" }}
    >
      <span className="block text-3xl font-bold text-[#1f4e79] leading-tight">
        {value}
      </span>
      <span className="block text-xs text-gray-500 mt-1">{label}</span>
    </article>
  );
}

export default MetricCard;
