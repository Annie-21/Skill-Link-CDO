export const adminMetrics = [
  { label: "Total Workers",         value: 48,  accentColor: "#2e75b6" },
  { label: "Total Residents",       value: 134, accentColor: "#1d9e75" },
  { label: "Jobs Completed",        value: 87,  accentColor: "#534ab7" },
  { label: "Pending Verifications", value: 3,   accentColor: "#ba7517" },
];

export const workersByCategory = [
  { category: "Plumber",     count: 14 },
  { category: "Electrician", count: 11 },
  { category: "Carpenter",   count: 10 },
  { category: "Mason",       count: 8  },
  { category: "Welder",      count: 5  },
];

export const jobStatusBreakdown = [
  { label: "Completed",     count: 87, color: "bg-emerald-100 text-emerald-800" },
  { label: "Active",        count: 12, color: "bg-blue-100 text-blue-800"     },
  { label: "Pending Match", count: 5,  color: "bg-amber-100 text-amber-800"   },
  { label: "Cancelled",     count: 9,  color: "bg-gray-100 text-gray-600"     },
];

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
