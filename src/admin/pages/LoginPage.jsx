import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IceCreamCone, Eye, EyeOff, Lock } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login - no real auth since this is UI-only
    setTimeout(() => {
      setIsLoading(false);
      navigate('/admin');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E58B68] via-[#D47450] to-[#C46340] flex items-center justify-center p-4">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] bg-[#522518]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-[#3E1A10]/30 overflow-hidden">
          {/* Top section */}
          <div className="bg-gradient-to-br from-[#522518] to-[#3E1A10] px-8 pt-10 pb-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E58B68] to-[#D47450] flex items-center justify-center mx-auto shadow-lg shadow-[#E58B68]/30"
            >
              <IceCreamCone className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-white text-xl font-display font-bold mt-4">
              buda <span className="opacity-40 font-light">|</span>{' '}
              <span className="font-arabic">بوضة</span>
            </h1>
            <p className="text-[#C9A68A] text-sm mt-1">Admin Panel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="px-8 py-8 space-y-5">
            <div>
              <label className="text-xs font-medium text-[#8B6B5A] mb-1.5 block">Email</label>
              <input
                type="email"
                defaultValue="admin@buda.sa"
                className="w-full px-4 py-3 rounded-xl bg-[#FFF6EF] border border-[#F0E0D0] text-sm text-[#3E1A10] placeholder:text-[#C9A68A] focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40 focus:border-[#E58B68] transition-all"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#8B6B5A] mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  defaultValue="password"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-[#FFF6EF] border border-[#F0E0D0] text-sm text-[#3E1A10] placeholder:text-[#C9A68A] focus:outline-none focus:ring-2 focus:ring-[#E58B68]/40 focus:border-[#E58B68] transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8B6B5A] hover:text-[#3E1A10] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-[#E58B68] cursor-pointer" />
                <span className="text-xs text-[#8B6B5A]">Remember me</span>
              </label>
              <button type="button" className="text-xs text-[#E58B68] hover:text-[#D47450] font-medium transition-colors cursor-pointer">
                Forgot password?
              </button>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E58B68] to-[#D47450] text-white font-semibold text-sm shadow-lg shadow-[#E58B68]/25 hover:shadow-xl hover:shadow-[#E58B68]/30 transition-all disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-6 text-center">
            <p className="text-[10px] text-[#C9A68A]">
              This is a demo admin panel. No real authentication is required.
            </p>
          </div>
        </div>

        {/* Back to site link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            ← Back to website
          </a>
        </div>
      </motion.div>
    </div>
  );
}
