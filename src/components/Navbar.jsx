import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Bell,
  Search,
  User,
  X,
  AlertCircle,
  Star,
} from "lucide-react";
import { notifications as initialNotifications } from "../data/dummyData";

function Navbar() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const pageTitle = {
    "/": "Dashboard",
    "/tasks": "Tasks",
    "/team": "Team",
    "/analytics": "Analytics",
  };

  const currentTitle = pageTitle[location.pathname] || "Dashboard";

  const notificationIcons = {
    deadline: AlertCircle,
    team: User,
    achievement: Star,
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <nav className="sticky top-0 z-30 md:ml-64 bg-gradient-to-r from-slate-900 to-slate-950 border-b border-slate-800 backdrop-blur-md bg-opacity-80">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Title */}
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">{currentTitle}</h2>
          <span className="text-xs px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 rounded-full border border-purple-500/30">
            Today
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Search Bar - Desktop Only */}
          <div className="hidden md:flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-700 transition-colors w-64">
            <Search size={16} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="bg-transparent text-sm text-slate-300 placeholder-slate-500 outline-none w-full"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-slate-200"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl overflow-hidden z-50">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
                  <h3 className="font-semibold text-slate-100">Notifications</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-slate-200"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => {
                      const Icon = notificationIcons[notif.type];
                      return (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 border-b border-slate-800 hover:bg-slate-800/50 cursor-pointer transition-colors ${
                            !notif.read ? "bg-purple-500/5" : ""
                          }`}
                          onClick={() => markAsRead(notif.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-slate-800 rounded-lg mt-0.5">
                              <Icon
                                size={16}
                                className={
                                  notif.type === "achievement"
                                    ? "text-yellow-400"
                                    : notif.type === "deadline"
                                    ? "text-red-400"
                                    : "text-blue-400"
                                }
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-100 text-sm">
                                {notif.title}
                              </h4>
                              <p className="text-xs text-slate-400 mt-1">
                                {notif.message}
                              </p>
                              <span className="text-xs text-slate-500 mt-1 inline-block">
                                {notif.timestamp}
                              </span>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center text-slate-400">
                      No notifications
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-slate-800 bg-slate-950 text-center">
                  <button className="text-xs font-semibold text-purple-400 hover:text-purple-300">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <button className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              SC
            </div>
            <span className="hidden sm:inline text-sm text-slate-300 font-medium">
              Sarah
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
