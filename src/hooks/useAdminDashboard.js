import { useState, useMemo } from "react";
import { initialPendingProfiles } from "../data/admin.data";

export function useAdminDashboard() {
  const [activeTab, setActiveTab]     = useState("queue");
  const [profiles, setProfiles]       = useState(initialPendingProfiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter]   = useState("all");

  // Reject form state
  const [rejectingId, setRejectingId]   = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError]   = useState("");

  function handleApprove(userId) {
    setProfiles((prev) =>
      prev.map((p) =>
        p.userId === userId ? { ...p, status: "verified" } : p
      )
    );
  }

  function openRejectForm(userId) {
    setRejectingId(userId);
    setRejectReason("");
    setRejectError("");
  }

  function closeRejectForm() {
    setRejectingId(null);
    setRejectReason("");
    setRejectError("");
  }

  function handleRejectSubmit(e) {
    e.preventDefault();
    if (!rejectReason.trim()) {
      setRejectError("Please provide a reason for rejection.");
      return;
    }
    setProfiles((prev) =>
      prev.map((p) =>
        p.userId === rejectingId
          ? { ...p, status: "rejected", rejectReason }
          : p
      )
    );
    closeRejectForm();
  }

  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole =
        roleFilter === "all" || p.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [profiles, searchQuery, roleFilter]);

  const pendingCount = profiles.filter((p) => !p.status).length;

  return {
    // Tab
    activeTab,       setActiveTab,
    // Queue
    searchQuery,     setSearchQuery,
    roleFilter,      setRoleFilter,
    filteredProfiles,
    pendingCount,
    // Actions
    handleApprove,
    openRejectForm,
    closeRejectForm,
    // Reject form
    rejectingId,
    rejectReason,    setRejectReason,
    rejectError,
    handleRejectSubmit,
  };
}
