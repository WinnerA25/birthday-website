import React, { useMemo } from 'react';

export const FloatingParticles: React.FC = () => {
  const elements = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 96 + 2}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${Math.random() * 10 + 12}s`,
      size: Math.random() * 16 + 10,
      opacity: Math.random() * 0.4 + 0.15,
      type: Math.random() > 0.4 ? 'heart' : 'sparkle',
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft gradient ambient backlights */}
      <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-purple-300/25 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[26rem] h-[26rem] bg-[#EEDCC7]/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-2/3 left-1/2 w-96 h-96 bg-violet-200/35 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-[#F5E6D3]/45 rounded-full blur-3xl pointer-events-none" />

      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute"
          style={{
            left: el.left,
            bottom: '-40px',
            animation: `floatUp ${el.duration} ease-in infinite`,
            animationDelay: el.delay,
            opacity: el.opacity,
            transform: `rotate(${el.rotation}deg)`,
          }}
        >
          {el.type === 'heart' ? (
            <svg
              width={el.size}
              height={el.size}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-purple-400/80 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              width={el.size * 0.8}
              height={el.size * 0.8}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
            >
              <path d="M12 2l2.4 7.2h7.6l-6.1 4.5 2.3 7.3-6.2-4.5-6.2 4.5 2.3-7.3-6.1-4.5h7.6z" />
            </svg>
          )}
        </div>
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
