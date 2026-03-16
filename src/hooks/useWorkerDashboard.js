import { useState } from "react";
import { initialJobOffers } from "../data/workers.data";

export function useWorkerDashboard() {
  const [activeTab, setActiveTab]         = useState("offers");
  const [offers, setOffers]               = useState(initialJobOffers);
  const [expandedOffer, setExpandedOffer] = useState(null);

  function handleAccept(offerId) {
    setOffers((prev) =>
      prev.map((o) =>
        o.offerId === offerId ? { ...o, status: "offer_accepted" } : o
      )
    );
  }

  function handleDecline(offerId) {
    setOffers((prev) =>
      prev.map((o) =>
        o.offerId === offerId ? { ...o, status: "offer_declined" } : o
      )
    );
  }

  function toggleExpandedOffer(offerId) {
    setExpandedOffer((prev) => (prev === offerId ? null : offerId));
  }

  const pendingOffers   = offers.filter((o) => o.status === "pending_response");
  const respondedOffers = offers.filter((o) => o.status !== "pending_response");

  return {
    activeTab,      setActiveTab,
    expandedOffer,
    pendingOffers,
    respondedOffers,
    handleAccept,
    handleDecline,
    toggleExpandedOffer,
  };
}
