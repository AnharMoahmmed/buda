import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Clock, MessageCircle, Send, CheckCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { DEFAULT_WHATSAPP_NUMBER } from '../context/CartContext';

export const ContactSection = () => {
  const { t, lang } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSubmitted(false);
    }, 4500);
  };

  const whatsappDirectUrl = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً بوضة | buda! أود الاستفسار عن نكهات اليوم وطلبات التوصيل.'
      : 'Hello buda! I would like to inquire about today flavors and delivery.'
  )}`;

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/25 border border-white/30 text-white text-xs sm:text-sm font-semibold shadow-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t('visit.badge')}</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            {t('visit.title')}
          </h2>

          <p className="text-white/85 text-sm sm:text-base leading-relaxed">
            {t('visit.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Hours, Location, WhatsApp Direct */}
          <div className="lg:col-span-6 space-y-6">
            {/* Opening Hours & Location Card */}
            <div className="bg-[#FAF2E6] text-[#522518] rounded-3xl p-7 sm:p-8 shadow-xl border border-[#522518]/15 space-y-6 text-start">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#522518] text-[#FAF2E6] flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#522518]">
                    {t('visit.locationTitle')}
                  </h3>
                  <p className="text-sm text-[#522518]/80 mt-0.5 leading-relaxed">
                    {t('visit.locationDesc')}
                  </p>
                  <span className="inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#522518]/10 text-[#522518]">
                    {lang === 'ar' ? 'جلسات عائلية وخارجية مريحة' : 'Cozy indoor & outdoor seating'}
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-[#522518]/15">
                <div className="w-11 h-11 rounded-2xl bg-[#522518] text-[#FAF2E6] flex items-center justify-center shrink-0 shadow-md">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-[#522518]">
                    {t('visit.hoursTitle')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#522518]/80">
                    {t('visit.hoursWeekdays')}
                  </p>
                  <p className="text-xs sm:text-sm text-[#522518]/80">
                    {t('visit.hoursWeekends')}
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-2">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base shadow-lg transition-all transform active:scale-95 text-center"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-white" />
                  <span>{t('visit.whatsappBtn')}</span>
                </a>
                <p className="text-[11px] text-center text-[#522518]/60 mt-2 font-medium">
                  {t('visit.whatsappHint')}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-6">
            <div className="bg-[#FAF2E6] text-[#522518] rounded-3xl p-7 sm:p-8 shadow-xl border border-[#522518]/15 text-start">
              <h3 className="font-display font-bold text-xl text-[#522518] mb-1">
                {t('visit.contactFormTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-[#522518]/70 mb-5">
                {lang === 'ar'
                  ? 'يسعدنا دائماً تلقي اقتراحاتكم، استفسارات الجمعات والفعاليات الخاصة.'
                  : 'We would love to hear from you for catering, events, or inquiries.'}
              </p>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-2"
                >
                  <CheckCircle className="w-8 h-8 mx-auto text-emerald-600" />
                  <p className="font-bold text-sm">{t('visit.formSent')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#522518]">
                      {t('visit.formName')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#522518]/20 focus:border-[#522518] focus:outline-none text-sm text-[#522518]"
                      placeholder={lang === 'ar' ? 'محمد العلي' : 'Jane Doe'}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#522518]">
                      {t('visit.formEmail')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#522518]/20 focus:border-[#522518] focus:outline-none text-sm text-[#522518]"
                      placeholder={lang === 'ar' ? 'info@example.com / 0500000000' : 'name@example.com'}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#522518]">
                      {t('visit.formMessage')}
                    </label>
                    <textarea
                      rows="3"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#522518]/20 focus:border-[#522518] focus:outline-none text-sm text-[#522518] resize-none"
                      placeholder={lang === 'ar' ? 'استفسار عن نكهات الحفلات...' : 'Inquiry about party orders...'}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#522518] hover:bg-[#38150C] text-[#FAF2E6] font-bold text-sm shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t('visit.formSubmit')}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
