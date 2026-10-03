import React, { useState } from 'react';
import { CheckCircle2, Circle, Calendar, BookOpen, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRICULUM_DATA } from '../data/curriculumData';

export default function FatihKocaView({ fatihKocaProgress, onUpdateProgress, activeTheme }) {
  const [activeSubTab, setActiveSubTab] = useState('kuramlar'); // 'kuramlar' | 'aile' | 'takvim'
  const data = CURRICULUM_DATA.fatihKocaRehberlik;

  const kuramlarState = fatihKocaProgress?.kuramlar || {};
  const derslerState = fatihKocaProgress?.dersler || {};

  const toggleKuram = (id) => {
    const isDone = !kuramlarState[id];
    if (isDone) {
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      } catch (_) {}
    }
    onUpdateProgress({
      ...fatihKocaProgress,
      kuramlar: {
        ...kuramlarState,
        [id]: isDone
      }
    });
  };

  const toggleDers = (week) => {
    const isDone = !derslerState[week];
    onUpdateProgress({
      ...fatihKocaProgress,
      dersler: {
        ...derslerState,
        [week]: isDone
      }
    });
  };

  // Kuram Tamamlanma Sayısı
  const totalKuramlar = data.kuramlar.length;
  const completedKuramlar = data.kuramlar.filter((k) => kuramlarState[k.id]).length;
  const percentKuram = Math.round((completedKuramlar / totalKuramlar) * 100);

  return (
    <div className="p-4 space-y-4">
      {/* Başlık Kartı */}
      <div className={`p-4 rounded-3xl ${activeTheme.cardBg} border ${activeTheme.cardBorder} shadow-soft`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl flex-shrink-0">
            🧠
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 leading-tight">
              Fatih KOCA — Danışma Kuramları & Takvim
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Rehberlik ÖABT & Eğitim Bilimleri Özel Ders Takip Listesi
            </p>
          </div>
        </div>

        {/* İlerleme Barı */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
            <span>Kuramlar İlerlemesi:</span>
            <span className="text-purple-600 font-bold">{completedKuramlar} / {totalKuramlar} (%{percentKuram})</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${percentKuram}%` }}
            />
          </div>
        </div>
      </div>

      {/* Alt Sekmeler */}
      <div className="flex p-1 bg-slate-200/60 rounded-2xl gap-1">
        <button
          onClick={() => setActiveSubTab('kuramlar')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'kuramlar'
              ? 'bg-white text-slate-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          27 Terapi Kuramı
        </button>
        <button
          onClick={() => setActiveSubTab('aile')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'aile'
              ? 'bg-white text-slate-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Aile Danışmanlığı
        </button>
        <button
          onClick={() => setActiveSubTab('takvim')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'takvim'
              ? 'bg-white text-slate-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Ders Takvimi
        </button>
      </div>

      {/* 1. Danışma Kuramları Listesi (27 Kuram) */}
      {activeSubTab === 'kuramlar' && (
        <div className="space-y-2">
          {data.kuramlar.map((k, index) => {
            const isDone = Boolean(kuramlarState[k.id]);
            return (
              <div
                key={k.id}
                onClick={() => toggleKuram(k.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isDone
                    ? 'bg-emerald-50/50 border-emerald-200 shadow-xs'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span className="w-5 text-[11px] font-bold text-slate-400 text-center flex-shrink-0">
                    {index + 1}.
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${isDone ? 'text-slate-800 line-through opacity-70' : 'text-slate-800'}`}>
                      {k.name}
                    </p>
                    <p className="text-[11px] font-medium text-slate-500 truncate">
                      {k.author}
                    </p>
                  </div>
                </div>

                <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                  isDone ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Aile Danışmanlığı Kuramları */}
      {activeSubTab === 'aile' && (
        <div className="space-y-2">
          {data.aileKuramlari.map((ak, index) => {
            const isDone = Boolean(kuramlarState[ak.id]);
            return (
              <div
                key={ak.id}
                onClick={() => toggleKuram(ak.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isDone
                    ? 'bg-emerald-50/50 border-emerald-200 shadow-xs'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span className="w-5 text-[11px] font-bold text-slate-400 text-center flex-shrink-0">
                    {index + 1}.
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${isDone ? 'text-slate-800 line-through opacity-70' : 'text-slate-800'}`}>
                      {ak.name}
                    </p>
                    <p className="text-[11px] font-medium text-slate-500 truncate">
                      {ak.author}
                    </p>
                  </div>
                </div>

                <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                  isDone ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. 29 Haftalık Ders Takvimi (~83 Ders) */}
      {activeSubTab === 'takvim' && (
        <div className="space-y-2.5">
          {data.dersProgrami.map((item) => {
            const isDone = Boolean(derslerState[item.week]);
            return (
              <div
                key={item.week}
                onClick={() => toggleDers(item.week)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isDone
                    ? 'bg-purple-50/60 border-purple-200'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-600 mb-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.dateRange}</span>
                    <span className="text-slate-400 font-normal">({item.lessons} Ders)</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 truncate">
                    {item.title}
                  </h4>
                </div>

                <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                  isDone ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
