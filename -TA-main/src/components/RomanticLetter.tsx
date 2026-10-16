import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MailOpen, Heart, Sparkles, Send, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio.ts';

interface RomanticLetterProps {
  title: string;
  salutation: string;
  body: string[];
  signOff: string;
  senderName: string;
}

export const RomanticLetter: React.FC<RomanticLetterProps> = ({
  title,
  salutation,
  body,
  signOff,
  senderName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customWish, setCustomWish] = useState('');
  const [lanternLaunched, setLanternLaunched] = useState(false);

  const handleToggleOpen = () => {
    if (!isOpen) {
      soundEngine.playSparkleChime();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff1493', '#ffd700', '#ffffff'],
      });
    }
    setIsOpen(!isOpen);
  };

  const handleLaunchLantern = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWish.trim()) return;

    setLanternLaunched(true);
    soundEngine.playFireworkBurst();
    soundEngine.playSparkleChime();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#ffd700', '#ff8c00', '#ff1493'],
    });

    setTimeout(() => {
      setLanternLaunched(false);
      setCustomWish('');
    }, 4000);
  };

  return (
    <div className="w-full">
      {/* Letter Container */}
      <div className="rounded-3xl bg-[#FAF7F2]/95 border border-purple-200/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-purple-950/10 relative overflow-hidden">
        {/* Glow behind */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />

        {/* Envelope Closed State */}
        {!isOpen ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            {/* Animated Envelope Graphic */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleOpen}
              className="relative cursor-pointer group mb-6"
            >
              <div className="w-56 h-36 sm:w-64 sm:h-40 rounded-2xl bg-gradient-to-br from-[#FAF5EE] via-[#F3ECE1] to-[#E9DCF5] border-2 border-[#D8C7B0] shadow-xl shadow-purple-900/10 flex items-center justify-center relative overflow-hidden group-hover:border-purple-400 transition-colors">
                {/* Envelope Flap Lines */}
                <div className="absolute top-0 inset-x-0 h-1/2 border-b border-[#D8C7B0]/60 [clip-path:polygon(0_0,50%_100%,100%_0)] bg-white/70" />

                {/* Wax Seal Badge */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-purple-700 via-purple-600 to-violet-500 border-2 border-[#D4AF37] shadow-xl flex items-center justify-center text-amber-200 group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 fill-amber-200 text-purple-700" />
                </div>
              </div>

              {/* Pulsing prompt */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-purple-600 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 flex items-center gap-1.5 animate-bounce">
                <Mail className="w-3.5 h-3.5" />
                <span>Nhấn để mở phong thư</span>
              </div>
            </motion.div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#2E1537] font-serif-elegant mt-2">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-[#6B4E71] mt-1 max-w-md font-medium">
              Một bức thư chứa chan những tâm sự và lời chúc ngọt ngào nhất gửi đến em hôm nay.
            </p>
          </div>
        ) : (
          /* Opened Letter / Parchment Scroll */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE0F0]">
              <div className="flex items-center gap-2">
                <MailOpen className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg sm:text-xl font-bold text-[#2E1537] font-serif-elegant">
                  {title}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleToggleOpen}
                className="text-xs text-purple-700 hover:text-purple-900 font-semibold transition-colors cursor-pointer"
              >
                Gấp thư lại
              </button>
            </div>

            {/* Letter Body styled like warm creamy parchment */}
            <div className="rounded-2xl bg-gradient-to-b from-[#FDFBF7] via-[#FAF7F2] to-[#F5EFE6] border border-[#E0D2C0] p-5 sm:p-8 space-y-4 shadow-sm">
              <p className="text-xl sm:text-2xl text-purple-900 font-romantic font-bold">
                {salutation}
              </p>

              {body.map((para, i) => (
                <p
                  key={i}
                  className="text-sm sm:text-base text-[#3E1C4D] leading-relaxed font-serif-elegant tracking-wide"
                >
                  {para}
                </p>
              ))}

              <div className="pt-4 border-t border-[#E8DCCB] text-right space-y-1">
                <p className="text-xs sm:text-sm text-[#7A5A82] italic font-serif-elegant">
                  {signOff}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-purple-700 font-romantic">
                  {senderName}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Floating Lantern / Make a Wish Interactive Section */}
        <div className="mt-8 pt-6 border-t border-[#EAE0F0]">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4 text-[#B8860B]" />
            <h4 className="text-sm sm:text-base font-bold text-[#2E1537]">
              Thả Đèn Trời & Gửi Lời Ước Vào Dải Ngân Hà
            </h4>
          </div>
          <p className="text-xs text-[#6B4E71] mb-4 font-medium">
            Viết điều ước tuổi mới của em vào đây, ngọn đèn hoa đăng sẽ mang điều ước bay cao mãi...
          </p>

          <form onSubmit={handleLaunchLantern} className="flex gap-2">
            <input
              type="text"
              placeholder="Ước gì tuổi mới luôn xinh đẹp, hạnh phúc và thành công rực rỡ..."
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-xs sm:text-sm focus:outline-none focus:border-purple-500 placeholder:text-slate-400 shadow-sm"
            />
            <button
              type="submit"
              disabled={!customWish.trim() || lanternLaunched}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-[#C59B27] text-white font-medium text-xs sm:text-sm shadow-md shadow-purple-600/25 hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Thả đèn</span>
            </button>
          </form>

          {/* Flying Lantern Animation */}
          <AnimatePresence>
            {lanternLaunched && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.7 }}
                animate={{ opacity: 1, y: -250, scale: 1.2, x: 20 }}
                exit={{ opacity: 0, y: -400 }}
                transition={{ duration: 3.5, ease: 'easeOut' }}
                className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center"
              >
                {/* Glowing Lantern */}
                <div className="relative">
                  <div className="w-16 h-20 rounded-t-2xl rounded-b-lg bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_40px_#f59e0b] border border-amber-200/80 flex items-center justify-center p-2 text-center">
                    <span className="text-[10px] font-bold text-purple-950 leading-tight">
                      Điều Ước Của Em
                    </span>
                  </div>
                  {/* Flame base */}
                  <div className="w-6 h-3 bg-orange-600 rounded-full mx-auto -mt-1 blur-[1px]" />
                </div>
                <div className="mt-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#D4AF37] text-purple-900 font-semibold text-xs shadow-xl whitespace-nowrap">
                  ✨ Lời ước đang bay lên bầu trời sao... ✨
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
