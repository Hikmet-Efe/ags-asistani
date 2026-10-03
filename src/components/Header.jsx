import React, { useState, useEffect } from 'react';
import { Flame, Clock, Palette, Sparkles, Award, ChevronRight, X } from 'lucide-react';
import { MOTIVATIONAL_QUOTES, ACHIEVEMENTS, getTeacherTitle, CURRICULUM_DATA } from '../data/curriculumData';

export default function Header({
  profile,
  topicsProgress = {},
  dailyActivity = {},
  onOpenSettings,
  activeTheme
}) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [showTitleModal, setShowTitleModal] = useState(false);

  const isDark = activeTheme.id === 'dark';

  useEffect(() => {
    const randomQuote = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setQuoteIndex(randomQuote);

    if (profile?.examDate) {
      const target = new Date(profile.examDate).getTime();
      const now = new Date().getTime();
      const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
      setDaysLeft(diff > 0 ? diff : 0);
    }
  }, [profile?.examDate]);

  // Başarım ve Ünvan Hesaplama
  let totalSolved = 0;
  let completedTopics = 0;
  let totalTopics = 0;
  let totalMinutes = 0;

  const allCategories = [
    ...CURRICULUM_DATA.ags.categories,
    ...CURRICULUM_DATA.oabt.categories
  ];

  allCategories.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      sub.topics.forEach((_, idx) => {
        totalTopics++;
        const key = `${cat.id}_${sub.id}_${idx}`;
        const p = topicsProgress[key] || {};
        if (p.status === 'completed') completedTopics++;
        if (p.solved) totalSolved += p.solved;
      });
    });
  });

  Object.values(dailyActivity).forEach((d) => {
    if (d?.pomodoroMinutes) totalMinutes += d.pomodoroMinutes;
  });

  const overallPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const pomodoroSessions = Math.floor(totalMinutes / 25);
  const streak = profile?.streak || 1;

  // Açılan başarım sayısı
  const unlockedBadges = ACHIEVEMENTS.filter((ach) => {
    if (ach.type === 'questions') return totalSolved >= ach.target;
    if (ach.type === 'topics') return completedTopics >= ach.target;
    if (ach.type === 'percent') return overallPercent >= ach.target;
    if (ach.type === 'pomodoro') return pomodoroSessions >= ach.target;
    if (ach.type === 'minutes') return totalMinutes >= ach.target;
    if (ach.type === 'streak') return streak >= ach.target;
    return false;
  });

  const badgeCount = unlockedBadges.length;
  const titleInfo = getTeacherTitle(badgeCount);
  const quote = MOTIVATIONAL_QUOTES[quoteIndex] || MOTIVATIONAL_QUOTES[0];

  return (
    <header className="relative w-full overflow-hidden pt-4 pb-3 px-4 transition-all">
      {/* Üst Satır: Profil & Sayaç & Butonlar */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        {/* Öğretmen Rozeti & Ünvan */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-all ${
            isDark
              ? 'bg-slate-900 border border-indigo-500/40 text-white shadow-[0_0_12px_rgba(99,102,241,0.25)]'
              : 'bg-white shadow-xs border border-slate-100'
          }`}>
            👩‍🏫
          </div>
          <div className="min-w-0">
            <h1 className={`text-sm font-black truncate leading-tight ${
              isDark ? 'text-white text-glow-indigo' : 'text-slate-800'
            }`}>
              {profile?.teacherName || 'Öğretmenim'}
            </h1>

            {/* Dinamik Başarım Ünvanı */}
            <button
              onClick={() => setShowTitleModal(true)}
              className={`inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-lg text-[10px] font-extrabold border transition-all active:scale-95 ${
                isDark
                  ? 'bg-indigo-950/90 border-indigo-600/60 text-indigo-200 shadow-[0_0_8px_rgba(99,102,241,0.3)]'
                  : 'bg-rose-50 border-rose-200 text-rose-700'
              }`}
              title="Kazanılan Ünvan ve Başarımlar"
            >
              <span>{titleInfo.current.icon}</span>
              <span>{titleInfo.current.title}</span>
              <ChevronRight className="w-2.5 h-2.5 opacity-60" />
            </button>
          </div>
        </div>

        {/* Sağ Taraf Rozetleri */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Streak Ateşi */}
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold shadow-xs ${
            isDark
              ? 'bg-amber-950/80 border border-amber-700/60 text-amber-300'
              : 'bg-amber-50 border border-amber-200 text-amber-800'
          }`}>
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{streak} Gün</span>
          </div>

          {/* Sınav Geri Sayımı */}
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold shadow-xs ${
            isDark
              ? 'bg-rose-950/80 border border-rose-700/60 text-rose-300'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}>
            <Clock className="w-3.5 h-3.5 text-rose-500" />
            <span>{daysLeft} Gün</span>
          </div>

          {/* Ayarlar / Tema Butonu */}
          <button
            onClick={onOpenSettings}
            className={`w-8 h-8 rounded-xl flex items-center justify-center active:scale-90 transition-all ${
              isDark
                ? 'bg-slate-900 border border-slate-700 text-slate-200 hover:text-white shadow-xs'
                : 'bg-white shadow-xs border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            title="Ayarlar & Temalar"
          >
            <Palette className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Motivasyon Sözü Kartı */}
      <div className={`p-3 rounded-2xl ${activeTheme.badge} border backdrop-blur-sm transition-all`}>
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400 animate-pulse" />
          <div className="min-w-0 flex-1">
            <p className={`text-xs font-semibold italic leading-relaxed ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}>
              "{quote.text}"
            </p>
            <p className={`text-[10px] font-bold mt-1 text-right ${
              isDark ? 'text-indigo-300' : 'text-slate-500'
            }`}>
              — {quote.author}
            </p>
          </div>
        </div>
      </div>

      {/* Ünvan ve Başarım Detay Modalı */}
      {showTitleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className={`w-full max-w-sm rounded-3xl p-5 border shadow-2xl space-y-4 ${
            isDark ? 'bg-slate-900 border-indigo-500/40 text-slate-100' : 'bg-white border-slate-100 text-slate-800'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{titleInfo.current.icon}</span>
                <div>
                  <h3 className="text-sm font-black text-rose-500 dark:text-rose-400">
                    {titleInfo.current.title}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {titleInfo.current.desc}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowTitleModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* İlerleme Bilgisi */}
            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-500 dark:text-slate-400">Kazanılan Başarım:</span>
                <span className="text-rose-500 font-extrabold">{badgeCount} / {ACHIEVEMENTS.length}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-indigo-500 rounded-full"
                  style={{ width: `${Math.round((badgeCount / ACHIEVEMENTS.length) * 100)}%` }}
                />
              </div>

              {titleInfo.next && (
                <p className="text-[11px] text-slate-500 dark:text-slate-300 mt-2 font-medium">
                  Sıradaki Ünvan: <strong className="text-indigo-400">{titleInfo.next.icon} {titleInfo.next.title}</strong> için <strong>{titleInfo.badgesNeededForNext}</strong> başarım daha gerekiyor!
                </p>
              )}
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Daha fazla soru çözdükçe ve Pomodoro tamamladıkça yeni rozetler ve ünvanlar açılır! 🌟
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
