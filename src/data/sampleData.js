export const currentResident = {
  name: "Maria Santos",
  address: "Purok 4, Brgy. Bulua, Cagayan de Oro City",
  verificationStatus: "verified",
};

export const skillCategories = [
  { id: 1, name: "Plumber" },
  { id: 2, name: "Electrician" },
  { id: 3, name: "Carpenter" },
  { id: 4, name: "Mason" },
  { id: 5, name: "Welder" },
];

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
  },
];

export const systemMetrics = {
  totalWorkers: 48,
  totalResidents: 134,
  activeRequests: 12,
  completedJobs: 87,
};
