import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  MoreHorizontal,
  Star,
  ArrowUpDown,
  X,
  IceCreamCone,
  Upload,
  Save,
  ChevronDown,
} from 'lucide-react';
import { flavorsData } from '../../data/flavors';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function FlavorsPage() {
  const { darkMode, cardBg, textPrimary, textSecondary, borderColor } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingFlavor, setEditingFlavor] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid | table
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', 'chocolate', 'nuts', 'fruity'];

  const filteredFlavors = flavorsData.filter((f) => {
    const matchesSearch =
      f.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.name.ar.includes(searchQuery);
    const matchesCategory = filterCategory === 'all' || f.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Page Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Flavors</h1>
          <p className={`text-sm ${textSecondary} mt-0.5`}>Manage your ice cream flavors and products</p>
        </div>
        <button
          onClick={() => setEditingFlavor({})}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E58B68] to-[#D47450] text-white text-sm font-semibold shadow-md shadow-[#E58B68]/20 hover:shadow-lg transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Flavor
        </button>
      </motion.div>

      {/* Filters Bar */}
      <motion.div variants={item} className={`${cardBg} rounded-2xl border ${borderColor} p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3`}>
        {/* Search */}
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${textSecondary}`} />
          <input
            type="text"
            placeholder="Search flavors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-xl ${darkMode ? 'bg-[#1A0E08] border-[#3E2A1F]' : 'bg-[#FFF6EF] border-[#F0E0D0]'} border text-sm focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40 transition-all`}
          />
        </div>

        {/* Category filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#E58B68] text-white shadow-sm'
                  : `${darkMode ? 'bg-[#1A0E08] hover:bg-[#3E2A1F]' : 'bg-[#FFF6EF] hover:bg-[#F5E6D8]'} ${textSecondary}`
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className={`flex items-center ${darkMode ? 'bg-[#1A0E08]' : 'bg-[#FFF6EF]'} rounded-lg p-0.5 border ${borderColor}`}>
          {['grid', 'table'].map((v) => (
            <button
              key={v}
              onClick={() => setViewMode(v)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all cursor-pointer ${
                viewMode === v ? 'bg-white shadow-sm text-[#3E1A10]' : textSecondary
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFlavors.map((flavor) => (
            <motion.div
              key={flavor.id}
              variants={item}
              className={`${cardBg} rounded-2xl border ${borderColor} overflow-hidden group hover:shadow-lg transition-all`}
            >
              {/* Image area */}
              <div
                className="h-44 relative overflow-hidden flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${flavor.cardBg}CC, ${flavor.cardBg})` }}
              >
                <img
                  src={flavor.image}
                  alt={flavor.name.en}
                  className="h-36 w-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-start justify-end p-3 gap-1.5">
                  <button
                    onClick={() => setEditingFlavor(flavor)}
                    className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg bg-white/90 hover:bg-white flex items-center justify-center shadow transition-all cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#3E1A10]" />
                  </button>
                  <button className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg bg-white/90 hover:bg-red-50 flex items-center justify-center shadow transition-all cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
                {/* Hero badge */}
                {flavor.isHero && (
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-amber-400 text-[10px] font-bold text-amber-900 uppercase tracking-wide shadow">
                    Hero
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-sm">{flavor.name.en}</h3>
                    <p className={`text-xs ${textSecondary} mt-0.5 font-arabic`}>{flavor.name.ar}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold">{flavor.rating}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-md capitalize ${darkMode ? 'bg-[#1A0E08]' : 'bg-[#FFF6EF]'} ${textSecondary}`}>
                    {flavor.category}
                  </span>
                  <span className={`text-xs ${textSecondary}`}>{flavor.reviewsCount} reviews</span>
                </div>

                <div className={`mt-3 pt-3 border-t ${borderColor} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div>
                      <span className={`text-[10px] ${textSecondary} block`}>Single</span>
                      <span className="text-sm font-bold">SAR {flavor.prices.single}</span>
                    </div>
                    <div>
                      <span className={`text-[10px] ${textSecondary} block`}>Pint</span>
                      <span className="text-sm font-bold">SAR {flavor.prices.pint}</span>
                    </div>
                  </div>
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: flavor.accentColor }}
                    title={`Accent: ${flavor.accentColor}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Table View */
        <motion.div variants={item} className={`${cardBg} rounded-2xl border ${borderColor} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${borderColor}`}>
                  {['', 'Name', 'Category', 'Price (Single)', 'Rating', 'Reviews', 'Hero', 'Actions'].map((h) => (
                    <th key={h} className={`text-left text-xs font-medium ${textSecondary} px-4 py-3`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredFlavors.map((flavor) => (
                  <tr key={flavor.id} className={`border-b ${borderColor} last:border-b-0 hover:${darkMode ? 'bg-[#1A0E08]' : 'bg-[#FFF6EF]'} transition-colors`}>
                    <td className="px-4 py-3">
                      <div
                        className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center"
                        style={{ background: flavor.cardBg }}
                      >
                        <img src={flavor.image} alt="" className="h-8 object-contain" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold">{flavor.name.en}</p>
                      <p className={`text-xs ${textSecondary} font-arabic`}>{flavor.name.ar}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-md capitalize ${darkMode ? 'bg-[#1A0E08]' : 'bg-[#FFF6EF]'} ${textSecondary}`}>
                        {flavor.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold">SAR {flavor.prices.single}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm">{flavor.rating}</span>
                      </div>
                    </td>
                    <td className={`px-4 py-3 text-sm ${textSecondary}`}>{flavor.reviewsCount}</td>
                    <td className="px-4 py-3">
                      {flavor.isHero ? (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 text-xs font-medium">Yes</span>
                      ) : (
                        <span className={`text-xs ${textSecondary}`}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingFlavor(flavor)}
                          className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-[#3E2A1F]' : 'hover:bg-[#F5E6D8]'} transition-colors cursor-pointer`}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button className={`p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer`}>
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Edit / Add Flavor Modal */}
      <AnimatePresence>
        {editingFlavor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
            onClick={() => setEditingFlavor(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className={`${cardBg} rounded-2xl border ${borderColor} shadow-2xl w-full max-w-2xl`}
            >
              {/* Modal header */}
              <div className={`flex items-center justify-between px-6 py-4 border-b ${borderColor}`}>
                <h2 className="text-lg font-display font-bold">
                  {editingFlavor.id ? `Edit: ${editingFlavor.name?.en}` : 'Add New Flavor'}
                </h2>
                <button
                  onClick={() => setEditingFlavor(null)}
                  className={`p-2 rounded-xl ${darkMode ? 'hover:bg-[#3E2A1F]' : 'hover:bg-[#F0E0D0]'} transition-colors cursor-pointer`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6 space-y-5">
                {/* Image upload area */}
                <div>
                  <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Product Image</label>
                  <div className={`border-2 border-dashed ${borderColor} rounded-2xl p-8 flex flex-col items-center justify-center text-center ${darkMode ? 'bg-[#1A0E08]' : 'bg-[#FFF6EF]'}`}>
                    {editingFlavor.image ? (
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center" style={{ background: editingFlavor.cardBg || '#522518' }}>
                          <img src={editingFlavor.image} alt="" className="h-16 object-contain" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium">Current image loaded</p>
                          <p className={`text-xs ${textSecondary}`}>Click to change</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className={`w-8 h-8 ${textSecondary} mb-2`} />
                        <p className="text-sm font-medium">Drop image here or click to upload</p>
                        <p className={`text-xs ${textSecondary} mt-1`}>PNG, JPG up to 5MB</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Name fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Name (English)</label>
                    <input
                      type="text"
                      defaultValue={editingFlavor.name?.en || ''}
                      placeholder="e.g. Belgian Chocolate"
                      className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${darkMode ? 'bg-[#1A0E08]' : 'bg-white'} text-sm focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40 transition-all`}
                    />
                  </div>
                  <div>
                    <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Name (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      defaultValue={editingFlavor.name?.ar || ''}
                      placeholder="مثال: شوكولاتة بلجيكية"
                      className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${darkMode ? 'bg-[#1A0E08]' : 'bg-white'} text-sm font-arabic focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40 transition-all`}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Description (EN)</label>
                    <textarea
                      rows={3}
                      defaultValue={editingFlavor.description?.en || ''}
                      placeholder="Describe the flavor..."
                      className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${darkMode ? 'bg-[#1A0E08]' : 'bg-white'} text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40 transition-all`}
                    />
                  </div>
                  <div>
                    <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Description (AR)</label>
                    <textarea
                      rows={3}
                      dir="rtl"
                      defaultValue={editingFlavor.description?.ar || ''}
                      placeholder="وصف النكهة..."
                      className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${darkMode ? 'bg-[#1A0E08]' : 'bg-white'} text-sm font-arabic resize-none focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40 transition-all`}
                    />
                  </div>
                </div>

                {/* Category + prices */}
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Category</label>
                    <select
                      defaultValue={editingFlavor.category || 'chocolate'}
                      className={`w-full px-3 py-2.5 rounded-xl border ${borderColor} ${darkMode ? 'bg-[#1A0E08]' : 'bg-white'} text-sm focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40 transition-all cursor-pointer`}
                    >
                      <option value="chocolate">Chocolate</option>
                      <option value="nuts">Nuts & Creamy</option>
                      <option value="fruity">Fruity</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Single (SAR)</label>
                    <input
                      type="number"
                      defaultValue={editingFlavor.prices?.single || ''}
                      placeholder="16"
                      className={`w-full px-3 py-2.5 rounded-xl border ${borderColor} ${darkMode ? 'bg-[#1A0E08]' : 'bg-white'} text-sm focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40 transition-all`}
                    />
                  </div>
                  <div>
                    <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Double (SAR)</label>
                    <input
                      type="number"
                      defaultValue={editingFlavor.prices?.double || ''}
                      placeholder="24"
                      className={`w-full px-3 py-2.5 rounded-xl border ${borderColor} ${darkMode ? 'bg-[#1A0E08]' : 'bg-white'} text-sm focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40 transition-all`}
                    />
                  </div>
                  <div>
                    <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Pint (SAR)</label>
                    <input
                      type="number"
                      defaultValue={editingFlavor.prices?.pint || ''}
                      placeholder="48"
                      className={`w-full px-3 py-2.5 rounded-xl border ${borderColor} ${darkMode ? 'bg-[#1A0E08]' : 'bg-white'} text-sm focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40 transition-all`}
                    />
                  </div>
                </div>

                {/* Color pickers */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Accent Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        defaultValue={editingFlavor.accentColor || '#E08A63'}
                        className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                      />
                      <input
                        type="text"
                        defaultValue={editingFlavor.accentColor || '#E08A63'}
                        className={`flex-1 px-3 py-2.5 rounded-xl border ${borderColor} ${darkMode ? 'bg-[#1A0E08]' : 'bg-white'} text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Card Background</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        defaultValue={editingFlavor.cardBg || '#522518'}
                        className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                      />
                      <input
                        type="text"
                        defaultValue={editingFlavor.cardBg || '#522518'}
                        className={`flex-1 px-3 py-2.5 rounded-xl border ${borderColor} ${darkMode ? 'bg-[#1A0E08]' : 'bg-white'} text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Page Background</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        defaultValue={editingFlavor.pageBg || '#E58B68'}
                        className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                      />
                      <input
                        type="text"
                        defaultValue={editingFlavor.pageBg || '#E58B68'}
                        className={`flex-1 px-3 py-2.5 rounded-xl border ${borderColor} ${darkMode ? 'bg-[#1A0E08]' : 'bg-white'} text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40`}
                      />
                    </div>
                  </div>
                </div>

                {/* Toggle Hero */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Show in Hero Carousel</p>
                    <p className={`text-xs ${textSecondary}`}>Display this flavor in the homepage hero section</p>
                  </div>
                  <button className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${editingFlavor.isHero ? 'bg-[#E58B68]' : darkMode ? 'bg-[#3E2A1F]' : 'bg-[#E0D4C8]'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${editingFlavor.isHero ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </div>

              {/* Modal footer */}
              <div className={`flex items-center justify-end gap-3 px-6 py-4 border-t ${borderColor}`}>
                <button
                  onClick={() => setEditingFlavor(null)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border ${borderColor} ${textSecondary} hover:bg-[#F5E6D8] transition-colors cursor-pointer`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditingFlavor(null)}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#E58B68] to-[#D47450] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {editingFlavor.id ? 'Save Changes' : 'Create Flavor'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
