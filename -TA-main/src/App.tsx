import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BirthdayConfig, BirthdayPhoto, SongItem } from './types.ts';
import { DEFAULT_BIRTHDAY_DATA } from './data/defaultBirthdayData.ts';
import { FireworksCanvas } from './components/FireworksCanvas.tsx';
import { FloatingParticles } from './components/FloatingParticles.tsx';
import { LoginScreen } from './components/LoginScreen.tsx';
import { LeadInQuestions } from './components/LeadInQuestions.tsx';
import { CelebrationMain } from './components/CelebrationMain.tsx';
import { ConfigModal } from './components/ConfigModal.tsx';
import { soundEngine } from './utils/audio.ts';

const STORAGE_KEY = 'romantic_birthday_thuyan_2006_v3';

export default function App() {
  const [config, setConfig] = useState<BirthdayConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_BIRTHDAY_DATA,
          ...parsed,
          playlist: Array.isArray(parsed.playlist)
            ? parsed.playlist
            : DEFAULT_BIRTHDAY_DATA.playlist,
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_BIRTHDAY_DATA;
  });

  const [stage, setStage] = useState<'login' | 'questions' | 'celebration'>('login');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [fireworkKey, setFireworkKey] = useState(0);

  // Save config changes
  const handleSaveConfig = (newConfig: BirthdayConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  };

  const handleResetToDefault = () => {
    if (confirm('Bạn có muốn đặt lại toàn bộ nội dung về mặc định không?')) {
      setConfig(DEFAULT_BIRTHDAY_DATA);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      setShowConfigModal(false);
      soundEngine.playSuccessDing();
    }
  };

  const handleUpdatePhotos = (photos: BirthdayPhoto[]) => {
    const updated = { ...config, photos };
    setConfig(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleTriggerFirework = () => {
    setFireworkKey((prev) => prev + 1);
  };

  const handleSongChange = (song: SongItem) => {
    const updated = { ...config, selectedSongId: song.id };
    setConfig(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Keyboard shortcut to open settings anytime (Shift + S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'S' || e.key === 's')) {
        setShowConfigModal((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FAF6F0] via-[#F5EDF8] to-[#EFE6F6] text-[#2C1337] overflow-x-hidden selection:bg-purple-200 selection:text-purple-900">
      {/* Visual background layers */}
      <FloatingParticles />

      {/* Colorful Fireworks Canvas (always active, highly responsive to clicks & automatic launches) */}
      <FireworksCanvas
        key={fireworkKey}
        autoLaunch={stage === 'celebration'}
        intensity={stage === 'celebration' ? 'vibrant' : 'gentle'}
        allowClickToLaunch={true}
      />

      {/* Main Flow Stages */}
      <AnimatePresence mode="wait">
        {stage === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
          >
            <LoginScreen
              config={config}
              onLoginSuccess={() => setStage('questions')}
              onOpenSettings={() => setShowConfigModal(true)}
            />
          </motion.div>
        )}

        {stage === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <LeadInQuestions
              questions={config.questions}
              onComplete={() => setStage('celebration')}
            />
          </motion.div>
        )}

        {stage === 'celebration' && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <CelebrationMain
              config={config}
              onUpdatePhotos={handleUpdatePhotos}
              onSongChange={handleSongChange}
              onOpenSettings={() => setShowConfigModal(true)}
              onLogout={() => {
                soundEngine.stopBgm();
                setStage('login');
              }}
              onTriggerFirework={handleTriggerFirework}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Config / Personalization Modal */}
      <ConfigModal
        config={config}
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        onSave={handleSaveConfig}
        onResetToDefault={handleResetToDefault}
      />
    </div>
  );
}
