import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, PlayCircle, Circle, Star, MessageSquare, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TopicCard({
  topicTitle,
  topicKey,
  progress = {},
  onUpdateProgress,
  activeTheme
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(Boolean(progress.note));

  const status = progress.status || 'none';
  const solved = progress.solved || 0;
  const correct = progress.correct || 0;
  const wrong = progress.wrong || 0;
  const stars = progress.stars || 0;
  const note = progress.note || '';

  const isDark = activeTheme.id === 'dark';

  // Net = Doğru - (Yanlış / 4)
  const net = (correct - wrong / 4).toFixed(1);

  const handleStatusChange = (newStatus) => {
    if (newStatus === 'completed' && status !== 'completed') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (_) {}
    }
    onUpdateProgress(topicKey, { ...progress, status: newStatus });
  };

  const handleQuickAddQuestions = (amount) => {
    const newSolved = solved + amount;
    const newCorrect = correct + amount;
    onUpdateProgress(topicKey, {
      ...progress,
      solved: newSolved,
      correct: newCorrect,
      status: progress.status === 'none' ? 'in_progress' : progress.status
    });
  };

  const handleStarClick = (rating) => {
    onUpdateProgress(topicKey, { ...progress, stars: rating === stars ? 0 : rating });
  };

  // Kart sol çizgi ve arka plan rengi (Dark mod uyumlu)
  const getStatusStyles = () => {
    if (isDark) {
      switch (status) {
        case 'completed':
          return 'bg-emerald-950/40 border-emerald-700/80 ring-1 ring-emerald-600/50 text-white shadow-[0_0_12px_rgba(16,185,129,0.15)]';
        case 'in_progress':
          return 'bg-amber-950/40 border-amber-700/80 ring-1 ring-amber-600/50 text-white shadow-[0_0_12px_rgba(245,158,11,0.15)]';
        case 'review':
          return 'bg-purple-950/40 border-purple-700/80 ring-1 ring-purple-600/50 text-white shadow-[0_0_12px_rgba(168,85,247,0.15)]';
        default:
          return 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-100 shadow-xs';
      }
    }

    switch (status) {
      case 'completed':
        return 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-200 text-slate-800';
      case 'in_progress':
        return 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-200 text-slate-800';
      case 'review':
        return 'bg-purple-50/40 border-purple-300 ring-1 ring-purple-200 text-slate-800';
      default:
        return 'bg-white border-slate-200 hover:border-slate-300 text-slate-800';
    }
  };

  return (
    <div className={`rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-sm overflow-hidden ${getStatusStyles()}`}>
      {/* Üst Kısım: Belirgin Başlık Kutusu */}
      <div className="p-3.5 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Konu Başlığı - Dark Modda Parlayan Beyaz Yazı */}
          <h4 className={`text-sm font-black leading-snug break-words ${
            isDark ? 'text-white text-glow-indigo' : 'text-slate-800'
          }`}>
            {topicTitle}
          </h4>

          {/* Konu Alt Rozetleri */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {/* Soru Rozeti */}
            <span className={`text-[11px] px-2 py-0.5 rounded-lg font-bold flex items-center gap-1 ${
              solved > 0
                ? isDark
                  ? 'bg-slate-800 text-slate-100 border border-slate-700'
                  : 'bg-slate-100 text-slate-800 border border-slate-200'
                : isDark
                  ? 'bg-slate-900 text-slate-500'
                  : 'bg-slate-50 text-slate-400'
            }`}>
              🎯 {solved} Soru {correct > 0 ? `(${net} Net)` : ''}
            </span>

            {/* Durum Rozeti Metni */}
            {status === 'completed' && (
              <span className={`text-[10px] px-2 py-0.5 rounded-lg font-extrabold flex items-center gap-1 ${
                isDark ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                ✓ Tamamlandı
              </span>
            )}
            {status === 'in_progress' && (
              <span className={`text-[10px] px-2 py-0.5 rounded-lg font-extrabold flex items-center gap-1 ${
                isDark ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-amber-100 text-amber-800'
              }`}>
                ⏳ Çalışılıyor
              </span>
            )}
            {status === 'review' && (
              <span className={`text-[10px] px-2 py-0.5 rounded-lg font-extrabold flex items-center gap-1 ${
                isDark ? 'bg-purple-950 text-purple-300 border border-purple-800' : 'bg-purple-100 text-purple-800'
              }`}>
                🔁 Tekrar Edilmeli
              </span>
            )}

            {/* Yıldız Özeti */}
            {stars > 0 && (
              <span className={`text-[11px] px-1.5 py-0.5 rounded-lg font-bold flex items-center gap-0.5 border ${
                isDark ? 'bg-amber-950/80 border-amber-800 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-600'
              }`}>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {stars}/5
              </span>
            )}

            {/* Not Rozeti */}
            {note && (
              <span className={`text-[11px] px-1.5 py-0.5 rounded-lg font-bold flex items-center gap-0.5 border ${
                isDark ? 'bg-blue-950/80 border-blue-800 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                <MessageSquare className="w-3 h-3" />
                Not Var
              </span>
            )}
          </div>
        </div>

        {/* Hızlı Butonlar */}
        <div className="flex items-center gap-1.5 flex-shrink-0 pt-0.5">
          {/* Tamamlandı Hızlı Tık */}
          <button
            onClick={() => handleStatusChange(status === 'completed' ? 'none' : 'completed')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              status === 'completed'
                ? 'bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-300'
                : isDark
                  ? 'bg-slate-800 text-slate-400 hover:text-emerald-400 hover:bg-slate-700 border border-slate-700'
                  : 'bg-slate-100 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
            }`}
            title={status === 'completed' ? 'Tamamlandı' : 'Tamamlandı Olarak İşaretle'}
          >
            <CheckCircle2 className="w-5 h-5" />
          </button>

          {/* Aç/Kapat Butonu */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
            title="Soru ve Not Detayları"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Genişletilmiş Alan: Ayrıntılı Kontroller */}
      {isExpanded && (
        <div className={`px-3.5 pb-3.5 pt-2 border-t space-y-3 ${
          isDark
            ? 'border-slate-800 bg-slate-950/90 text-slate-100'
            : 'border-slate-100/90 bg-white/80 text-slate-800'
        }`}>
          {/* Durum Seçimi 4 Buton */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Çalışma Durumunu Ayarla
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => handleStatusChange('none')}
                className={`py-1.5 px-1 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 border transition-all ${
                  status === 'none'
                    ? isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-slate-700 text-white border-slate-700'
                    : isDark ? 'bg-slate-900 text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                <Circle className="w-2.5 h-2.5" />
                <span>Sıfır</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange('in_progress')}
                className={`py-1.5 px-1 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 border transition-all ${
                  status === 'in_progress'
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : isDark ? 'bg-amber-950/40 text-amber-300 border-amber-800' : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
              >
                <PlayCircle className="w-2.5 h-2.5" />
                <span>Çalışılıyor</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange('completed')}
                className={`py-1.5 px-1 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 border transition-all ${
                  status === 'completed'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : isDark ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                <CheckCircle2 className="w-2.5 h-2.5" />
                <span>Bitti</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange('review')}
                className={`py-1.5 px-1 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 border transition-all ${
                  status === 'review'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : isDark ? 'bg-purple-950/40 text-purple-300 border-purple-800' : 'bg-purple-50 text-purple-700 border-purple-200'
                }`}
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Tekrar</span>
              </button>
            </div>
          </div>

          {/* Soru Takibi & Hızlı Ekle (+5, +10, +25) */}
          <div className={`p-2.5 rounded-xl border ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50/80 border-slate-200/80 text-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Soru Sayısı & Net
              </span>
              <span className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-700'}`}>
                Toplam: <span className="text-rose-500 font-extrabold">{solved}</span> | Net: <span className="text-emerald-500 font-extrabold">{net}</span>
              </span>
            </div>

            {/* Hızlı Ekle Butonları */}
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className="text-[11px] text-slate-400 font-semibold">Hızlı Ekle:</span>
              {[5, 10, 20].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleQuickAddQuestions(amt)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-xs border transition-all active:scale-95 flex items-center gap-0.5 shadow-xs ${
                    isDark
                      ? 'bg-slate-800 hover:bg-rose-950 text-slate-200 hover:text-rose-300 border-slate-700'
                      : 'bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 border-slate-200'
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  {amt}
                </button>
              ))}
            </div>

            {/* Doğru ve Yanlış Girişi */}
            <div className="grid grid-cols-2 gap-2">
              <div className={`flex items-center gap-1.5 p-1.5 rounded-xl border ${
                isDark ? 'bg-emerald-950/50 border-emerald-800 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}>
                <span className="text-[11px] font-bold">Doğru:</span>
                <input
                  type="number"
                  min="0"
                  value={correct || ''}
                  onChange={(e) => {
                    const val = Math.max(0, parseInt(e.target.value) || 0);
                    onUpdateProgress(topicKey, { ...progress, correct: val, solved: val + wrong });
                  }}
                  className={`w-full px-2 py-1 rounded-lg border text-xs font-extrabold text-center focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border-emerald-700 text-emerald-300'
                      : 'bg-white border-emerald-300 text-emerald-800'
                  }`}
                  placeholder="0"
                />
              </div>

              <div className={`flex items-center gap-1.5 p-1.5 rounded-xl border ${
                isDark ? 'bg-rose-950/50 border-rose-800 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}>
                <span className="text-[11px] font-bold">Yanlış:</span>
                <input
                  type="number"
                  min="0"
                  value={wrong || ''}
                  onChange={(e) => {
                    const val = Math.max(0, parseInt(e.target.value) || 0);
                    onUpdateProgress(topicKey, { ...progress, wrong: val, solved: correct + val });
                  }}
                  className={`w-full px-2 py-1 rounded-lg border text-xs font-extrabold text-center focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border-rose-700 text-rose-300'
                      : 'bg-white border-rose-300 text-rose-800'
                  }`}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Konu Hakimiyet Derecesi (Yıldızlar) */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Konu Hakimiyeti
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((starVal) => (
                <button
                  key={starVal}
                  type="button"
                  onClick={() => handleStarClick(starVal)}
                  className="p-1 hover:scale-110 active:scale-95 transition-transform"
                >
                  <Star
                    className={`w-4 h-4 ${
                      starVal <= stars
                        ? 'fill-amber-400 text-amber-400'
                        : isDark ? 'text-slate-700' : 'text-slate-300 hover:text-amber-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Not Ekleme Alanı */}
          <div className="pt-1">
            {!showNoteInput ? (
              <button
                type="button"
                onClick={() => setShowNoteInput(true)}
                className="text-xs text-rose-500 hover:text-rose-400 font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Önemli Soru / Ders Notu Ekle
              </button>
            ) : (
              <div>
                <textarea
                  rows="2"
                  value={note}
                  onChange={(e) => onUpdateProgress(topicKey, { ...progress, note: e.target.value })}
                  placeholder="Püf noktalar, karıştırılan kavramlar, soru ipuçları..."
                  className={`w-full text-xs p-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none font-medium ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-slate-50 border-slate-200 text-slate-700 placeholder-slate-400'
                  }`}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
