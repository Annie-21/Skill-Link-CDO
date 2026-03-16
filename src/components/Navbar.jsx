import { LogOut, Wrench, User, Shield, Home } from "lucide-react";

const ROLE_CONFIG = {
  worker:   { label: "Skilled Worker", color: "bg-[#2e75b6]",  icon: User   },
  resident: { label: "Resident",       color: "bg-[#1d9e75]",  icon: Home   },
  admin:    { label: "Barangay Admin", color: "bg-[#534ab7]",  icon: Shield },
};

function Navbar({ currentUser, onLogout }) {
  const config  = ROLE_CONFIG[currentUser?.role] || ROLE_CONFIG.resident;
  const RoleIcon = config.icon;

  return (
    <header className="bg-[#1f4e79] text-white px-6 py-3.5 flex justify-between items-center shadow-md sticky top-0 z-50">

      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="bg-white/10 p-1.5 rounded-lg">
          <Wrench size={18} className="text-white" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold tracking-wide">
            Skill-Link CDO
          </span>
          <span className="text-xs opacity-60 hidden sm:inline">
            Barangay Bulua
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">

        {/* User info */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${config.color}`}>
            <RoleIcon size={12} />
            <span className="hidden sm:inline">{config.label}</span>
          </div>
          <span className="text-sm opacity-90 hidden sm:inline">
            {currentUser?.name}
          </span>
        </div>

        {/* Logout button */}
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
          aria-label="Log out"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>

      </div>
    </header>
  );
}

export default Navbar;
