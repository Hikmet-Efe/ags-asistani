import React, { useState, useRef } from 'react';
import { X, Download, Upload, Trash2, Check, RefreshCw, Palette, User, Target, Calendar } from 'lucide-react';
import { THEMES } from '../data/curriculumData';
import { exportBackup, importBackup } from '../utils/storage';

export default function SettingsModal({
  isOpen,
  onClose,
  state,
  onUpdateProfile,
  onRestoreState,
  onResetState
}) {
  if (!isOpen) return null;

  const fileInputRef = useRef(null);
  const [name, setName] = useState(state.profile?.teacherName || '');
  const [examDate, setExamDate] = useState(state.profile?.examDate || '2026-07-12');
  const [dailyTarget, setDailyTarget] = useState(state.profile?.dailyTarget || 80);
  const [selectedTheme, setSelectedTheme] = useState(state.profile?.theme || 'rose');
  const [message, setMessage] = useState('');

  const isDark = selectedTheme === 'dark';

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateProfile({
      ...state.profile,
      teacherName: name,
      examDate,
      dailyTarget: Number(dailyTarget) || 80,
      theme: selectedTheme,
    });
    setMessage('Bilgiler başarıyla kaydedildi! ✨');
    setTimeout(() => setMessage(''), 2500);
  };

  const handleThemeClick = (themeId) => {
    setSelectedTheme(themeId);
    onUpdateProfile({
      ...state.profile,
      theme: themeId,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    importBackup(
      file,
      (importedData) => {
        onRestoreState(importedData);
        setMessage('Veriler başarıyla geri yüklendi! 🎉');
        setTimeout(() => setMessage(''), 3000);
      },
      (err) => {
        alert('Hata: ' + err);
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className={`w-full max-w-md rounded-3xl shadow-2xl border overflow-hidden max-h-[90vh] flex flex-col ${
        isDark ? 'bg-slate-900 border-indigo-500/40 text-slate-100' : 'bg-white border-slate-100 text-slate-700'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold text-rose-500 dark:text-rose-400 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Kişiselleştirme & Ayarlar
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* İçerik */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {message && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-xl text-center animate-fadeIn">
              {message}
            </div>
          )}

          {/* 1. Tema Seçimi */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Arayüz Teması Değiştir
            </label>
            <div className="grid grid-cols-5 gap-2">
              {THEMES.map((th) => {
                const isSelected = selectedTheme === th.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => handleThemeClick(th.id)}
                    className={`p-2 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'border-rose-500 ring-2 ring-rose-400 bg-rose-50 dark:bg-slate-800 shadow-xs scale-105'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{th.emoji}</span>
                    <span className="text-[10px] font-semibold block truncate text-slate-700 dark:text-slate-300">
                      {th.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Profil & Hedefler Formu */}
          <form onSubmit={handleSaveProfile} className="space-y-3.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Öğretmen & Sınav Bilgileri
            </label>

            <div>
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Öğretmen Adı:</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[11px] font-medium text-slate-400 block mb-1">Sınav Tarihi:</span>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className={`w-full px-2.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
                  }`}
                />
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-400 block mb-1">Günlük Soru Hedefi:</span>
                <input
                  type="number"
                  min="10"
                  max="300"
                  value={dailyTarget}
                  onChange={(e) => setDailyTarget(e.target.value)}
                  className={`w-full px-2.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all shadow-xs active:scale-95"
            >
              Bilgileri Güncelle
            </button>
          </form>

          {/* 3. Veri Yedekleme & Geri Yükleme */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Çevrimdışı Veri Güvenliği
            </label>
            <p className="text-[11px] text-slate-400 leading-tight">
              Tüm verileriniz telefonunuzda saklanır. Başka bir telefona aktarmak için tek tıkla yedeğinizi indirebilirsiniz.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => exportBackup(state)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  isDark
                    ? 'bg-rose-950/80 border-rose-800 text-rose-300 hover:bg-rose-900'
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Yedek İndir (JSON)</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Yedeği Yükle</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* 4. Sıfırlama */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Tüm çalışma verileriniz ve ilerlemeniz sıfırlanacaktır. Emin misiniz?')) {
                  onResetState();
                  onClose();
                }
              }}
              className="text-[11px] text-red-400 hover:text-red-600 font-semibold flex items-center gap-1 mx-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Tüm İlerlemeyi Sıfırla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
