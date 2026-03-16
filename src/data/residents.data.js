export const residentMetrics = [
  { label: "Requests Submitted", value: 3,  accentColor: "#2e75b6" },
  { label: "Jobs Completed",     value: 2,  accentColor: "#1d9e75" },
  { label: "Active Request",     value: 1,  accentColor: "#534ab7" },
  { label: "Verified Workers",   value: 48, accentColor: "#ba7517" },
];

export const currentResident = {
  name: "Maria Santos",
  address: "Purok 4, Brgy. Bulua, Cagayan de Oro City",
  verificationStatus: "verified",
};

export const residentRequestHistory = [
  {
    requestId: "req-h-001",
    category: "Electrician",
    description: "Fix faulty wiring in the living room circuit breaker.",
    budgetMin: 500,
    budgetMax: 1200,
    date: "2026-03-08",
    status: "completed",
    workerName: "Carlos Mendoza",
  },
  {
    requestId: "req-h-002",
    category: "Carpenter",
    description: "Repair broken wooden fence in the backyard.",
    budgetMin: 400,
    budgetMax: 900,
    date: "2026-02-20",
    status: "completed",
    workerName: "Jose Villanueva",
  },
];
