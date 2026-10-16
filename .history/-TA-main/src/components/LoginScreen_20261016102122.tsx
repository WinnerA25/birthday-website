import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, KeyRound, Sparkles, Eye, Settings2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BirthdayConfig } from '../types.ts';
import { soundEngine } from '../utils/audio.ts';

interface LoginScreenProps {
  config: BirthdayConfig;
  onLoginSuccess: () => void;
  onOpenSettings: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  config,
  onLoginSuccess,
  onOpenSettings,
}) => {
  // Parse target date (YYYY-MM-DD)
  const [targetYear, targetMonth, targetDay] = config.birthDate.split('-');

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    // Format day and month with leading zero
    const paddedDay = day.padStart(2, '0');
    const paddedMonth = month.padStart(2, '0');
    const inputDate = `${year}-${paddedMonth}-${paddedDay}`;

    if (!day || !month || !year) {
      setErrorMsg('Vui lòng nhập đầy đủ ngày, tháng và năm sinh của bạn nhé!');
      return;
    }

    if (inputDate === config.birthDate || (paddedDay === targetDay && paddedMonth === targetMonth)) {
      // Correct!
      setIsUnlocking(true);
      soundEngine.playSuccessDing();
      soundEngine.playSparkleChime();

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff1493', '#ffd700', '#ff69b4', '#ffffff'],
      });

      setTimeout(() => {
        onLoginSuccess();
      }, 1200);
    } else {
      setErrorMsg('Ủa ủa, hình như chưa đúng ngày sinh nè! Thử kiểm tra lại ngày tháng năm sinh nha ❤️');
      soundEngine.playMusicBoxNote(220, 0.4, 0.1);
    }
  };

  const handleQuickBypass = () => {
    setDay(targetDay);
    setMonth(targetMonth);
    setYear(targetYear);
    setIsUnlocking(true);
    soundEngine.playSuccessDing();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      onLoginSuccess();
    }, 900);
  };

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
      {/* Settings shortcut in top right */}
      <button
        onClick={onOpenSettings}
        className="fixed top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-purple-200/80 text-xs text-purple-900 hover:text-purple-950 hover:border-purple-400 backdrop-blur-md transition-all shadow-md cursor-pointer"
        title="Tùy chỉnh thông tin & ảnh sinh nhật"
      >
        <Settings2 className="w-3.5 h-3.5 text-purple-600" />
        <span className="font-medium">Chỉnh sửa quà tặng</span>
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-md rounded-3xl bg-[#FAF7F2]/95 border border-purple-200/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-purple-950/10 relative overflow-hidden"
      >
        {/* Glow ambient background inside card */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-[#EED8C0]/40 rounded-full blur-3xl pointer-events-none" />

        {/* Romantic Photo on Login Card */}
        <div className="relative mx-auto mb-6 w-40 h-40 sm:w-52 sm:h-52">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-violet-400 to-[#D4AF37] p-1 shadow-lg shadow-purple-500/25 animate-pulse-glow">
            <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
              <img
                src={config.loginPhoto || '/images/photo1.jpg'}
                alt={config.recipientName}
                onError={(e) => {
                  e.currentTarget.src = '/images/photo1.jpg';
                }}
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
          {/* Floating heart badge */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -bottom-1 right-2 bg-gradient-to-r from-purple-600 to-violet-500 p-2 rounded-full shadow-lg border-2 border-white text-white"
          >
            <Heart className="w-4 h-4 fill-white" />
          </motion.div>
        </div>

        {/* Title & Romantic Subtitle */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-medium mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Món Quà Bí Mật Dành Riêng Cho Em</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2E1537] font-serif-elegant">
            Hi nhô {config.recipientName || 'Thúy An'}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B4E71] mt-1.5 leading-relaxed font-medium">
            Nhập ngày tháng năm sinh của em để mở khóa thế giới bất ngờ hôm nay nhé! 💜
          </p>
        </div>

        {/* Birthday Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="grid grid-cols-3 gap-2.5">
            {/* Day */}
            <div>
              <label className="block text-[11px] font-semibold text-[#5B3A62] mb-1 text-center">
                Ngày sinh (DD)
              </label>
              <input
                type="number"
                min="1"
                max="31"
                placeholder="25"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full text-center py-2.5 px-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-base font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all placeholder:text-slate-400 shadow-sm"
              />
            </div>

            {/* Month */}
            <div>
              <label className="block text-[11px] font-semibold text-[#5B3A62] mb-1 text-center">
                Tháng sinh (MM)
              </label>
              <input
                type="number"
                min="1"
                max="12"
                placeholder="10"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full text-center py-2.5 px-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-base font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all placeholder:text-slate-400 shadow-sm"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-[11px] font-semibold text-[#5B3A62] mb-1 text-center">
                Năm sinh (YYYY)
              </label>
              <input
                type="number"
                min="1950"
                max="2030"
                placeholder="2006"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full text-center py-2.5 px-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-base font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all placeholder:text-slate-400 shadow-sm"
              />
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-2.5 rounded-xl bg-purple-100 border border-purple-300 text-purple-900 text-xs text-center font-medium"
              >
                {errorMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUnlocking}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-[#C59B27] text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:shadow-purple-600/40 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {isUnlocking ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-200" />
                <span>Đang mở cánh cổng diệu kỳ...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Mở Cửa Thế Giới Sinh Nhật ✨</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Access Bar */}
        <div className="mt-5 pt-4 border-t border-[#EAE0F0] flex items-center justify-center text-xs text-[#7A5A82]">
          <button
            type="button"
            onClick={handleQuickBypass}
            className="inline-flex items-center gap-1.5 text-purple-700 hover:text-purple-900 transition-colors cursor-pointer font-medium hover:underline"
            title="Đăng nhập tự động với ngày sinh mặc định"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>({targetDay}/{targetMonth}/{targetYear})</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
