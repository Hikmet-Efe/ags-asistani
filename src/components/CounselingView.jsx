import React, { useState } from 'react';
import { CheckCircle2, Circle, Calendar, BookOpen, Plus, Trash2, RotateCcw, X, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRICULUM_DATA } from '../data/curriculumData';

export default function CounselingView({
  counselingProgress,
  customSchedule,
  onUpdateCounselingProgress,
  onUpdateCustomSchedule,
  activeTheme
}) {
  const [activeSubTab, setActiveSubTab] = useState('kuramlar'); // 'kuramlar' | 'aile' | 'takvim'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDateRange, setNewDateRange] = useState('');
  const [newLessons, setNewLessons] = useState(1);

  const isDark = activeTheme.id === 'dark';
  const data = CURRICULUM_DATA.counselingAndSchedule;
  const kuramlarState = counselingProgress?.kuramlar || {};
  const derslerState = counselingProgress?.dersler || {};

  // Aktif Program (Özelleştirilmiş veya Varsayılan)
  const scheduleList = customSchedule || data.dersProgrami;

  const toggleKuram = (id) => {
    const isDone = !kuramlarState[id];
    if (isDone) {
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      } catch (_) {}
    }
    onUpdateCounselingProgress({
      ...counselingProgress,
      kuramlar: {
        ...kuramlarState,
        [id]: isDone
      }
    });
  };

  const toggleDers = (planId) => {
    const isDone = !derslerState[planId];
    if (isDone) {
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      } catch (_) {}
    }
    onUpdateCounselingProgress({
      ...counselingProgress,
      dersler: {
        ...derslerState,
        [planId]: isDone
      }
    });
  };

  const handleAddNewPlan = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem = {
      id: `custom_${Date.now()}`,
      title: newTitle.trim(),
      dateRange: newDateRange.trim() || 'Tarih Belirlenmedi',
      lessons: Number(newLessons) || 1
    };

    onUpdateCustomSchedule([...scheduleList, newItem]);
    setNewTitle('');
    setNewDateRange('');
    setNewLessons(1);
    setIsAddModalOpen(false);
  };

  const handleDeletePlan = (planId, e) => {
    e.stopPropagation();
    if (window.confirm('Bu planı takvimden silmek istediğinize emin misiniz?')) {
      const updated = scheduleList.filter((item) => item.id !== planId);
      onUpdateCustomSchedule(updated);
    }
  };

  const handleResetSchedule = () => {
    if (window.confirm('Takvim varsayılan haline döndürülecektir. Onaylıyor musunuz?')) {
      onUpdateCustomSchedule(null);
    }
  };

  const totalKuramlar = data.kuramlar.length;
  const completedKuramlar = data.kuramlar.filter((k) => kuramlarState[k.id]).length;
  const percentKuram = Math.round((completedKuramlar / totalKuramlar) * 100);

  const totalPlans = scheduleList.length;
  const completedPlans = scheduleList.filter((item) => derslerState[item.id]).length;
  const percentPlan = totalPlans > 0 ? Math.round((completedPlans / totalPlans) * 100) : 0;

  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      {/* Başlık Kartı */}
      <div className={`p-4 rounded-3xl ${activeTheme.cardBg} border-2 ${activeTheme.cardBorder} shadow-soft ${
        isDark ? 'box-glow-indigo text-white' : 'text-slate-800'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${
            isDark ? 'bg-purple-950 border border-purple-800 text-purple-300' : 'bg-purple-100 text-purple-700'
          }`}>
            🧠
          </div>
          <div>
            <h2 className={`text-sm font-black leading-tight ${isDark ? 'text-white text-glow-indigo' : 'text-slate-800'}`}>
              Psikolojik Danışma Kuramları & Çalışma Takvimi
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Rehberlik & Eğitim Bilimleri Odaklı Kuram ve Takvim Takibi
            </p>
          </div>
        </div>

        {/* İlerleme Barı */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
            <span>{activeSubTab === 'takvim' ? 'Takvim İlerlemesi:' : 'Kuramlar İlerlemesi:'}</span>
            <span className="text-purple-400 font-extrabold">
              {activeSubTab === 'takvim'
                ? `${completedPlans} / ${totalPlans} (%${percentPlan})`
                : `${completedKuramlar} / ${totalKuramlar} (%${percentKuram})`}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${activeSubTab === 'takvim' ? percentPlan : percentKuram}%` }}
            />
          </div>
        </div>
      </div>

      {/* Alt Sekmeler */}
      <div className={`flex p-1 rounded-2xl gap-1 ${
        isDark ? 'bg-slate-900 border border-slate-800' : 'bg-slate-200/60'
      }`}>
        <button
          onClick={() => setActiveSubTab('kuramlar')}
          className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'kuramlar'
              ? isDark
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-white text-slate-800 shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          27 Terapi Kuramı
        </button>
        <button
          onClick={() => setActiveSubTab('aile')}
          className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'aile'
              ? isDark
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-white text-slate-800 shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Aile Danışmanlığı
        </button>
        <button
          onClick={() => setActiveSubTab('takvim')}
          className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'takvim'
              ? isDark
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-white text-slate-800 shadow-xs'
              : 'text-slate-400 hover:text-white'
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
                    ? isDark
                      ? 'bg-emerald-950/40 border-emerald-800 text-white shadow-xs'
                      : 'bg-emerald-50/50 border-emerald-200 shadow-xs'
                    : isDark
                      ? 'bg-slate-900/90 border-slate-800 text-white hover:border-slate-700'
                      : 'bg-white border-slate-200/80 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span className="w-5 text-[11px] font-bold text-slate-400 text-center flex-shrink-0">
                    {index + 1}.
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${
                      isDone
                        ? 'line-through text-slate-400'
                        : isDark ? 'text-white text-glow-indigo' : 'text-slate-800'
                    }`}>
                      {k.name}
                    </p>
                    <p className="text-[11px] font-medium text-slate-400 truncate">
                      {k.author}
                    </p>
                  </div>
                </div>

                <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                  isDone ? 'bg-emerald-500 text-white' : isDark ? 'bg-slate-800 text-slate-600' : 'bg-slate-100 text-slate-400'
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
                    ? isDark
                      ? 'bg-emerald-950/40 border-emerald-800 text-white shadow-xs'
                      : 'bg-emerald-50/50 border-emerald-200 shadow-xs'
                    : isDark
                      ? 'bg-slate-900/90 border-slate-800 text-white hover:border-slate-700'
                      : 'bg-white border-slate-200/80 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span className="w-5 text-[11px] font-bold text-slate-400 text-center flex-shrink-0">
                    {index + 1}.
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${
                      isDone
                        ? 'line-through text-slate-400'
                        : isDark ? 'text-white text-glow-indigo' : 'text-slate-800'
                    }`}>
                      {ak.name}
                    </p>
                    <p className="text-[11px] font-medium text-slate-400 truncate">
                      {ak.author}
                    </p>
                  </div>
                </div>

                <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                  isDone ? 'bg-emerald-500 text-white' : isDark ? 'bg-slate-800 text-slate-600' : 'bg-slate-100 text-slate-400'
                }`}>
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Özelleştirilebilir Ders Takvimi */}
      {activeSubTab === 'takvim' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yeni Hafta / Plan Ekle</span>
            </button>

            {customSchedule && (
              <button
                onClick={handleResetSchedule}
                className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title="Varsayılan Programa Dön"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Sıfırla</span>
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {scheduleList.map((item, idx) => {
              const isDone = Boolean(derslerState[item.id]);
              return (
                <div
                  key={item.id || idx}
                  onClick={() => toggleDers(item.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isDone
                      ? isDark
                        ? 'bg-purple-950/40 border-purple-800/80 shadow-xs'
                        : 'bg-purple-50/60 border-purple-200 shadow-xs'
                      : isDark
                        ? 'bg-slate-900/90 border-slate-800 text-white hover:border-slate-700'
                        : 'bg-white border-slate-200/80 shadow-xs hover:border-slate-300'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-400 mb-0.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.dateRange}</span>
                      <span className="text-slate-400 font-normal">({item.lessons} Ders)</span>
                    </div>
                    <h4 className={`text-xs font-bold truncate ${
                      isDone
                        ? 'line-through text-slate-500'
                        : isDark ? 'text-white text-glow-indigo' : 'text-slate-800'
                    }`}>
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                      isDone ? 'bg-purple-600 text-white' : isDark ? 'bg-slate-800 text-slate-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                    </div>

                    <button
                      onClick={(e) => handleDeletePlan(item.id, e)}
                      className="w-6 h-6 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors"
                      title="Planı Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Yeni Plan Ekleme Modalı */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className={`w-full max-w-sm rounded-3xl p-5 border shadow-2xl space-y-4 ${
            isDark ? 'bg-slate-900 border-indigo-500/40 text-slate-100' : 'bg-white border-slate-100 text-slate-800'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-rose-500 dark:text-rose-400 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-purple-400" />
                Takvime Yeni Plan Ekle
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNewPlan} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  Plan / Ders Başlığı:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 15. Hafta - Deneme Çözümü & Analiz"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Tarih Aralığı:
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: 15 - 22 Mayıs"
                    value={newDateRange}
                    onChange={(e) => setNewDateRange(e.target.value)}
                    className={`w-full px-2.5 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Ders / Saat:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newLessons}
                    onChange={(e) => setNewLessons(e.target.value)}
                    className={`w-full px-2.5 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/20 active:scale-95 transition-all mt-2"
              >
                <Check className="w-4 h-4" />
                <span>Takvime Kaydet</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
