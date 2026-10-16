import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  SkipBack,
  SkipForward,
  ListMusic,
  Check,
} from 'lucide-react';
import { SongItem, LyricLine } from '../types.ts';
import { soundEngine } from '../utils/audio.ts';

interface MusicLyricsCardProps {
  playlist: SongItem[];
  selectedSongId?: string;
  onSongChange?: (song: SongItem) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const MusicLyricsCard: React.FC<MusicLyricsCardProps> = ({
  playlist,
  selectedSongId,
  onSongChange,
  isMuted,
  onToggleMute,
}) => {
  // Find current song or fallback to first
  const currentSongIndex = Math.max(
    0,
    playlist.findIndex((s) => s.id === (selectedSongId || soundEngine.getActiveSongId()))
  );
  const [activeSong, setActiveSong] = useState<SongItem>(
    playlist[currentSongIndex] || playlist[0]
  );

  const [isPlaying, setIsPlaying] = useState(soundEngine.isBgmActive());
  const [activeLyricIndex, setActiveLyricIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sync state if selectedSongId changes externally
  useEffect(() => {
    if (selectedSongId) {
      const match = playlist.find((s) => s.id === selectedSongId);
      if (match && match.id !== activeSong.id) {
        setActiveSong(match);
        setActiveLyricIndex(0);
        soundEngine.setActiveSongId(match.id);
      }
    }
  }, [selectedSongId, playlist, activeSong.id]);

  // Sync lyrics progression with background music
  useEffect(() => {
    let interval: number | null = null;
    if (isPlaying && !isMuted && !activeSong.audioUrl) {
      interval = window.setInterval(() => {
        setActiveLyricIndex((prev) => (prev + 1) % (activeSong.lyrics.length || 1));
      }, 4800);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isMuted, activeSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!activeSong.audioUrl) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }
    if (isMuted || !isPlaying) {
      audio.pause();
      return;
    }
    audio.play().catch(() => setIsPlaying(false));
  }, [activeSong.audioUrl, isMuted, isPlaying]);

  useEffect(() => {
    if (isMuted) {
      setIsPlaying(false);
    }
  }, [isMuted]);

  const handleSelectSong = (song: SongItem) => {
    setActiveSong(song);
    setActiveLyricIndex(0);
    if (song.audioUrl) {
      soundEngine.stopBgm();
      setIsPlaying(!isMuted);
    } else if (!isMuted) {
      soundEngine.setActiveSongId(song.id, (sec) => {
        syncLyricBySec(sec, song.lyrics);
      });
      soundEngine.startBgm((sec) => {
        syncLyricBySec(sec, song.lyrics);
      });
      setIsPlaying(true);
    } else {
      soundEngine.stopBgm();
      setIsPlaying(false);
    }
    if (onSongChange) {
      onSongChange(song);
    }
  };

  const syncLyricBySec = (sec: number, lyrics: LyricLine[]) => {
    const matchIdx = lyrics.findIndex((l, i) => {
      const nextTime = lyrics[i + 1]?.timeSec ?? 999;
      return sec >= l.timeSec && sec < nextTime;
    });
    if (matchIdx !== -1) {
      setActiveLyricIndex(matchIdx);
    }
  };

  const handleTogglePlay = () => {
    if (activeSong.audioUrl) {
      if (isMuted) onToggleMute();
      setIsPlaying(!isPlaying);
      return;
    }
    if (isPlaying) {
      soundEngine.stopBgm();
      setIsPlaying(false);
    } else {
      if (isMuted) {
        onToggleMute();
      }
      soundEngine.setActiveSongId(activeSong.id);
      soundEngine.startBgm((sec) => {
        syncLyricBySec(sec, activeSong.lyrics);
      });
      setIsPlaying(true);
    }
  };

  const handleNextSong = () => {
    const currentIndex = playlist.findIndex((s) => s.id === activeSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    handleSelectSong(playlist[nextIndex]);
  };

  const handlePrevSong = () => {
    const currentIndex = playlist.findIndex((s) => s.id === activeSong.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    handleSelectSong(playlist[prevIndex]);
  };

  return (
    <div className="w-full space-y-6">
      {/* ================= PLAYLIST SELECTOR TABS ================= */}
      <div className="rounded-3xl bg-[#FAF7F2]/95 border border-purple-200/90 p-4 sm:p-5 backdrop-blur-xl shadow-lg shadow-purple-950/5">
        <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-[#EAE0F0]">
          <div className="flex items-center gap-2">
            <ListMusic className="w-4 h-4 text-purple-700" />
            <h4 className="text-xs sm:text-sm font-bold text-[#2E1537] font-serif-elegant">
              Chọn Bài Hát Chúc Mừng ({playlist.length} bài hát theo yêu cầu)
            </h4>
          </div>
          <span className="text-[11px] text-purple-700 font-medium hidden sm:inline">
            Bấm bài hát để thưởng thức giai điệu & lời ca
          </span>
        </div>

        {/* Scrollable / Grid Song Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {playlist.map((song, idx) => {
            const isSelected = song.id === activeSong.id;
            return (
              <button
                key={song.id}
                type="button"
                onClick={() => handleSelectSong(song)}
                className={`text-left p-3 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group flex items-center gap-3 ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-100/95 via-purple-50 to-[#FFF9F0] border-purple-400 shadow-md shadow-purple-500/10 scale-[1.01]'
                    : 'bg-white/80 border-[#EFE5F5] hover:bg-white hover:border-purple-200 text-[#5B3A62]'
                }`}
              >
                {/* Number or Equalizer */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold transition-transform group-hover:scale-105 ${
                    isSelected
                      ? 'bg-gradient-to-tr from-purple-600 to-violet-500 text-white shadow-sm'
                      : 'bg-purple-100/70 text-purple-800'
                  }`}
                >
                  {isSelected && isPlaying ? (
                    <div className="flex items-end gap-0.5 h-3.5">
                      <span className="w-0.5 bg-white rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                      <span className="w-0.5 bg-white rounded-full animate-bounce h-3.5" style={{ animationDelay: '150ms' }} />
                      <span className="w-0.5 bg-white rounded-full animate-bounce h-2.5" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p
                      className={`text-xs sm:text-sm font-bold truncate ${
                        isSelected ? 'text-purple-950' : 'text-[#3E1C4D]'
                      }`}
                    >
                      {song.title}
                    </p>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-[#7A5A82] truncate">
                      {song.artist}
                    </span>
                    {song.tag && (
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-purple-100 text-purple-800 font-medium shrink-0">
                        {song.tag}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= NOW PLAYING & KARAOKE CARD ================= */}
      <div className="w-full rounded-3xl bg-[#FAF7F2]/95 border border-purple-200/90 p-5 sm:p-7 backdrop-blur-xl shadow-xl shadow-purple-950/10 relative overflow-hidden">
        <audio
          ref={audioRef}
          src={activeSong.audioUrl || undefined}
          onTimeUpdate={(event) => syncLyricBySec(event.currentTarget.currentTime, activeSong.lyrics)}
          onEnded={() => setIsPlaying(false)}
          onError={() => setIsPlaying(false)}
          preload="metadata"
        />
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-56 h-56 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#EED8C0]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Header bar: Title, Player buttons, Soundwaves */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#EAE0F0] relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-700 via-violet-600 to-[#C59B27] flex items-center justify-center text-white shadow-lg shadow-purple-600/30 ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '8s' }}
              >
                <Music className="w-7 h-7" />
              </div>
              {isPlaying && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-600" />
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wider">
                  Đang phát
                </span>
                {activeSong.tag && (
                  <span className="text-[10px] font-medium text-[#B8860B] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{activeSong.tag}</span>
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#2E1537] font-serif-elegant mt-0.5">
                {activeSong.title}
              </h3>
              <p className="text-xs text-purple-700 font-semibold">{activeSong.artist}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Animated sound equalizer bars */}
            {isPlaying && (
              <div className="flex items-end gap-1 h-5 px-2">
                <span className="w-1 bg-purple-600 rounded-full animate-bounce h-3" style={{ animationDelay: '0ms' }} />
                <span className="w-1 bg-[#D4AF37] rounded-full animate-bounce h-5" style={{ animationDelay: '150ms' }} />
                <span className="w-1 bg-violet-500 rounded-full animate-bounce h-4" style={{ animationDelay: '300ms' }} />
                <span className="w-1 bg-purple-600 rounded-full animate-bounce h-2" style={{ animationDelay: '450ms' }} />
              </div>
            )}

            {/* Prev Song */}
            <button
              type="button"
              onClick={handlePrevSong}
              className="p-2 rounded-xl bg-white border border-[#E8DCF0] text-purple-900 hover:text-purple-950 hover:bg-purple-50 transition-colors cursor-pointer shadow-sm"
              title="Bài trước đó"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Play/Pause */}
            <button
              type="button"
              onClick={handleTogglePlay}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-[#C59B27] text-white font-medium text-xs sm:text-sm shadow-md shadow-purple-600/25 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Tạm dừng</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Phát bài hát</span>
                </>
              )}
            </button>

            {/* Next Song */}
            <button
              type="button"
              onClick={handleNextSong}
              className="p-2 rounded-xl bg-white border border-[#E8DCF0] text-purple-900 hover:text-purple-950 hover:bg-purple-50 transition-colors cursor-pointer shadow-sm"
              title="Bài tiếp theo"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Mute/Unmute */}
            <button
              type="button"
              onClick={onToggleMute}
              className="p-2 rounded-xl bg-white border border-[#E8DCF0] text-purple-900 hover:text-purple-950 hover:bg-purple-50 transition-colors cursor-pointer shadow-sm"
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Karaoke / Synchronized Lyrics Display */}
        <div className="mt-5 space-y-3 relative z-10">
          <div className="flex items-center justify-between text-xs text-[#6B4E71] font-semibold">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Lời bài hát & Tâm tình sinh nhật:</span>
            </span>
            <span className="text-[11px]">(Bấm vào từng câu hát để chọn đọc hoặc hát cùng)</span>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {activeSong.lyrics.map((lyric, idx) => {
              const isActive = idx === activeLyricIndex;
              return (
                <motion.div
                  key={lyric.id}
                  onClick={() => setActiveLyricIndex(idx)}
                  className={`p-3.5 rounded-2xl transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-100 via-purple-50 to-[#FFFDF9] border-purple-400 shadow-md shadow-purple-500/10 scale-[1.01]'
                      : 'bg-white/80 border-[#EFE5F5] hover:bg-white text-[#5B3A62] hover:text-[#2E1537]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`text-sm sm:text-base font-romantic tracking-wide transition-colors ${
                        isActive ? 'text-purple-950 font-bold text-lg sm:text-xl' : 'text-[#3E1C4D]'
                      }`}
                    >
                      {isActive ? `🎶 ${lyric.text}` : lyric.text}
                    </p>
                    {isActive && (
                      <span className="shrink-0 text-[11px] px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white font-sans font-medium shadow-sm animate-pulse">
                        Đang hát
                      </span>
                    )}
                  </div>
                  {lyric.subtext && (
                    <p
                      className={`text-xs mt-1 italic transition-colors font-medium ${
                        isActive ? 'text-purple-800 font-semibold' : 'text-[#7A5A82]'
                      }`}
                    >
                      {lyric.subtext}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
