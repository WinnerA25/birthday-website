import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ArrowRight, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { InteractiveQuestion } from '../types.ts';
import { soundEngine } from '../utils/audio.ts';

interface LeadInQuestionsProps {
  questions: InteractiveQuestion[];
  onComplete: () => void;
}

export const LeadInQuestions: React.FC<LeadInQuestionsProps> = ({
  questions,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIndex(idx);
    soundEngine.playSuccessDing();

    // Trigger mini confetti / heart burst
    confetti({
      particleCount: 45,
      spread: 55,
      origin: { y: 0.7 },
      colors: ['#ff1493', '#ff69b4', '#ffd700'],
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      // Completed all questions!
      setIsFinishing(true);
      soundEngine.playSparkleChime();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
      });
      setTimeout(() => {
        onComplete();
      }, 1400);
    }
  };

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? 'w-8 bg-gradient-to-r from-purple-600 to-violet-500 shadow-md shadow-purple-500/40'
                  : i < currentIndex
                  ? 'w-2.5 bg-purple-400'
                  : 'w-2.5 bg-[#E4D5C5]'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.95 }}
            transition={{ duration: 0.45 }}
            className="rounded-3xl bg-[#FAF7F2]/95 border border-purple-200/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-purple-950/10 relative overflow-hidden"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Câu hỏi dẫn dắt {currentIndex + 1} / {questions.length}</span>
              </span>
              <span className="text-sm text-[#7A5A82] font-romantic font-semibold">
                Điều kỳ diệu sắp mở ra ✨
              </span>
            </div>

            {/* Question title */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#2E1537] mb-2 leading-snug font-serif-elegant">
              {currentQ.question}
            </h2>
            {currentQ.subtitle && (
              <p className="text-xs sm:text-sm text-[#6B4E71] mb-6 italic font-medium">
                {currentQ.subtitle}
              </p>
            )}

            {/* Options list */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOptionIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-purple-50/90 border-purple-500 shadow-md shadow-purple-500/15 text-purple-950 font-medium scale-[1.01]'
                        : 'bg-white border-[#E8DCF0] text-[#3B1E48] hover:bg-white hover:border-purple-300 shadow-sm'
                    }`}
                  >
                    <span className="text-sm sm:text-base leading-relaxed">{opt.text}</span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                        isSelected
                          ? 'border-purple-500 bg-purple-600 text-white'
                          : 'border-[#D1C2DC] bg-[#FAF7F2]'
                      }`}
                    >
                      {isSelected && <Heart className="w-3 h-3 fill-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Reaction message if selected */}
            <AnimatePresence>
              {selectedOptionIndex !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-100/90 via-violet-50/90 to-[#FDF4E7]/90 border border-purple-300 text-purple-950 text-sm leading-relaxed flex items-start gap-3 shadow-sm"
                >
                  <PartyPopper className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-purple-900">
                      {currentQ.options[selectedOptionIndex].reaction}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Actions */}
            <div className="flex justify-end items-center gap-3">
              {currentIndex > 0 && selectedOptionIndex === null && (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentIndex((prev) => prev - 1);
                    setSelectedOptionIndex(null);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs text-[#7A5A82] hover:text-purple-900 font-medium transition-colors cursor-pointer"
                >
                  Quay lại
                </button>
              )}

              <button
                type="button"
                disabled={selectedOptionIndex === null || isFinishing}
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-[#C59B27] text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
              >
                {isFinishing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-amber-200" />
                    <span>Đang bước vào bữa tiệc...</span>
                  </>
                ) : currentIndex === questions.length - 1 ? (
                  <>
                    <span>Mở Quà Sinh Nhật Nào! 🎆</span>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                  </>
                ) : (
                  <>
                    <span>Tiếp theo nhé</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
