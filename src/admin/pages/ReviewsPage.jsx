import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Search,
  Check,
  X,
  Eye,
  Trash2,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Filter,
} from 'lucide-react';
import { reviewsData } from '../../data/reviews';

const allReviews = [
  ...reviewsData.map((r) => ({
    ...r,
    status: 'approved',
    date: '2026-10-28',
    flavor: 'Multiple',
  })),
  {
    id: 'r5',
    author: { en: 'Khalid R.', ar: 'خالد ر.' },
    text: { en: 'The mango sorbet is incredibly refreshing. Best I\'ve ever had!', ar: 'سوربيه المانجو منعش بشكل لا يصدق. أفضل ما تذوقته!' },
    rating: 5,
    status: 'pending',
    date: '2026-11-03',
    flavor: 'Mango Sorbet',
  },
  {
    id: 'r6',
    author: { en: 'Reem S.', ar: 'ريم س.' },
    text: { en: 'Good flavors but delivery was slow. Ice cream was slightly melted.', ar: 'نكهات ممتازة لكن التوصيل كان بطيء. الآيسكريم ذاب قليلاً.' },
    rating: 3,
    status: 'pending',
    date: '2026-11-02',
    flavor: 'Salted Caramel',
  },
  {
    id: 'r7',
    author: { en: 'Nouf A.', ar: 'نوف ع.' },
    text: { en: 'Absolutely amazing! The vanilla bean is pure perfection.', ar: 'مذهل تماماً! فانيلا مدغشقر كمال صافي.' },
    rating: 5,
    status: 'approved',
    date: '2026-11-01',
    flavor: 'Madagascar Vanilla',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function ReviewsPage() {
  const { darkMode, cardBg, textPrimary, textSecondary, borderColor } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRating, setFilterRating] = useState('all');

  const filteredReviews = allReviews.filter((r) => {
    const matchSearch = r.author.en.toLowerCase().includes(searchQuery.toLowerCase()) || r.text.en.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchRating = filterRating === 'all' || r.rating === parseInt(filterRating);
    return matchSearch && matchStatus && matchRating;
  });

  const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);
  const pendingCount = allReviews.filter((r) => r.status === 'pending').length;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Page Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-display font-bold">Reviews</h1>
        <p className={`text-sm ${textSecondary} mt-0.5`}>Manage customer testimonials and ratings</p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div variants={item} className={`${cardBg} rounded-2xl border ${borderColor} p-5`}>
          <p className={`text-xs font-medium ${textSecondary}`}>Average Rating</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-3xl font-bold">{avgRating}</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-4 h-4 ${s <= Math.round(avgRating) ? 'text-amber-400 fill-amber-400' : `${textSecondary}`}`} />
              ))}
            </div>
          </div>
          <p className={`text-xs ${textSecondary} mt-1`}>{allReviews.length} total reviews</p>
        </motion.div>

        <motion.div variants={item} className={`${cardBg} rounded-2xl border ${borderColor} p-5`}>
          <p className={`text-xs font-medium ${textSecondary}`}>Pending Review</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-3xl font-bold">{pendingCount}</span>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">Needs attention</span>
            )}
          </div>
          <p className={`text-xs ${textSecondary} mt-1`}>Awaiting approval</p>
        </motion.div>

        <motion.div variants={item} className={`${cardBg} rounded-2xl border ${borderColor} p-5`}>
          <p className={`text-xs font-medium ${textSecondary}`}>Rating Distribution</p>
          <div className="mt-2 space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = allReviews.filter((r) => r.rating === star).length;
              const pct = allReviews.length ? (count / allReviews.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className={`text-xs w-3 text-right ${textSecondary}`}>{star}</span>
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <div className={`flex-1 h-1.5 rounded-full ${darkMode ? 'bg-[#1A0E08]' : 'bg-[#F5E6D8]'} overflow-hidden`}>
                    <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                  </div>
                  <span className={`text-xs w-5 ${textSecondary}`}>{count}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div variants={item} className={`${cardBg} rounded-2xl border ${borderColor} p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3`}>
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${textSecondary}`} />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-xl ${darkMode ? 'bg-[#1A0E08] border-[#3E2A1F]' : 'bg-[#FFF6EF] border-[#F0E0D0]'} border text-sm focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40 transition-all`}
          />
        </div>
        <div className="flex items-center gap-2">
          {['all', 'pending', 'approved'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                filterStatus === s
                  ? 'bg-[#E58B68] text-white shadow-sm'
                  : `${darkMode ? 'bg-[#1A0E08] hover:bg-[#3E2A1F]' : 'bg-[#FFF6EF] hover:bg-[#F5E6D8]'} ${textSecondary}`
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className={`px-3 py-1.5 rounded-lg text-xs border ${borderColor} ${darkMode ? 'bg-[#1A0E08]' : 'bg-white'} ${textSecondary} cursor-pointer focus:outline-none`}
        >
          <option value="all">All ratings</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} stars</option>
          ))}
        </select>
      </motion.div>

      {/* Reviews list */}
      <div className="space-y-3">
        {filteredReviews.map((review) => (
          <motion.div
            key={review.id}
            variants={item}
            className={`${cardBg} rounded-2xl border ${borderColor} p-5 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E58B68] to-[#D47450] flex items-center justify-center text-white text-sm font-bold shrink-0">
                {review.author.en.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold">{review.author.en}</span>
                      {review.status === 'pending' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-medium">Pending</span>
                      )}
                      {review.status === 'approved' && (
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">Approved</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'text-amber-400 fill-amber-400' : `${textSecondary}`}`} />
                        ))}
                      </div>
                      <span className={`text-xs ${textSecondary}`}>·</span>
                      <span className={`text-xs ${textSecondary}`}>{review.date}</span>
                      {review.flavor && (
                        <>
                          <span className={`text-xs ${textSecondary}`}>·</span>
                          <span className={`text-xs ${textSecondary}`}>{review.flavor}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <p className="text-sm mt-2">{review.text.en}</p>
                <p className={`text-sm mt-1 font-arabic ${textSecondary}`} dir="rtl">{review.text.ar}</p>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3">
                  {review.status === 'pending' && (
                    <>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600 transition-colors cursor-pointer">
                        <Check className="w-3 h-3" />
                        Approve
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-xs font-medium hover:bg-red-500/20 transition-colors cursor-pointer">
                        <X className="w-3 h-3" />
                        Reject
                      </button>
                    </>
                  )}
                  <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${borderColor} text-xs font-medium ${textSecondary} hover:border-red-400 hover:text-red-500 transition-colors cursor-pointer`}>
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredReviews.length === 0 && (
          <div className={`${cardBg} rounded-2xl border ${borderColor} p-12 text-center`}>
            <p className={`${textSecondary}`}>No reviews found matching your filters.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
