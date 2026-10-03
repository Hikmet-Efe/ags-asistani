import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, BookOpen, Sparkles, Sliders, Check, Clock, CalendarDays, History } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PomodoroTimer({
  activeTheme,
  dailyActivity = {},
  pomodoroSettings = { workMinutes: 25, breakMinutes: 5 },
  onUpdatePomodoroSettings,
  onSessionComplete
}) {
  const [mode, setMode] = useState('work'); // 'work' | 'break'
  const [workMinutes, setWorkMinutes] = useState(pomodoroSettings?.workMinutes || 25);
  const [breakMinutes, setBreakMinutes] = useState(pomodoroSettings?.breakMinutes || 5);
  const [timeLeft, setTimeLeft] = useState((pomodoroSettings?.workMinutes || 25) * 60);
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Web Audio API ile tatlı bitiş sesi
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (_) {}
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(interval);
      playBeep();
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      } catch (_) {}

      if (mode === 'work') {
        if (onSessionComplete) onSessionComplete(workMinutes);
        setMode('break');
        setTimeLeft(breakMinutes * 60);
      } else {
        setMode('work');
        setTimeLeft(workMinutes * 60);
      }
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, workMinutes, breakMinutes]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft((mode === 'work' ? workMinutes : breakMinutes) * 60);
  };

  const handleSaveDurations = (newWork, newBreak) => {
    setWorkMinutes(newWork);
    setBreakMinutes(newBreak);
    setTimeLeft(newWork * 60);
    setMode('work');
    setIsActive(false);
    if (onUpdatePomodoroSettings) {
      onUpdatePomodoroSettings({ workMinutes: newWork, breakMinutes: newBreak });
    }
  };

  // Zaman İstatistikleri Hesaplama (Bugün, Hafta, Ay, Tüm Zamanlar)
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  let todayMinutes = 0;
  let weekMinutes = 0;
  let monthMinutes = 0;
  let totalMinutes = 0;

  const msInDay = 24 * 60 * 60 * 1000;
  const nowMs = now.getTime();

  Object.entries(dailyActivity).forEach(([dateStr, data]) => {
    const mins = Number(data?.pomodoroMinutes) || 0;
    if (mins <= 0) return;

    totalMinutes += mins;

    if (dateStr === todayStr) {
      todayMinutes += mins;
    }

    const activityDateMs = new Date(dateStr).getTime();
    const diffDays = Math.floor((nowMs - activityDateMs) / msInDay);

    if (diffDays >= 0 && diffDays < 7) {
      weekMinutes += mins;
    }
    if (diffDays >= 0 && diffDays < 30) {
      monthMinutes += mins;
    }
  });

  const formatHoursMins = (totalMins) => {
    if (totalMins < 60) return `${totalMins} dk`;
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    return m > 0 ? `${h} sa ${m} dk` : `${h} saat`;
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const totalDuration = (mode === 'work' ? workMinutes : breakMinutes) * 60;
  const progressPercent = Math.round(((totalDuration - timeLeft) / totalDuration) * 100);

  const isDark = activeTheme.id === 'dark';

  return (
    <div className="p-4 space-y-4 max-w-sm mx-auto animate-fadeIn">
      {/* 1. Timer Ana Kartı */}
      <div className={`p-6 rounded-3xl ${activeTheme.cardBg} border-2 ${activeTheme.cardBorder} shadow-soft text-center transition-all relative overflow-hidden ${
        isDark ? 'box-glow-indigo' : ''
      }`}>
        {/* Mod Başlığı & Ayarlar Butonu */}
        <div className="flex items-center justify-between mb-2">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${
            mode === 'work'
              ? isDark
                ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
              : isDark
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}>
            {mode === 'work' ? (
              <>
                <BookOpen className="w-3.5 h-3.5 text-rose-500" />
                <span>Odaklanma Zamanı</span>
              </>
            ) : (
              <>
                <Coffee className="w-3.5 h-3.5 text-emerald-500" />
                <span>Dinlenme / Mola</span>
              </>
            )}
          </div>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
              showSettings
                ? 'bg-rose-500 text-white shadow-xs'
                : isDark
                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title="Süreleri Manuel Ayarla"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="text-[11px]">Süre Ayarla</span>
          </button>
        </div>

        {/* Manuel Süre Ayar Paneli */}
        {showSettings && (
          <div className={`my-3 p-3.5 rounded-2xl border text-left space-y-3 transition-all animate-fadeIn ${
            isDark ? 'bg-slate-950 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-rose-500">
                Özel Süre Belirle
              </span>
              <button
                onClick={() => setShowSettings(false)}
                className="text-[11px] font-bold text-slate-400 hover:text-slate-600"
              >
                Kapat ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-bold block mb-1 text-slate-600 dark:text-slate-300">
                  Ders Süresi (dk):
                </label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleSaveDurations(Math.max(5, workMinutes - 5), breakMinutes)}
                    className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 font-bold text-sm flex items-center justify-center active:scale-95 text-slate-700 dark:text-slate-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={workMinutes}
                    onChange={(e) => handleSaveDurations(Math.max(1, parseInt(e.target.value) || 25), breakMinutes)}
                    className="w-full text-center py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-extrabold text-xs text-slate-800 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveDurations(workMinutes + 5, breakMinutes)}
                    className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 font-bold text-sm flex items-center justify-center active:scale-95 text-slate-700 dark:text-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold block mb-1 text-slate-600 dark:text-slate-300">
                  Mola Süresi (dk):
                </label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleSaveDurations(workMinutes, Math.max(1, breakMinutes - 1))}
                    className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 font-bold text-sm flex items-center justify-center active:scale-95 text-slate-700 dark:text-slate-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={breakMinutes}
                    onChange={(e) => handleSaveDurations(workMinutes, Math.max(1, parseInt(e.target.value) || 5))}
                    className="w-full text-center py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-extrabold text-xs text-slate-800 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveDurations(workMinutes, breakMinutes + 1)}
                    className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 font-bold text-sm flex items-center justify-center active:scale-95 text-slate-700 dark:text-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Hızlı Şablonlar */}
            <div className="pt-1">
              <span className="text-[10px] font-semibold text-slate-400 block mb-1">
                Hazır Şablonlar:
              </span>
              <div className="grid grid-cols-3 gap-1 text-[11px] font-bold">
                {[
                  { w: 25, b: 5, label: '25/5 Standart' },
                  { w: 40, b: 10, label: '40/10 İdeal' },
                  { w: 50, b: 10, label: '50/10 Derin' }
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleSaveDurations(item.w, item.b)}
                    className={`py-1 px-1 rounded-lg border transition-all text-center ${
                      workMinutes === item.w && breakMinutes === item.b
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dijital Sayaç - Dark Modda Parlayan Tipografi */}
        <div className="relative my-4 flex items-center justify-center">
          <div className={`w-52 h-52 rounded-full border-8 flex flex-col items-center justify-center relative transition-all ${
            isDark
              ? 'border-slate-800 bg-slate-950/80 shadow-[0_0_25px_rgba(99,102,241,0.25)]'
              : 'border-slate-100 bg-white shadow-inner'
          }`}>
            <span className={`text-5xl font-black tracking-tight font-mono ${
              isDark
                ? 'text-white text-glow-indigo'
                : 'text-slate-800'
            }`}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className={`text-[11px] font-bold mt-1 uppercase tracking-wider ${
              isDark ? 'text-indigo-300' : 'text-slate-400'
            }`}>
              {mode === 'work' ? `${workMinutes} dk Çalışma` : `${breakMinutes} dk Mola`}
            </span>
          </div>
        </div>

        {/* Kontrol Butonları */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={resetTimer}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center active:scale-90 transition-all ${
              isDark
                ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title="Sıfırla"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTimer}
            className={`px-8 py-3.5 rounded-2xl font-black text-base flex items-center gap-2 text-white shadow-lg active:scale-95 transition-all ${
              isActive
                ? 'bg-amber-500 shadow-amber-500/25 hover:bg-amber-600'
                : 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/25'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Duraklat</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Başlat</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. ÇALIŞMA SÜRESİ GÖSTERGESİ (Bugün, Hafta, Ay, Tüm Zamanlar) */}
      <div className={`p-4 rounded-3xl ${activeTheme.cardBg} border-2 ${activeTheme.cardBorder} shadow-soft space-y-3 ${
        isDark ? 'box-glow-indigo text-white' : 'text-slate-800'
      }`}>
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <h4 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-rose-500 dark:text-rose-400">
            <Clock className="w-4 h-4" />
            <span>Çalışma Süresi Analizi</span>
          </h4>
          <span className="text-[10px] font-bold text-slate-400">
            Odaklanma Süreleri
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Bugün */}
          <div className={`p-3 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200/80'
          }`}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              📅 Bugün
            </span>
            <p className={`text-base font-black ${isDark ? 'text-white text-glow-pink' : 'text-slate-800'}`}>
              {formatHoursMins(todayMinutes)}
            </p>
          </div>

          {/* Bu Hafta */}
          <div className={`p-3 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200/80'
          }`}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              📆 Son 7 Gün
            </span>
            <p className={`text-base font-black ${isDark ? 'text-white text-glow-indigo' : 'text-slate-800'}`}>
              {formatHoursMins(weekMinutes)}
            </p>
          </div>

          {/* Bu Ay */}
          <div className={`p-3 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200/80'
          }`}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              🗓️ Son 30 Gün
            </span>
            <p className={`text-base font-black ${isDark ? 'text-white text-glow-indigo' : 'text-slate-800'}`}>
              {formatHoursMins(monthMinutes)}
            </p>
          </div>

          {/* Tüm Zamanlar */}
          <div className={`p-3 rounded-2xl border transition-all ${
            isDark
              ? 'bg-indigo-950/50 border-indigo-800/80'
              : 'bg-rose-50/70 border-rose-200'
          }`}>
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block mb-0.5">
              🏆 Toplam Süre
            </span>
            <p className={`text-base font-black ${isDark ? 'text-indigo-300 text-glow-indigo' : 'text-rose-700'}`}>
              {formatHoursMins(totalMinutes)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
