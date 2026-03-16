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

export const systemMetrics = [
  { label: "Verified Workers",  value: 48,  accentColor: "#2e75b6" },
  { label: "Active Requests",   value: 12,  accentColor: "#1d9e75" },
  { label: "Completed Jobs",    value: 87,  accentColor: "#534ab7" },
  { label: "Skill Categories",  value: 5,   accentColor: "#ba7517" },
];
