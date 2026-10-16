import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Plus, Trash2, X, ChevronLeft, ChevronRight, Heart, Sparkles, Upload } from 'lucide-react';
import { BirthdayPhoto } from '../types.ts';
import { soundEngine } from '../utils/audio.ts';

interface PhotoGalleryProps {
  photos: BirthdayPhoto[];
  onUpdatePhotos: (updated: BirthdayPhoto[]) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  onUpdatePhotos,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('Tất cả');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newTag, setNewTag] = useState('Kỷ niệm');
  const [newDate, setNewDate] = useState('Khoảnh khắc ngọt ngào');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const photosPerPage = 6; // 6 photos per page for aesthetic polaroid look

  // Extract unique tags
  const tags = ['Tất cả', ...Array.from(new Set(photos.map((p) => p.tag || 'Kỷ niệm')))];

  const filteredPhotos = selectedTag === 'Tất cả'
    ? photos
    : photos.filter((p) => (p.tag || 'Kỷ niệm') === selectedTag);

  const totalPages = Math.max(1, Math.ceil(filteredPhotos.length / photosPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * photosPerPage;
  const currentPhotos = filteredPhotos.slice(startIndex, startIndex + photosPerPage);

  const handleOpenLightbox = (indexInCurrentPage: number) => {
    const photoToOpen = currentPhotos[indexInCurrentPage];
    const globalIdx = photos.findIndex((p) => p.id === photoToOpen.id);
    setActivePhotoIndex(globalIdx !== -1 ? globalIdx : 0);
    soundEngine.playSparkleChime();
  };

  const handleNextPhoto = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (photos.length <= 3) {
      alert('Nên giữ lại ít nhất 3 ảnh kỷ niệm để album luôn đong đầy nhé!');
      return;
    }
    const updated = photos.filter((p) => p.id !== id);
    onUpdatePhotos(updated);
    if (activePhotoIndex !== null && photos[activePhotoIndex]?.id === id) {
      setActivePhotoIndex(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const newPhotoItem: BirthdayPhoto = {
      id: 'p_' + Date.now(),
      url: newUrl.trim(),
      caption: newCaption.trim() || 'Khoảnh khắc đáng nhớ của chúng mình',
      tag: newTag,
      date: newDate.trim() || 'Hôm nay',
    };

    onUpdatePhotos([...photos, newPhotoItem]);
    setNewUrl('');
    setNewCaption('');
    setIsAddingPhoto(false);
    soundEngine.playSuccessDing();
  };

  return (
    <div className="w-full">
      {/* Gallery Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-semibold mb-1.5">
            <Camera className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Album Kỷ Niệm Tình Yêu ({photos.length} bức ảnh)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2E1537] font-serif-elegant">
            Những Khoảnh Khắc Đẹp Nhất Của Chúng Mình
          </h2>
        </div>

        {/* Action: Add photo button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddingPhoto(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-[#C59B27] text-white font-medium text-xs sm:text-sm shadow-md shadow-purple-600/25 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm ảnh kỷ niệm</span>
          </button>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSelectedTag(tag)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              selectedTag === tag
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-white border border-[#E8DCF0] text-[#5B3A62] hover:bg-purple-50 hover:text-purple-900'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid of Polaroid style photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPhotos.map((photo, index) => {
          // Slight playful rotation for polaroid effect
          const rotation = (index % 3 === 0 ? -1 : index % 3 === 1 ? 1 : -0.5);
          return (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
              style={{ transform: `rotate(${rotation}deg)` }}
              onClick={() => handleOpenLightbox(index)}
              className="group cursor-pointer rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] hover:border-purple-400 p-4 shadow-lg hover:shadow-2xl hover:shadow-purple-950/10 backdrop-blur-md transition-all flex flex-col relative"
            >
              {/* Photo preview container */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-white mb-3 shadow-inner">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />

                {/* Tag pill */}
                {photo.tag && (
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-purple-900 border border-purple-200 shadow-sm">
                    {photo.tag}
                  </span>
                )}

                {/* Delete button (hover) */}
                <button
                  type="button"
                  onClick={(e) => handleDeletePhoto(photo.id, e)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-[#7A5A82] hover:text-red-500 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
                  title="Xoá ảnh này"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs flex items-center gap-1 font-medium">
                    <Heart className="w-3.5 h-3.5 text-pink-300 fill-pink-300" />
                    <span>Xem cận cảnh</span>
                  </span>
                </div>
              </div>

              {/* Caption & Date */}
              <div className="px-1 flex-1 flex flex-col justify-between">
                <p className="text-sm font-semibold text-[#2E1537] line-clamp-2 leading-snug group-hover:text-purple-700 transition-colors">
                  {photo.caption}
                </p>
                {photo.date && (
                  <p className="text-[11px] text-[#7A5A82] mt-2 italic font-romantic text-base font-semibold">
                    {photo.date}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Photo Pagination Controls ("Nhảy trang ảnh") */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            type="button"
            disabled={validCurrentPage === 1}
            onClick={() => {
              setCurrentPage((p) => Math.max(1, p - 1));
              soundEngine.playSuccessDing();
            }}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white border border-[#E4D5EC] text-xs font-semibold text-[#5B3A62] hover:text-purple-900 hover:border-purple-300 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Trang ảnh trước</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === validCurrentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => {
                    setCurrentPage(pageNum);
                    soundEngine.playSuccessDing();
                  }}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md shadow-purple-600/30 scale-105'
                      : 'bg-white border border-[#E4D5EC] text-[#5B3A62] hover:text-purple-900 hover:bg-purple-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            disabled={validCurrentPage === totalPages}
            onClick={() => {
              setCurrentPage((p) => Math.min(totalPages, p + 1));
              soundEngine.playSuccessDing();
            }}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white border border-[#E4D5EC] text-xs font-semibold text-[#5B3A62] hover:text-purple-900 hover:border-purple-300 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
          >
            <span>Trang ảnh sau</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Add Photo Modal */}
      <AnimatePresence>
        {isAddingPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-[#FAF7F2] border border-purple-200 p-6 shadow-2xl relative text-[#2E1537]"
            >
              <div className="flex items-center justify-between mb-4 border-b border-[#EAE0F0] pb-3">
                <h3 className="text-lg font-bold text-[#2E1537] flex items-center gap-2 font-serif-elegant">
                  <Sparkles className="w-5 h-5 text-[#B8860B]" />
                  <span>Thêm Ảnh Kỷ Niệm Mới</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddingPhoto(false)}
                  className="p-1 rounded-full text-[#7A5A82] hover:text-[#2E1537]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4">
                {/* Image URL or Local file */}
                <div>
                  <label className="block text-xs font-semibold text-[#5B3A62] mb-1">
                    Đường dẫn ảnh (URL) hoặc tải ảnh từ máy
                  </label>
                  <input
                    type="url"
                    placeholder="https://... ảnh online"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-sm focus:outline-none focus:border-purple-500 shadow-sm"
                  />

                  {/* Local file picker */}
                  <div className="mt-2 flex items-center gap-2">
                    <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-purple-50 text-xs text-purple-800 font-semibold cursor-pointer border border-[#E4D5EC] shadow-sm">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Chọn file ảnh từ điện thoại / máy tính</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Preview */}
                {newUrl && (
                  <div className="w-full h-36 rounded-xl overflow-hidden bg-white border border-[#E4D5EC]">
                    <img src={newUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Caption */}
                <div>
                  <label className="block text-xs font-semibold text-[#5B3A62] mb-1">
                    Lời tựa / Chú thích ngọt ngào
                  </label>
                  <input
                    type="text"
                    placeholder="Nụ cười của em hôm ấy..."
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-sm focus:outline-none focus:border-purple-500 shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#5B3A62] mb-1">
                      Chủ đề / Thẻ
                    </label>
                    <select
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-sm focus:outline-none focus:border-purple-500 shadow-sm"
                    >
                      <option value="Nụ cười">Nụ cười</option>
                      <option value="Kỷ niệm">Kỷ niệm</option>
                      <option value="Du lịch">Du lịch</option>
                      <option value="Hẹn hò">Hẹn hò</option>
                      <option value="Sinh nhật">Sinh nhật</option>
                      <option value="Lãng mạn">Lãng mạn</option>
                      <option value="Đáng yêu">Đáng yêu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5B3A62] mb-1">
                      Thời gian / Địa điểm
                    </label>
                    <input
                      type="text"
                      placeholder="Mùa thu năm ấy"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-sm focus:outline-none focus:border-purple-500 shadow-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-[#EAE0F0]">
                  <button
                    type="button"
                    onClick={() => setIsAddingPhoto(false)}
                    className="px-4 py-2 rounded-xl text-xs text-[#7A5A82] hover:text-purple-950 font-medium"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={!newUrl}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-[#C59B27] text-white font-medium text-xs shadow-md shadow-purple-600/30 disabled:opacity-50 cursor-pointer"
                  >
                    Thêm vào Album
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && photos[activePhotoIndex] && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/60 backdrop-blur-xl"
            onClick={() => setActivePhotoIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-2xl w-full rounded-3xl bg-[#FAF7F2] border border-purple-200 p-4 sm:p-6 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActivePhotoIndex(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-purple-900 hover:bg-purple-600 hover:text-white transition-colors cursor-pointer shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation arrows */}
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 text-purple-900 hover:bg-purple-600 hover:text-white transition-colors cursor-pointer shadow-md"
                title="Ảnh trước"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 text-purple-900 hover:bg-purple-600 hover:text-white transition-colors cursor-pointer shadow-md"
                title="Ảnh tiếp theo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Main Photo View */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-white shadow-inner">
                <img
                  src={photos[activePhotoIndex].url}
                  alt={photos[activePhotoIndex].caption}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Caption Details */}
              <div className="mt-4 text-center">
                <p className="text-base sm:text-lg font-bold text-[#2E1537] font-serif-elegant">
                  {photos[activePhotoIndex].caption}
                </p>
                <div className="flex items-center justify-center gap-3 mt-1.5 text-xs text-purple-800 font-semibold">
                  {photos[activePhotoIndex].date && (
                    <span className="font-romantic text-base">{photos[activePhotoIndex].date}</span>
                  )}
                  <span>•</span>
                  <span>{activePhotoIndex + 1} / {photos.length}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
