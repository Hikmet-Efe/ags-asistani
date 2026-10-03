import React, { useState } from 'react';
import { Sparkles, Calendar, Target, CheckCircle2, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { THEMES } from '../data/curriculumData';

export default function OnboardingModal({ isOpen, onComplete, initialProfile }) {
  if (!isOpen) return null;

  const [name, setName] = useState(initialProfile?.teacherName || '');
  const [examDate, setExamDate] = useState(initialProfile?.examDate || '2026-07-12');
  const [dailyTarget, setDailyTarget] = useState(initialProfile?.dailyTarget || 80);
  const [selectedTheme, setSelectedTheme] = useState(initialProfile?.theme || 'rose');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (_) {}

    onComplete({
      teacherName: name.trim(),
      branch: 'Sınıf Öğretmenliği',
      examDate,
      dailyTarget: Number(dailyTarget) || 80,
      theme: selectedTheme,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 p-6 text-white text-center relative">
          <div className="inline-flex p-3 bg-white/20 backdrop-blur-md rounded-2xl mb-3 shadow-inner">
            <Sparkles className="w-8 h-8 text-white animate-spin-slow" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Akademi Yolculuğun Başlıyor!</h2>
          <p className="text-rose-100 text-sm mt-1">
            Geleceğin Sınıf Öğretmeni için Kişiselleştirilmiş AGS & ÖABT Asistanı
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* İsim Girişi */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Öğretmenimizin Adı / Hitap ✨
            </label>
            <input
              type="text"
              required
              placeholder="Örn: Ayşe Öğretmenim"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all text-slate-800 font-medium placeholder-slate-400 text-base"
            />
          </div>

          {/* Sınav Tarihi */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rose-500" />
              Hedef MEB-AGS Sınav Tarihi
            </label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-slate-700 font-medium text-sm"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Ana ekranda sınav gününe kadar canlı geri sayım çalışacaktır.
            </p>
          </div>

          {/* Günlük Soru Hedefi */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-rose-500" />
                Günlük Soru Hedefi
              </label>
              <span className="text-sm font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                {dailyTarget} Soru
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="250"
              step="10"
              value={dailyTarget}
              onChange={(e) => setDailyTarget(e.target.value)}
              className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>20 Soru (Isınma)</span>
              <span>80 Soru (İdeal)</span>
              <span>250 Soru (Derece)</span>
            </div>
          </div>

          {/* Tema Seçimi */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Başlangıç Arayüz Teması
            </label>
            <div className="grid grid-cols-5 gap-2">
              {THEMES.map((theme) => {
                const isSelected = selectedTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-center ${
                      isSelected
                        ? 'border-rose-500 ring-2 ring-rose-300 bg-rose-50/50 shadow-sm scale-105'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <span className="text-xl mb-1">{theme.emoji}</span>
                    <span className="text-[10px] font-medium text-slate-700 leading-tight line-clamp-1">
                      {theme.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Başla Butonu */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-500/25 hover:from-rose-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Asistanı Başlat</span>
            <CheckCircle2 className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
