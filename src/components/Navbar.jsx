function Navbar({ residentName }) {
  return (
    <header className="bg-[#1f4e79] text-white px-7 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold tracking-wide">Skill-Link CDO</span>
        <span className="text-xs opacity-70">Barangay Bulua</span>
      </div>
      <nav className="flex items-center gap-3">
        <span className="text-sm opacity-85">
          Logged in as: {residentName}
        </span>
        <span className="bg-[#2e75b6] text-white text-xs font-semibold px-3 py-1 rounded-full">
          Resident
        </span>
      </nav>
    </header>
  );
}

export default Navbar;
