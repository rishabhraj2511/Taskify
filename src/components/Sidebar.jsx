import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutGrid,
  CheckSquare,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  Zap,
  Menu,
  X,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: LayoutGrid, label: "Dashboard", path: "/" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    { icon: Users, label: "Team", path: "/team" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 transition-all duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Taskify</h1>
              <p className="text-xs text-slate-400">AI Productivity</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-8 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive(item.path)
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
              {isActive(item.path) && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* Stats Section */}
        <div className="px-4 py-6 space-y-4 border-t border-slate-800">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Your Stats
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-400">
              <span>Completion Rate</span>
              <span className="text-purple-400 font-bold">78%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-gradient-to-r from-purple-500 to-blue-600 rounded-full"></div>
            </div>

            <div className="flex justify-between items-center text-slate-400 pt-3">
              <span>Current Streak</span>
              <span className="text-yellow-400 font-bold">15 🔥</span>
            </div>

            <div className="flex justify-between items-center text-slate-400 pt-3">
              <span>Tasks Today</span>
              <span className="text-blue-400 font-bold">8/12</span>
            </div>
          </div>
        </div>

        {/* Settings & Logout */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-4 border-t border-slate-800 bg-slate-950 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
            <Settings size={20} />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
