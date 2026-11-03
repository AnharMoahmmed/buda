import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BudaLogo } from '../components/BudaLogo';
import {
  LayoutDashboard,
  IceCreamCone,
  ShoppingBag,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  Sun,
  Moon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', labelAr: 'لوحة التحكم', end: true },
  { to: '/admin/flavors', icon: IceCreamCone, label: 'Flavors', labelAr: 'النكهات' },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Orders', labelAr: 'الطلبات' },
  { to: '/admin/reviews', icon: MessageSquare, label: 'Reviews', labelAr: 'التقييمات' },
  { to: '/admin/settings', icon: Settings, label: 'Settings', labelAr: 'الإعدادات' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();

  const bgClass = darkMode ? 'bg-[#1A0E08]' : 'bg-[#FFF6EF]';
  const sidebarBg = darkMode ? 'bg-[#2A1810]' : 'bg-white';
  const cardBg = darkMode ? 'bg-[#2A1810]' : 'bg-white';
  const textPrimary = darkMode ? 'text-[#FAF2E6]' : 'text-[#3E1A10]';
  const textSecondary = darkMode ? 'text-[#C9A68A]' : 'text-[#8B6B5A]';
  const borderColor = darkMode ? 'border-[#3E2A1F]' : 'border-[#F0E0D0]';

  return (
    <div className={`min-h-screen ${bgClass} ${textPrimary} transition-colors duration-300 flex`}>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen w-64 ${sidebarBg} ${borderColor}
          border-r flex flex-col transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-xl lg:shadow-none
        `}
      >
        {/* Logo area */}
        <div className={`h-16 flex items-center justify-between px-5 border-b ${borderColor}`}>
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E58B68] to-[#D47450] flex items-center justify-center shadow-md">
              <IceCreamCone className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-tight">buda</span>
              <span className={`text-[10px] block -mt-1 ${textSecondary}`}>Admin Panel</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-[#F0E0D0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E58B68] to-[#D47450] text-white shadow-md shadow-[#E58B68]/20'
                    : `${textSecondary} hover:bg-[#F5E6D8] ${darkMode ? 'hover:bg-[#3E2A1F]' : ''}`
                }`
              }
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className={`px-3 py-4 border-t ${borderColor}`}>
          <div className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl ${darkMode ? 'bg-[#1A0E08]' : 'bg-[#FFF6EF]'}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E58B68] to-[#D47450] flex items-center justify-center text-white text-xs font-bold shadow">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Admin</p>
              <p className={`text-[11px] ${textSecondary} truncate`}>admin@buda.sa</p>
            </div>
            <ChevronDown className={`w-4 h-4 ${textSecondary}`} />
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top bar */}
        <header className={`h-16 ${sidebarBg} border-b ${borderColor} flex items-center gap-4 px-4 lg:px-6 sticky top-0 z-30`}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-[#F0E0D0] transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md relative hidden sm:block">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${textSecondary}`} />
            <input
              type="text"
              placeholder="Search orders, flavors..."
              className={`w-full pl-10 pr-4 py-2 rounded-xl ${darkMode ? 'bg-[#1A0E08] border-[#3E2A1F]' : 'bg-[#FFF6EF] border-[#F0E0D0]'} border text-sm ${textPrimary} placeholder:${textSecondary} focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40 transition-all`}
            />
          </div>

          <div className="flex-1 sm:hidden" />

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl ${darkMode ? 'hover:bg-[#3E2A1F]' : 'hover:bg-[#F0E0D0]'} transition-colors cursor-pointer`}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className={`p-2 rounded-xl ${darkMode ? 'hover:bg-[#3E2A1F]' : 'hover:bg-[#F0E0D0]'} transition-colors relative cursor-pointer`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    className={`absolute right-0 mt-2 w-72 ${cardBg} rounded-2xl shadow-2xl border ${borderColor} overflow-hidden z-50`}
                  >
                    <div className={`px-4 py-3 border-b ${borderColor}`}>
                      <p className="text-sm font-semibold">Notifications</p>
                    </div>
                    <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
                      {[
                        { title: 'New order received', desc: '2x Pistachio, 1x Chocolate', time: '3m ago', dot: 'bg-green-500' },
                        { title: 'Low stock alert', desc: 'Mango Sorbet — 5 units left', time: '1h ago', dot: 'bg-amber-500' },
                        { title: 'New review', desc: '⭐⭐⭐⭐⭐ "Best pistachio ever!"', time: '2h ago', dot: 'bg-blue-500' },
                      ].map((n, i) => (
                        <div key={i} className={`flex items-start gap-3 p-2.5 rounded-xl ${darkMode ? 'hover:bg-[#3E2A1F]' : 'hover:bg-[#FFF6EF]'} transition-colors cursor-pointer`}>
                          <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                          <div>
                            <p className="text-sm font-medium">{n.title}</p>
                            <p className={`text-xs ${textSecondary}`}>{n.desc}</p>
                            <p className={`text-[11px] ${textSecondary} mt-0.5`}>{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View site link */}
            <Link
              to="/"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border ${borderColor} ${textSecondary} hover:border-[#E58B68] hover:text-[#E58B68] transition-colors`}
            >
              View Site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet context={{ darkMode, cardBg, textPrimary, textSecondary, borderColor, bgClass }} />
        </main>
      </div>
    </div>
  );
}
