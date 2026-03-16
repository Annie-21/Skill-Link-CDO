export const sampleAccounts = [
  {
    email: "worker@skilllink.com",
    password: "worker123",
    role: "worker",
    name: "Juan dela Cruz",
  },
  {
    email: "resident@skilllink.com",
    password: "resident123",
    role: "resident",
    name: "Maria Santos",
  },
  {
    email: "admin@skilllink.com",
    password: "admin123",
    role: "admin",
    name: "Admin — Brgy. Bulua",
  },
];

// ── Resident data ─────────────────────────────────────────────────────────────
export const currentResident = {
  name: "Maria Santos",
  address: "Purok 4, Brgy. Bulua, Cagayan de Oro City",
  verificationStatus: "verified",
};

// ── Skill categories ──────────────────────────────────────────────────────────
export const skillCategories = [
  { id: 1, name: "Plumber" },
  { id: 2, name: "Electrician" },
  { id: 3, name: "Carpenter" },
  { id: 4, name: "Mason" },
  { id: 5, name: "Welder" },
];

// ── Matched workers (for resident job request) ────────────────────────────────
export const matchedWorkers = [
  {
    workerId: "w-001",
    fullName: "Juan dela Cruz",
    skillCategory: "Plumber",
    declaredRate: 800,
    avgRating: 4.8,
    distanceKm: 0.9,
    compositeScore: 0.92,
    verificationStatus: "verified",
    scoreBreakdown: {
      skillMatch: 0.95,
      proximity: 0.91,
      priceCompat: 0.88,
      rating: 0.96,
    },
  },
  {
    workerId: "w-002",
    fullName: "Pedro Reyes",
    skillCategory: "Plumber",
    declaredRate: 650,
    avgRating: 4.5,
    distanceKm: 1.4,
    compositeScore: 0.85,
    verificationStatus: "verified",
    scoreBreakdown: {
      skillMatch: 0.88,
      proximity: 0.82,
      priceCompat: 0.92,
      rating: 0.90,
    },
  },
  {
    workerId: "w-003",
    fullName: "Roberto Bautista",
    skillCategory: "Plumber",
    declaredRate: 900,
    avgRating: 4.2,
    distanceKm: 2.1,
    compositeScore: 0.78,
    verificationStatus: "verified",
    scoreBreakdown: {
      skillMatch: 0.82,
      proximity: 0.74,
      priceCompat: 0.76,
      rating: 0.84,
    },
  },
  {
    workerId: "w-004",
    fullName: "Carlos Mendoza",
    skillCategory: "Electrician",
    declaredRate: 950,
    avgRating: 4.6,
    distanceKm: 1.1,
    compositeScore: 0.89,
    verificationStatus: "verified",
    scoreBreakdown: {
      skillMatch: 0.93,
      proximity: 0.88,
      priceCompat: 0.82,
      rating: 0.92,
    },
  },
  {
    workerId: "w-005",
    fullName: "Jose Villanueva",
    skillCategory: "Carpenter",
    declaredRate: 700,
    avgRating: 4.3,
    distanceKm: 0.7,
    compositeScore: 0.87,
    verificationStatus: "verified",
    scoreBreakdown: {
      skillMatch: 0.90,
      proximity: 0.95,
      priceCompat: 0.85,
      rating: 0.86,
    },
  },
];

// ── System metrics (for MetricCard) ──────────────────────────────────────────
export const systemMetrics = [
  { label: "Verified Workers",  value: 48, accentColor: "#2e75b6" },
  { label: "Active Requests",   value: 12, accentColor: "#1d9e75" },
  { label: "Completed Jobs",    value: 87, accentColor: "#534ab7" },
  { label: "Skill Categories",  value: 5,  accentColor: "#ba7517" },
];

// ── Worker job offers (for worker dashboard) ──────────────────────────────────
export const initialJobOffers = [
  {
    offerId: "off-001",
    residentName: "Maria Santos",
    location: "Purok 4, Brgy. Bulua",
    description: "Fix leaking kitchen pipes and replace faucet in the bathroom.",
    budgetMin: 600,
    budgetMax: 1000,
    preferredDate: "2026-03-20",
    status: "pending_response",
  },
  {
    offerId: "off-002",
    residentName: "Elena Cruz",
    location: "Purok 7, Brgy. Bulua",
    description: "Install new water pipes for second floor bathroom renovation.",
    budgetMin: 800,
    budgetMax: 1500,
    preferredDate: "2026-03-22",
    status: "pending_response",
  },
];

export const workerJobHistory = [
  {
    offerId: "off-h-001",
    residentName: "Roberto Aquino",
    description: "Repair burst pipe under the kitchen sink.",
    date: "2026-03-10",
    rate: 800,
    status: "completed",
    rating: 5,
  },
  {
    offerId: "off-h-002",
    residentName: "Luisa Gomez",
    description: "Fix bathroom drainage issue.",
    date: "2026-03-05",
    rate: 700,
    status: "completed",
    rating: 4,
  },
  {
    offerId: "off-h-003",
    residentName: "Marco Dela Rosa",
    description: "Replace main water valve.",
    date: "2026-02-28",
    rate: 900,
    status: "completed",
    rating: 5,
  },
];

// ── Resident request history ──────────────────────────────────────────────────
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

// ── Admin pending verification queue ─────────────────────────────────────────
export const initialPendingProfiles = [
  {
    userId: "u-p-001",
    fullName: "Ricardo Santos",
    role: "worker",
    skillCategory: "Mason",
    declaredRate: 750,
    address: "Purok 2, Brgy. Bulua",
    contact: "09171234567",
    submittedAt: "2026-03-15",
    documents: ["Barangay Clearance", "TESDA NC II Certificate"],
  },
  {
    userId: "u-p-002",
    fullName: "Anna Reyes",
    role: "resident",
    address: "Purok 9, Brgy. Bulua",
    contact: "09281234567",
    submittedAt: "2026-03-14",
    documents: ["Valid ID"],
  },
  {
    userId: "u-p-003",
    fullName: "Dante Villaluz",
    role: "worker",
    skillCategory: "Welder",
    declaredRate: 850,
    address: "Purok 5, Brgy. Bulua",
    contact: "09351234567",
    submittedAt: "2026-03-13",
    documents: ["Barangay Clearance", "Welding Certification"],
  },
];

// ── Admin analytics data ──────────────────────────────────────────────────────
export const adminMetrics = [
  { label: "Total Workers",       value: 48, accentColor: "#2e75b6" },
  { label: "Total Residents",     value: 134, accentColor: "#1d9e75" },
  { label: "Jobs Completed",      value: 87, accentColor: "#534ab7" },
  { label: "Pending Verifications", value: 3, accentColor: "#ba7517" },
];

export const workersByCategory = [
  { category: "Plumber",      count: 14 },
  { category: "Electrician",  count: 11 },
  { category: "Carpenter",    count: 10 },
  { category: "Mason",        count: 8  },
  { category: "Welder",       count: 5  },
];
