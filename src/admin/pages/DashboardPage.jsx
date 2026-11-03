import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  DollarSign,
  IceCreamCone,
  Users,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Calendar,
  Eye,
  ArrowLeft,
  Home,
} from 'lucide-react';

const statCards = [
  {
    title: 'Total Revenue',
    value: 'SAR 24,580',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-emerald-500 to-emerald-600',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
  {
    title: 'Total Orders',
    value: '1,248',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingBag,
    color: 'from-[#E58B68] to-[#D47450]',
    bgLight: 'bg-orange-50',
    textColor: 'text-[#E58B68]',
  },
  {
    title: 'Flavors Active',
    value: '6',
    change: '+2 new',
    trend: 'up',
    icon: IceCreamCone,
    color: 'from-purple-500 to-purple-600',
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    title: 'Avg. Rating',
    value: '4.9',
    change: '+0.1',
    trend: 'up',
    icon: Star,
    color: 'from-amber-500 to-amber-600',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
];

const recentOrders = [
  { id: '#ORD-2847', customer: 'Ahmed K.', items: '2x Pistachio, 1x Chocolate', total: 'SAR 58', status: 'Preparing', statusColor: 'bg-amber-100 text-amber-700', time: '3 min ago' },
  { id: '#ORD-2846', customer: 'Sara M.', items: '1x Strawberry Pint', total: 'SAR 48', status: 'Delivered', statusColor: 'bg-green-100 text-green-700', time: '15 min ago' },
  { id: '#ORD-2845', customer: 'Omar H.', items: '3x Mango Sorbet', total: 'SAR 48', status: 'Delivered', statusColor: 'bg-green-100 text-green-700', time: '32 min ago' },
  { id: '#ORD-2844', customer: 'Nora A.', items: '2x Vanilla, 2x Caramel', total: 'SAR 96', status: 'Pending', statusColor: 'bg-blue-100 text-blue-700', time: '45 min ago' },
  { id: '#ORD-2843', customer: 'Fahad T.', items: '1x Chocolate Pint', total: 'SAR 48', status: 'Cancelled', statusColor: 'bg-red-100 text-red-700', time: '1h ago' },
];

const topFlavors = [
  { name: 'Bronte Pistachio', sales: 489, pct: 100, color: 'bg-[#85AA73]' },
  { name: 'Belgian Chocolate', sales: 342, pct: 70, color: 'bg-[#E08A63]' },
  { name: 'Madagascar Vanilla', sales: 310, pct: 63, color: 'bg-[#DEB872]' },
  { name: 'Fresh Strawberry', sales: 298, pct: 61, color: 'bg-[#E27383]' },
  { name: 'Salted Caramel', sales: 260, pct: 53, color: 'bg-[#DE9546]' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function DashboardPage() {
  const { darkMode, cardBg, textPrimary, textSecondary, borderColor } = useOutletContext();
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Page header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Dashboard</h1>
          <p className={`text-sm ${textSecondary} mt-0.5`}>Welcome back! Here's what's happening with buda today.</p>
        </div>

        {/* Action Buttons: Back to Home + Time Range Selector */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Back to Home Button */}
          <Link
            to="/"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold ${cardBg} border ${borderColor} hover:border-[#E58B68] hover:text-[#E58B68] shadow-xs transition-all duration-200 cursor-pointer`}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#E58B68]" />
            <Home className="w-3.5 h-3.5" />
            <span>Go to Website</span>
          </Link>

          {/* Time Range Filter */}
          <div className={`flex items-center gap-1.5 ${cardBg} rounded-xl border ${borderColor} p-1`}>
            {[
              { key: '24h', label: '24h' },
              { key: '7d', label: '7 days' },
              { key: '30d', label: '30 days' },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTimeRange(t.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  timeRange === t.key
                    ? 'bg-gradient-to-r from-[#E58B68] to-[#D47450] text-white shadow-sm'
                    : `${textSecondary} hover:bg-[#F5E6D8] ${darkMode ? 'hover:bg-[#3E2A1F]' : ''}`
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.title}
            variants={item}
            className={`${cardBg} rounded-2xl border ${borderColor} p-5 hover:shadow-lg transition-shadow group`}
          >
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-xl ${stat.bgLight} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.change}
              </div>
            </div>
            <div className="mt-3">
              <p className={`text-xs ${textSecondary} font-medium`}>{stat.title}</p>
              <p className="text-2xl font-bold mt-0.5">{stat.value}</p>
            </div>
            {/* Mini chart placeholder */}
            <div className="mt-3 flex items-end gap-[3px] h-8">
              {[40, 55, 35, 65, 45, 70, 60, 80, 50, 75, 85, 90].map((h, j) => (
                <div
                  key={j}
                  className={`flex-1 rounded-sm bg-gradient-to-t ${stat.color} opacity-30 group-hover:opacity-60 transition-opacity`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts + Top Flavors row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue chart placeholder */}
        <motion.div variants={item} className={`lg:col-span-2 ${cardBg} rounded-2xl border ${borderColor} p-5`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Revenue Overview</h3>
              <p className={`text-xs ${textSecondary} mt-0.5`}>Daily revenue for the last {timeRange === '24h' ? '24 hours' : timeRange === '7d' ? '7 days' : '30 days'}</p>
            </div>
            <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-[#3E2A1F]' : 'hover:bg-[#F0E0D0]'} transition-colors cursor-pointer`}>
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          {/* Chart placeholder - visual bar chart */}
          <div className="flex items-end gap-2 h-48 mt-6">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const heights = [60, 72, 45, 85, 68, 95, 78];
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex justify-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heights[i]}%` }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                      className="w-full max-w-[36px] rounded-t-lg bg-gradient-to-t from-[#E58B68] to-[#E8A88A] hover:from-[#D47450] hover:to-[#E58B68] transition-colors cursor-pointer"
                    />
                  </div>
                  <span className={`text-[11px] ${textSecondary}`}>{day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Top Flavors */}
        <motion.div variants={item} className={`${cardBg} rounded-2xl border ${borderColor} p-5`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Top Flavors</h3>
            <span className={`text-xs ${textSecondary}`}>by orders</span>
          </div>
          <div className="space-y-4">
            {topFlavors.map((flavor, i) => (
              <div key={flavor.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{flavor.name}</span>
                  <span className={`text-xs ${textSecondary}`}>{flavor.sales}</span>
                </div>
                <div className={`h-2 rounded-full ${darkMode ? 'bg-[#1A0E08]' : 'bg-[#F5E6D8]'} overflow-hidden`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${flavor.pct}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                    className={`h-full rounded-full ${flavor.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders table */}
      <motion.div variants={item} className={`${cardBg} rounded-2xl border ${borderColor} overflow-hidden`}>
        <div className="flex items-center justify-between p-5 pb-3">
          <div>
            <h3 className="font-semibold">Recent Orders</h3>
            <p className={`text-xs ${textSecondary} mt-0.5`}>Latest WhatsApp orders</p>
          </div>
          <Link to="/admin/orders" className="text-xs font-medium text-[#E58B68] hover:text-[#D47450] transition-colors cursor-pointer">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-t border-b ${borderColor}`}>
                {['Order', 'Customer', 'Items', 'Total', 'Status', 'Time'].map((h) => (
                  <th key={h} className={`text-left text-xs font-medium ${textSecondary} px-5 py-3`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className={`border-b ${borderColor} last:border-b-0 hover:${darkMode ? 'bg-[#1A0E08]' : 'bg-[#FFF6EF]'} transition-colors cursor-pointer`}>
                  <td className="px-5 py-3.5 text-sm font-semibold">{order.id}</td>
                  <td className="px-5 py-3.5 text-sm">{order.customer}</td>
                  <td className={`px-5 py-3.5 text-sm ${textSecondary} max-w-[200px] truncate`}>{order.items}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold">{order.total}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className={`px-5 py-3.5 text-xs ${textSecondary}`}>{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}