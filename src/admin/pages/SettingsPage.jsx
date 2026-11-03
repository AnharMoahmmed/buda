import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Save,
  Store,
  Clock,
  Phone,
  MapPin,
  Globe,
  Palette,
  Bell,
  Shield,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function SettingsPage() {
  const { darkMode, cardBg, textPrimary, textSecondary, borderColor } = useOutletContext();
  const [activeTab, setActiveTab] = useState('store');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = `w-full px-4 py-2.5 rounded-xl border ${borderColor} ${darkMode ? 'bg-[#1A0E08]' : 'bg-white'} text-sm focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40 transition-all`;

  const tabs = [
    { key: 'store', label: 'Store Info', icon: Store },
    { key: 'hours', label: 'Hours', icon: Clock },
    { key: 'contact', label: 'Contact', icon: Phone },
    { key: 'appearance', label: 'Appearance', icon: Palette },
    { key: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Page Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Settings</h1>
          <p className={`text-sm ${textSecondary} mt-0.5`}>Manage your store configuration</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E58B68] to-[#D47450] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs sidebar */}
        <motion.div variants={item} className={`${cardBg} rounded-2xl border ${borderColor} p-2 lg:p-3 h-fit`}>
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-[#E58B68] to-[#D47450] text-white shadow-sm'
                    : `${textSecondary} hover:bg-[#F5E6D8] ${darkMode ? 'hover:bg-[#3E2A1F]' : ''}`
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Content area */}
        <motion.div variants={item} className="lg:col-span-3 space-y-5">
          {/* Store Info */}
          {activeTab === 'store' && (
            <div className={`${cardBg} rounded-2xl border ${borderColor} p-6 space-y-5`}>
              <div>
                <h3 className="font-semibold mb-1">Store Information</h3>
                <p className={`text-xs ${textSecondary}`}>Basic details about your ice cream shop</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Brand Name (English)</label>
                  <input type="text" defaultValue="buda" className={inputClass} />
                </div>
                <div>
                  <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Brand Name (Arabic)</label>
                  <input type="text" defaultValue="بوضة" dir="rtl" className={`${inputClass} font-arabic`} />
                </div>
              </div>
              <div>
                <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Tagline (English)</label>
                <input type="text" defaultValue="Taste Joy in Every Bite" className={inputClass} />
              </div>
              <div>
                <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Tagline (Arabic)</label>
                <input type="text" defaultValue="كل لقمة.. حكاية سعادة" dir="rtl" className={`${inputClass} font-arabic`} />
              </div>
              <div>
                <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Store Description</label>
                <textarea rows={3} defaultValue="Premium ice cream, crafted with real ingredients for happier moments." className={`${inputClass} resize-none`} />
              </div>
              <div>
                <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Location / Address</label>
                <div className="flex items-center gap-2">
                  <MapPin className={`w-4 h-4 ${textSecondary} shrink-0`} />
                  <input type="text" defaultValue="Prince Turki Street, Al Yarmouk District, Riyadh" className={inputClass} />
                </div>
              </div>
            </div>
          )}

          {/* Hours */}
          {activeTab === 'hours' && (
            <div className={`${cardBg} rounded-2xl border ${borderColor} p-6 space-y-5`}>
              <div>
                <h3 className="font-semibold mb-1">Opening Hours</h3>
                <p className={`text-xs ${textSecondary}`}>Set your store operating schedule</p>
              </div>
              {[
                { day: 'Sunday', open: '13:00', close: '00:30' },
                { day: 'Monday', open: '13:00', close: '00:30' },
                { day: 'Tuesday', open: '13:00', close: '00:30' },
                { day: 'Wednesday', open: '13:00', close: '00:30' },
                { day: 'Thursday', open: '13:00', close: '00:30' },
                { day: 'Friday', open: '14:00', close: '01:30' },
                { day: 'Saturday', open: '14:00', close: '01:30' },
              ].map((schedule) => (
                <div key={schedule.day} className="flex items-center gap-4">
                  <span className={`text-sm font-medium w-24 ${textPrimary}`}>{schedule.day}</span>
                  <div className="flex items-center gap-2 flex-1">
                    <input type="time" defaultValue={schedule.open} className={`${inputClass} max-w-[140px]`} />
                    <span className={`${textSecondary} text-sm`}>to</span>
                    <input type="time" defaultValue={schedule.close} className={`${inputClass} max-w-[140px]`} />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-[#E58B68] cursor-pointer" />
                    <span className={`text-xs ${textSecondary}`}>Open</span>
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Contact */}
          {activeTab === 'contact' && (
            <div className={`${cardBg} rounded-2xl border ${borderColor} p-6 space-y-5`}>
              <div>
                <h3 className="font-semibold mb-1">Contact & Social</h3>
                <p className={`text-xs ${textSecondary}`}>Manage contact information and social media links</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>WhatsApp Number</label>
                  <div className="flex items-center gap-2">
                    <MessageSquare className={`w-4 h-4 text-green-500 shrink-0`} />
                    <input type="tel" defaultValue="+966 5XX XXX XXXX" className={inputClass} placeholder="+966..." />
                  </div>
                  <p className={`text-[11px] ${textSecondary} mt-1`}>Used for the "Order via WhatsApp" button</p>
                </div>
                <div>
                  <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Phone Number</label>
                  <div className="flex items-center gap-2">
                    <Phone className={`w-4 h-4 ${textSecondary} shrink-0`} />
                    <input type="tel" defaultValue="" className={inputClass} placeholder="+966..." />
                  </div>
                </div>
              </div>
              <div>
                <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Email</label>
                <input type="email" defaultValue="" className={inputClass} placeholder="hello@buda.sa" />
              </div>
              <hr className={borderColor} />
              <div>
                <h4 className="text-sm font-medium mb-3">Social Media Links</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Instagram', placeholder: 'https://instagram.com/buda.sa' },
                    { label: 'Twitter / X', placeholder: 'https://x.com/buda_sa' },
                    { label: 'Snapchat', placeholder: 'https://snapchat.com/add/buda.sa' },
                    { label: 'TikTok', placeholder: 'https://tiktok.com/@buda.sa' },
                  ].map((social) => (
                    <div key={social.label}>
                      <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>{social.label}</label>
                      <input type="url" className={inputClass} placeholder={social.placeholder} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeTab === 'appearance' && (
            <div className={`${cardBg} rounded-2xl border ${borderColor} p-6 space-y-5`}>
              <div>
                <h3 className="font-semibold mb-1">Appearance & Branding</h3>
                <p className={`text-xs ${textSecondary}`}>Customize colors and visual identity</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Primary Background', value: '#E58B68' },
                  { label: 'Card Background', value: '#522518' },
                  { label: 'Cream / Light', value: '#FAF2E6' },
                  { label: 'Accent Color', value: '#D47450' },
                ].map((c) => (
                  <div key={c.label}>
                    <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>{c.label}</label>
                    <div className="flex items-center gap-2">
                      <input type="color" defaultValue={c.value} className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0" />
                      <input type="text" defaultValue={c.value} className={`flex-1 ${inputClass} font-mono text-sm`} />
                    </div>
                  </div>
                ))}
              </div>

              <hr className={borderColor} />

              <div>
                <h4 className="text-sm font-medium mb-3">Default Language</h4>
                <div className="flex items-center gap-3">
                  {[
                    { value: 'en', label: 'English', flag: '🇺🇸' },
                    { value: 'ar', label: 'العربية', flag: '🇸🇦' },
                  ].map((lang) => (
                    <label key={lang.value} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${borderColor} cursor-pointer hover:border-[#E58B68] transition-colors`}>
                      <input type="radio" name="lang" defaultChecked={lang.value === 'en'} className="accent-[#E58B68] cursor-pointer" />
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className={borderColor} />

              <div>
                <h4 className="text-sm font-medium mb-3">Hero Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">Auto-rotate hero flavors</p>
                      <p className={`text-xs ${textSecondary}`}>Automatically cycle through hero carousel</p>
                    </div>
                    <button className="w-11 h-6 rounded-full bg-[#E58B68] transition-colors cursor-pointer">
                      <div className="w-5 h-5 rounded-full bg-white shadow translate-x-5 transition-transform" />
                    </button>
                  </div>
                  <div>
                    <label className={`text-xs font-medium ${textSecondary} mb-1.5 block`}>Auto-rotate interval (seconds)</label>
                    <input type="number" defaultValue="2" min="1" max="10" className={`${inputClass} max-w-[120px]`} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className={`${cardBg} rounded-2xl border ${borderColor} p-6 space-y-5`}>
              <div>
                <h3 className="font-semibold mb-1">Notification Preferences</h3>
                <p className={`text-xs ${textSecondary}`}>Choose how you want to receive alerts</p>
              </div>
              {[
                { title: 'New Order Alerts', desc: 'Get notified when a new WhatsApp order arrives', on: true },
                { title: 'Low Stock Warnings', desc: 'Alert when a flavor\'s stock drops below threshold', on: true },
                { title: 'New Reviews', desc: 'Notification when a customer leaves a review', on: true },
                { title: 'Daily Summary', desc: 'Receive a daily sales and activity summary', on: false },
                { title: 'Weekly Report', desc: 'Get a weekly performance report via email', on: false },
              ].map((notif) => (
                <div key={notif.title} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{notif.title}</p>
                    <p className={`text-xs ${textSecondary}`}>{notif.desc}</p>
                  </div>
                  <button className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${notif.on ? 'bg-[#E58B68]' : darkMode ? 'bg-[#3E2A1F]' : 'bg-[#E0D4C8]'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${notif.on ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
