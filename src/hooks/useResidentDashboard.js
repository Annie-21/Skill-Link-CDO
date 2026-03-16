import { useState, useMemo } from "react";
import { matchedWorkers } from "../data/workers.data";
import { currentResident, residentRequestHistory } from "../data/residents.data";

export function useResidentDashboard() {
  const [activeTab, setActiveTab] = useState("request");

  // Form state
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription]           = useState("");
  const [budgetMin, setBudgetMin]               = useState("");
  const [budgetMax, setBudgetMax]               = useState("");
  const [location, setLocation]                 = useState(currentResident.address);
  const [preferredDate, setPreferredDate]       = useState("");
  const [formError, setFormError]               = useState("");

  // Matches state
  const [showMatches, setShowMatches]       = useState(false);
  const [offerSentTo, setOfferSentTo]       = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  // History search state
  const [historySearch, setHistorySearch] = useState("");

  const filteredWorkers = useMemo(() => {
    if (filterCategory === "All") return matchedWorkers;
    return matchedWorkers.filter((w) => w.skillCategory === filterCategory);
  }, [filterCategory]);

  const matchedCategories = [
    "All",
    ...new Set(matchedWorkers.map((w) => w.skillCategory)),
  ];

  const filteredHistory = useMemo(() => {
    if (!historySearch.trim()) return residentRequestHistory;
    const q = historySearch.toLowerCase();
    return residentRequestHistory.filter(
      (r) =>
        r.category.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.workerName.toLowerCase().includes(q)
    );
  }, [historySearch]);

  function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (Number(budgetMin) > Number(budgetMax)) {
      setFormError("Budget minimum cannot be greater than maximum.");
      return;
    }
    if (description.trim().length < 20) {
      setFormError("Work description must be at least 20 characters.");
      return;
    }

    setShowMatches(true);
    setFilterCategory("All");
    setOfferSentTo(null);
    setActiveTab("matches");
  }

  return {
    // Tab
    activeTab,        setActiveTab,
    // Form
    selectedCategory, setSelectedCategory,
    description,      setDescription,
    budgetMin,        setBudgetMin,
    budgetMax,        setBudgetMax,
    location,         setLocation,
    preferredDate,    setPreferredDate,
    formError,
    // Matches
    showMatches,
    offerSentTo,      setOfferSentTo,
    filterCategory,   setFilterCategory,
    filteredWorkers,
    matchedCategories,
    // History
    historySearch,    setHistorySearch,
    filteredHistory,
    // Handler
    handleSubmit,
  };
}
