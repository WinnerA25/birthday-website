import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio.ts';

interface BirthdayCakeProps {
  recipientName: string;
  onBlowCandles?: () => void;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({
  recipientName,
  onBlowCandles,
}) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wished, setWished] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setWished(true);

    soundEngine.playBlowCandle();
    setTimeout(() => {
      soundEngine.playSparkleChime();
    }, 400);

    // Huge celebratory confetti burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#c084fc', '#d4af37', '#fef3c7', '#ffffff', '#7c3aed'],
    });

    if (onBlowCandles) {
      onBlowCandles();
    }
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setWished(false);
    soundEngine.playSuccessDing();
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      {/* Cake graphic container */}
      <div
        onClick={candlesLit ? handleBlowCandles : undefined}
        className={`relative cursor-pointer group transition-transform duration-300 ${
          candlesLit ? 'hover:scale-105 active:scale-95' : ''
        }`}
        title={candlesLit ? 'Nhấn vào đây để thổi nến và ước nguyện!' : 'Nến đã được thổi!'}
      >
        {/* Glow behind cake */}
        <div
          className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-700 pointer-events-none ${
            candlesLit ? 'bg-amber-300/30 opacity-100' : 'bg-purple-300/20 opacity-40'
          }`}
        />

        {/* Candles row */}
        <div className="relative flex justify-center items-end gap-3 sm:gap-4 -mb-2 z-20">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Flame */}
              <AnimatePresence>
                {candlesLit ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flame mb-1"
                  >
                    <div className="w-4 h-6 rounded-full bg-gradient-to-t from-amber-600 via-amber-300 to-yellow-100 shadow-[0_0_15px_#f59e0b] animate-pulse" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                    className="text-purple-400 text-xs italic mb-1"
                  >
                    💨
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle stick */}
              <div className="w-2.5 sm:w-3 h-10 sm:h-12 rounded-t-sm bg-gradient-to-r from-purple-200 via-[#FAF0E6] to-purple-200 border border-purple-300/70 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,#9333ea_3px,#9333ea_6px)] opacity-25" />
              </div>
            </div>
          ))}
        </div>

        {/* Cake 3-Tier Isometric Body */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Top Layer */}
          <div className="w-36 sm:w-44 h-12 rounded-2xl bg-gradient-to-b from-[#FAF5EE] to-[#EFE3D3] border-2 border-[#D8C7B0] shadow-md relative flex items-center justify-center overflow-hidden">
            {/* Frosting drips */}
            <div className="absolute top-0 inset-x-0 h-4 bg-white/95 rounded-b-xl shadow-inner flex justify-around">
              <span className="w-3 h-4 bg-white rounded-b-full inline-block shadow-sm" />
              <span className="w-2.5 h-3 bg-white rounded-b-full inline-block shadow-sm" />
              <span className="w-3 h-5 bg-white rounded-b-full inline-block shadow-sm" />
              <span className="w-2.5 h-3.5 bg-white rounded-b-full inline-block shadow-sm" />
              <span className="w-3 h-4 bg-white rounded-b-full inline-block shadow-sm" />
            </div>
            {/* Violet & Golden Pearls */}
            <div className="flex gap-2.5 z-10 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shadow-sm" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-sm" />
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shadow-sm" />
            </div>
          </div>

          {/* Middle Layer */}
          <div className="w-48 sm:w-56 h-14 -mt-1.5 rounded-2xl bg-gradient-to-b from-[#EDE4F5] to-[#DFD0ED] border-2 border-[#C5AFD8] shadow-md relative flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-4 bg-purple-300/70 rounded-b-xl" />
            <div className="text-[12px] sm:text-xs font-bold text-purple-900 tracking-wider font-romantic mt-2">
              Happy Birthday, {recipientName}
            </div>
          </div>

          {/* Bottom Layer */}
          <div className="w-60 sm:w-72 h-16 -mt-1.5 rounded-2xl bg-gradient-to-b from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] border-2 border-purple-400 shadow-lg relative flex items-center justify-around px-4 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-4 bg-[#FAF5EE]/90 rounded-b-xl" />
            {/* Decorative cream dots */}
            {[0, 1, 2, 3, 4, 5].map((d) => (
              <span key={d} className="w-3 h-3 rounded-full bg-[#FAF5EE] shadow-md mt-2 border border-amber-200" />
            ))}
          </div>

          {/* Cake Stand / Plate */}
          <div className="w-72 sm:w-84 h-3.5 rounded-full bg-gradient-to-r from-[#E5D4B8] via-[#FAF7F2] to-[#D5BF9F] shadow-xl border border-white -mt-1" />
        </div>
      </div>

      {/* Interactive Controls & Wish Note */}
      <div className="mt-5 text-center">
        {candlesLit ? (
          <button
            type="button"
            onClick={handleBlowCandles}
            className="group px-6 py-3 rounded-full bg-gradient-to-r from-[#B8860B] via-purple-600 to-violet-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer mx-auto"
          >
            <Flame className="w-5 h-5 text-amber-200 group-hover:scale-125 transition-transform" />
            <span>Thổi nến & Ước một điều ước ✨</span>
          </button>
        ) : (
          <div className="space-y-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-100 border border-purple-300 text-purple-950 text-sm font-semibold shadow-sm"
            >
              <Heart className="w-4 h-4 text-purple-600 fill-purple-600 animate-bounce" />
              <span>Điều ước đã được gửi đi! Chúc mọi ước mơ của em đều thành hiện thực!</span>
              <Sparkles className="w-4 h-4 text-[#B8860B]" />
            </motion.div>

            <div>
              <button
                type="button"
                onClick={handleRelight}
                className="inline-flex items-center gap-1.5 text-xs text-[#7A5A82] hover:text-purple-900 transition-colors cursor-pointer py-1 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Thắp lại nến để ước tiếp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
