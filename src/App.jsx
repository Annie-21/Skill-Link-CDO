import Navbar from "./components/Navbar";
import JobRequestPage from "./pages/JobRequestPage";
import { currentResident } from "./data/sampleData";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar residentName={currentResident.name} />
      <JobRequestPage />
      <footer className="text-center py-6 text-xs text-gray-400">
        Skill-Link CDO — Barangay Bulua Pilot System © 2026
      </footer>
    </div>
  );
}

export default App;
