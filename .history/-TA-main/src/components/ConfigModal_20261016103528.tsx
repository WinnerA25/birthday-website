import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, RotateCcw, Sparkles, User, Calendar, Image as ImageIcon, Heart, Music, FileText, Upload } from 'lucide-react';
import { BirthdayConfig } from '../types.ts';
import { DEFAULT_BIRTHDAY_DATA } from '../data/defaultBirthdayData.ts';
import { soundEngine } from '../utils/audio.ts';

interface ConfigModalProps {
  config: BirthdayConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newConfig: BirthdayConfig) => void;
  onResetToDefault: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  config,
  isOpen,
  onClose,
  onSave,
  onResetToDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'letter' | 'lyrics'>('general');
  const [formData, setFormData] = useState<BirthdayConfig>(config);

  if (!isOpen) return null;

  const handleTextChange = (field: keyof BirthdayConfig, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleLetterBodyChange = (index: number, val: string) => {
    const newBody = [...formData.letterBody];
    newBody[index] = val;
    setFormData((prev) => ({ ...prev, letterBody: newBody }));
  };

  const handleAddLetterParagraph = () => {
    setFormData((prev) => ({
      ...prev,
      letterBody: [...prev.letterBody, 'Thêm lời chúc mới ngọt ngào...'],
    }));
  };

  const handleRemoveLetterParagraph = (index: number) => {
    if (formData.letterBody.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      letterBody: prev.letterBody.filter((_, i) => i !== index),
    }));
  };

  const handleLyricChange = (index: number, field: 'text' | 'subtext', val: string) => {
    const newLyrics = [...formData.lyrics];
    newLyrics[index] = { ...newLyrics[index], [field]: val };
    setFormData((prev) => ({ ...prev, lyrics: newLyrics }));
  };

  const handleLoginPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          handleTextChange('loginPhoto', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    soundEngine.playSuccessDing();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/40 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#FAF7F2] border border-purple-200 shadow-2xl overflow-hidden text-[#2E1537]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE0F0] bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#B8860B]" />
            <h3 className="text-lg font-bold text-[#2E1537] font-serif-elegant">
              Tùy Chỉnh Thông Tin Quà Sinh Nhật
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-[#7A5A82] hover:text-[#2E1537] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#EAE0F0] px-6 gap-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-all ${
              activeTab === 'general'
                ? 'border-purple-600 text-purple-900 font-bold'
                : 'border-transparent text-[#7A5A82] hover:text-purple-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Người nhận & Ngày sinh</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('letter')}
            className={`py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-all ${
              activeTab === 'letter'
                ? 'border-purple-600 text-purple-900 font-bold'
                : 'border-transparent text-[#7A5A82] hover:text-purple-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Thư & Lời chúc</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lyrics')}
            className={`py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-all ${
              activeTab === 'lyrics'
                ? 'border-purple-600 text-purple-900 font-bold'
                : 'border-transparent text-[#7A5A82] hover:text-purple-900'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Lời bài hát</span>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSaveSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5B3A62] mb-1">
                    Tên người nhận (ví dụ: Bé Bắp, Thúy An)
                  </label>
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => handleTextChange('recipientName', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-sm focus:border-purple-500 focus:outline-none shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5B3A62] mb-1">
                    Biệt danh ngọt ngào
                  </label>
                  <input
                    type="text"
                    value={formData.nickName}
                    onChange={(e) => handleTextChange('nickName', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-sm focus:border-purple-500 focus:outline-none shadow-sm"
                  />
                </div>
              </div>

              {/* Birth date for login */}
              <div>
                <label className="block text-xs font-semibold text-[#5B3A62] mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" />
                  <span>Ngày sinh nhật dùng để ĐĂNG NHẬP (YYYY-MM-DD)</span>
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleTextChange('birthDate', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-sm focus:border-purple-500 focus:outline-none shadow-sm"
                  required
                />
                <p className="text-[11px] text-[#7A5A82] mt-1 font-medium">
                  Định dạng: Năm-Tháng-Ngày (Ví dụ: 2004-10-15 sẽ đăng nhập bằng Ngày 15, Tháng 10, Năm 2004).
                </p>
              </div>

              {/* Login Photo */}
              <div>
                <label className="block text-xs font-semibold text-[#5B3A62] mb-1 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
                  <span>Ảnh đại diện trang đăng nhập</span>
                </label>
                <input
                  type="url"
                  value={formData.loginPhoto}
                  onChange={(e) => handleTextChange('loginPhoto', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-sm focus:border-purple-500 focus:outline-none shadow-sm"
                  placeholder="https://..."
                />

                <div className="mt-2 flex items-center gap-3">
                  <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-purple-50 text-xs text-purple-800 font-semibold cursor-pointer border border-[#E4D5EC] shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Chọn ảnh từ thiết bị</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLoginPhotoUpload}
                      className="hidden"
                    />
                  </label>

                  {formData.loginPhoto && (
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400 shadow-sm">
                      <img src={formData.loginPhoto} alt="Login Avatar Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Sender Name */}
              <div>
                <label className="block text-xs font-semibold text-[#5B3A62] mb-1 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-purple-600" />
                  <span>Tên người gửi / Lời ký tên</span>
                </label>
                <input
                  type="text"
                  value={formData.senderName}
                  onChange={(e) => handleTextChange('senderName', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-sm focus:border-purple-500 focus:outline-none shadow-sm"
                />
              </div>
            </div>
          )}

          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#5B3A62] mb-1">
                  Tiêu đề phong thư
                </label>
                <input
                  type="text"
                  value={formData.letterTitle}
                  onChange={(e) => handleTextChange('letterTitle', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-sm focus:border-purple-500 focus:outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5B3A62] mb-1">
                  Lời chào đầu thư
                </label>
                <input
                  type="text"
                  value={formData.letterSalutation}
                  onChange={(e) => handleTextChange('letterSalutation', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-sm focus:border-purple-500 focus:outline-none shadow-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#5B3A62]">
                    Nội dung thư chúc mừng (Từng đoạn văn)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddLetterParagraph}
                    className="text-xs text-purple-700 hover:text-purple-900 font-semibold cursor-pointer"
                  >
                    + Thêm đoạn văn
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.letterBody.map((paragraph, idx) => (
                    <div key={idx} className="flex gap-2">
                      <textarea
                        rows={3}
                        value={paragraph}
                        onChange={(e) => handleLetterBodyChange(idx, e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-sm focus:border-purple-500 focus:outline-none shadow-sm"
                      />
                      {formData.letterBody.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveLetterParagraph(idx)}
                          className="px-2 text-[#7A5A82] hover:text-red-500"
                          title="Xóa đoạn này"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5B3A62] mb-1">
                  Lời kết thư
                </label>
                <input
                  type="text"
                  value={formData.letterSignOff}
                  onChange={(e) => handleTextChange('letterSignOff', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-sm focus:border-purple-500 focus:outline-none shadow-sm"
                />
              </div>
            </div>
          )}

          {activeTab === 'lyrics' && (
            <div className="space-y-4">
              {/* Quick load presets from user's requested song list */}
              <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-2xl">
                <p className="text-xs font-bold text-purple-900 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Nạp nhanh danh sách 6 bài hát yêu thích:</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(DEFAULT_BIRTHDAY_DATA.playlist || []).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          songTitle: p.title,
                          songArtist: p.artist,
                          lyrics: p.lyrics,
                          selectedSongId: p.id,
                        }));
                      }}
                      className="px-2.5 py-1 text-[11px] rounded-lg bg-white border border-purple-200 text-purple-900 hover:bg-purple-600 hover:text-white transition-all cursor-pointer font-medium shadow-xs"
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#5B3A62] mb-1">
                    Tên bài hát
                  </label>
                  <input
                    type="text"
                    value={formData.songTitle}
                    onChange={(e) => handleTextChange('songTitle', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-sm focus:border-purple-500 focus:outline-none shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5B3A62] mb-1">
                    Nghệ sĩ / Thể loại
                  </label>
                  <input
                    type="text"
                    value={formData.songArtist}
                    onChange={(e) => handleTextChange('songArtist', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E4D5EC] rounded-xl text-[#2E1537] text-sm focus:border-purple-500 focus:outline-none shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5B3A62] mb-2">
                  Lời bài hát (Từng câu hát)
                </label>
                <div className="space-y-3">
                  {formData.lyrics.map((line, idx) => (
                    <div key={line.id} className="p-3 rounded-xl bg-white border border-[#E4D5EC] space-y-2 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-purple-700 font-bold">Câu {idx + 1}:</span>
                        <input
                          type="text"
                          value={line.text}
                          onChange={(e) => handleLyricChange(idx, 'text', e.target.value)}
                          className="flex-1 px-2.5 py-1.5 bg-[#FAF7F2] border border-[#E4D5EC] rounded-lg text-[#2E1537] text-xs sm:text-sm focus:border-purple-500 focus:outline-none font-medium"
                          placeholder="Câu hát chính..."
                        />
                      </div>
                      <input
                        type="text"
                        value={line.subtext || ''}
                        onChange={(e) => handleLyricChange(idx, 'subtext', e.target.value)}
                        className="w-full px-2.5 py-1 bg-[#FAF7F2] border border-[#E4D5EC] rounded-lg text-[#7A5A82] text-xs focus:border-purple-500 focus:outline-none"
                        placeholder="Dịch nghĩa hoặc lời phụ họa..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-[#EAE0F0] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onResetToDefault}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-[#7A5A82] hover:text-purple-900 transition-colors cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục mặc định</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-[#7A5A82] hover:text-[#2E1537] font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-[#C59B27] text-white font-medium text-xs sm:text-sm shadow-md shadow-purple-600/30 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Lưu thay đổi</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
