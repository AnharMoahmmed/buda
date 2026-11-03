import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  ChevronDown,
  Check,
  X,
  Clock,
  Phone,
  ExternalLink,
  Download,
  MoreHorizontal,
} from 'lucide-react';

const sampleOrders = [
  {
    id: 'ORD-2847',
    customer: 'Ahmed Al-Khalidi',
    phone: '+966 5X XXX XXXX',
    items: [
      { name: 'Bronte Pistachio (Double)', qty: 2, price: 52 },
      { name: 'Belgian Chocolate (Single)', qty: 1, price: 16 },
    ],
    total: 120,
    status: 'preparing',
    via: 'whatsapp',
    date: '2026-11-03',
    time: '21:45',
    notes: 'Extra pistachio toppings please',
  },
  {
    id: 'ORD-2846',
    customer: 'Sara Mohammed',
    phone: '+966 5X XXX XXXX',
    items: [
      { name: 'Fresh Strawberry (Pint)', qty: 1, price: 48 },
    ],
    total: 48,
    status: 'delivered',
    via: 'whatsapp',
    date: '2026-11-03',
    time: '21:30',
    notes: '',
  },
  {
    id: 'ORD-2845',
    customer: 'Omar Hamdan',
    phone: '+966 5X XXX XXXX',
    items: [
      { name: 'Mango Sorbet (Single)', qty: 3, price: 48 },
    ],
    total: 48,
    status: 'delivered',
    via: 'whatsapp',
    date: '2026-11-03',
    time: '21:13',
    notes: '',
  },
  {
    id: 'ORD-2844',
    customer: 'Nora Al-Awad',
    phone: '+966 5X XXX XXXX',
    items: [
      { name: 'Madagascar Vanilla (Double)', qty: 2, price: 48 },
      { name: 'Salted Caramel (Double)', qty: 2, price: 52 },
    ],
    total: 100,
    status: 'pending',
    via: 'whatsapp',
    date: '2026-11-03',
    time: '21:00',
    notes: 'Deliver to gate 3',
  },
  {
    id: 'ORD-2843',
    customer: 'Fahad Al-Turki',
    phone: '+966 5X XXX XXXX',
    items: [
      { name: 'Belgian Chocolate (Pint)', qty: 1, price: 48 },
    ],
    total: 48,
    status: 'cancelled',
    via: 'whatsapp',
    date: '2026-11-03',
    time: '20:15',
    notes: 'Changed mind',
  },
  {
    id: 'ORD-2842',
    customer: 'Layla Saleh',
    phone: '+966 5X XXX XXXX',
    items: [
      { name: 'Bronte Pistachio (Pint)', qty: 2, price: 104 },
      { name: 'Belgian Chocolate (Pint)', qty: 1, price: 48 },
      { name: 'Fresh Strawberry (Double)', qty: 3, price: 72 },
    ],
    total: 224,
    status: 'preparing',
    via: 'whatsapp',
    date: '2026-11-03',
    time: '19:50',
    notes: 'Party order — need by 10 PM',
  },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  preparing: { label: 'Preparing', color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function OrdersPage() {
  const { darkMode, cardBg, textPrimary, textSecondary, borderColor } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const statuses = ['all', 'pending', 'preparing', 'delivered', 'cancelled'];

  const filteredOrders = sampleOrders.filter((o) => {
    const matchSearch = o.customer.toLowerCase().includes(searchQuery.toLowerCase()) || o.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Summary stats
  const counts = {
    total: sampleOrders.length,
    pending: sampleOrders.filter((o) => o.status === 'pending').length,
    preparing: sampleOrders.filter((o) => o.status === 'preparing').length,
    delivered: sampleOrders.filter((o) => o.status === 'delivered').length,
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Page Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Orders</h1>
          <p className={`text-sm ${textSecondary} mt-0.5`}>Track and manage WhatsApp orders</p>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${borderColor} text-sm font-medium ${textSecondary} hover:border-[#E58B68] hover:text-[#E58B68] transition-colors cursor-pointer`}>
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Orders', value: counts.total, color: 'from-[#E58B68] to-[#D47450]' },
          { label: 'Pending', value: counts.pending, color: 'from-blue-500 to-blue-600' },
          { label: 'Preparing', value: counts.preparing, color: 'from-amber-500 to-amber-600' },
          { label: 'Delivered', value: counts.delivered, color: 'from-green-500 to-green-600' },
        ].map((s) => (
          <motion.div
            key={s.label}
            variants={item}
            className={`${cardBg} rounded-xl border ${borderColor} p-4`}
          >
            <p className={`text-xs ${textSecondary} font-medium`}>{s.label}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-bold">{s.value}</span>
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${s.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div variants={item} className={`${cardBg} rounded-2xl border ${borderColor} p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3`}>
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${textSecondary}`} />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-xl ${darkMode ? 'bg-[#1A0E08] border-[#3E2A1F]' : 'bg-[#FFF6EF] border-[#F0E0D0]'} border text-sm focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40 transition-all`}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                filterStatus === s
                  ? 'bg-[#E58B68] text-white shadow-sm'
                  : `${darkMode ? 'bg-[#1A0E08] hover:bg-[#3E2A1F]' : 'bg-[#FFF6EF] hover:bg-[#F5E6D8]'} ${textSecondary}`
              }`}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Orders list */}
      <div className="space-y-3">
        {filteredOrders.map((order) => {
          const config = statusConfig[order.status];
          const isExpanded = expandedOrder === order.id;

          return (
            <motion.div
              key={order.id}
              variants={item}
              className={`${cardBg} rounded-2xl border ${borderColor} overflow-hidden hover:shadow-md transition-shadow`}
            >
              {/* Order header row */}
              <button
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                className="w-full flex items-center gap-4 p-4 sm:p-5 text-left cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl ${config.color} flex items-center justify-center shrink-0`}>
                  <div className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold">#{order.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.color}`}>{config.label}</span>
                  </div>
                  <p className={`text-sm ${textSecondary} mt-0.5 truncate`}>{order.customer}</p>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-bold">SAR {order.total}</p>
                  <p className={`text-xs ${textSecondary}`}>{order.time}</p>
                </div>
                <ChevronDown className={`w-4 h-4 ${textSecondary} transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className={`border-t ${borderColor}`}
                >
                  <div className="p-4 sm:p-5 space-y-4">
                    {/* Items */}
                    <div>
                      <p className={`text-xs font-medium ${textSecondary} mb-2`}>Order Items</p>
                      <div className="space-y-2">
                        {order.items.map((itm, i) => (
                          <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-[#1A0E08]' : 'bg-[#FFF6EF]'}`}>
                            <div className="flex items-center gap-3">
                              <span className="text-sm">{itm.name}</span>
                              <span className={`text-xs ${textSecondary}`}>×{itm.qty}</span>
                            </div>
                            <span className="text-sm font-semibold">SAR {itm.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {order.notes && (
                      <div>
                        <p className={`text-xs font-medium ${textSecondary} mb-1`}>Notes</p>
                        <p className={`text-sm p-3 rounded-xl ${darkMode ? 'bg-[#1A0E08]' : 'bg-[#FFF6EF]'}`}>{order.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {order.status === 'pending' && (
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 transition-colors cursor-pointer">
                          <Clock className="w-3.5 h-3.5" />
                          Start Preparing
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-colors cursor-pointer">
                          <Check className="w-3.5 h-3.5" />
                          Mark Delivered
                        </button>
                      )}
                      {(order.status === 'pending' || order.status === 'preparing') && (
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 text-red-500 text-xs font-semibold hover:bg-red-500/20 transition-colors cursor-pointer">
                          <X className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                      )}
                      <button className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border ${borderColor} text-xs font-medium ${textSecondary} hover:border-green-500 hover:text-green-600 transition-colors cursor-pointer`}>
                        <MessageSquare className="w-3.5 h-3.5" />
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className={`${cardBg} rounded-2xl border ${borderColor} p-12 text-center`}>
            <p className={`${textSecondary}`}>No orders found matching your filters.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
