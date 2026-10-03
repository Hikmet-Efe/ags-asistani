import React from 'react';
import { Award, CheckCircle, BarChart3, TrendingUp, Target, Clock, Star, Lock, Sparkles, Flame } from 'lucide-react';
import { CURRICULUM_DATA, ACHIEVEMENTS, getTeacherTitle } from '../data/curriculumData';

export default function DashboardStats({
  topicsProgress = {},
  dailyActivity = {},
  profile = {},
  activeTheme
}) {
  const isDark = activeTheme.id === 'dark';

  // 1. Konu ve Soru Hesaplamaları
  let totalTopics = 0;
  let completedTopics = 0;
  let inProgressTopics = 0;
  let totalSolved = 0;
  let totalCorrect = 0;
  let totalWrong = 0;

  const allCategories = [
    ...CURRICULUM_DATA.ags.categories,
    ...CURRICULUM_DATA.oabt.categories
  ];

  const categoryStats = allCategories.map((cat) => {
    let catTotal = 0;
    let catCompleted = 0;
    let catSolved = 0;

    cat.subcategories.forEach((sub) => {
      sub.topics.forEach((t, idx) => {
        catTotal++;
        totalTopics++;
        const key = `${cat.id}_${sub.id}_${idx}`;
        const p = topicsProgress[key] || {};
        if (p.status === 'completed') {
          catCompleted++;
          completedTopics++;
        } else if (p.status === 'in_progress') {
          inProgressTopics++;
        }
        if (p.solved) {
          catSolved += p.solved;
          totalSolved += p.solved;
        }
        if (p.correct) totalCorrect += p.correct;
        if (p.wrong) totalWrong += p.wrong;
      });
    });

    const percent = catTotal > 0 ? Math.round((catCompleted / catTotal) * 100) : 0;
    return {
      id: cat.id,
      name: cat.name,
      total: catTotal,
      completed: catCompleted,
      solved: catSolved,
      percent,
      questionWeight: cat.questionCount,
    };
  });

  const overallPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const totalNet = (totalCorrect - totalWrong / 4).toFixed(1);
  const dailyTarget = profile?.dailyTarget || 80;

  // 2. Çalışma Süresi Analizi (Bugün, Hafta, Ay, Tüm Zamanlar)
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

  const pomodoroSessions = Math.floor(totalMinutes / 25);
  const streak = profile?.streak || 1;

  // 3. Başarım & Ünvan Kontrolü
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

  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      {/* 1. Ünvan ve Seviye Kartı */}
      <div className={`p-5 rounded-3xl ${activeTheme.cardBg} border-2 ${activeTheme.cardBorder} shadow-soft ${
        isDark ? 'box-glow-indigo text-white' : 'text-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{titleInfo.current.icon}</span>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-500 block">
                Mevcut Öğretmenlik Ünvanı
              </span>
              <h3 className={`text-lg font-black ${isDark ? 'text-white text-glow-indigo' : 'text-slate-800'}`}>
                {titleInfo.current.title}
              </h3>
            </div>
          </div>

          <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${
            isDark ? 'bg-indigo-950 border-indigo-700 text-indigo-300' : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}>
            {badgeCount} / {ACHIEVEMENTS.length} Başarım
          </span>
        </div>

        {/* İlerleme Barı */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.round((badgeCount / ACHIEVEMENTS.length) * 100)}%` }}
          />
        </div>

        {titleInfo.next ? (
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-300">
            Sıradaki Ünvan: <strong className="text-rose-500">{titleInfo.next.icon} {titleInfo.next.title}</strong> ({titleInfo.badgesNeededForNext} başarım kaldı)
          </p>
        ) : (
          <p className="text-[11px] font-bold text-amber-500">
            🏆 Tebrikler! Tüm ünvanları kazandınız, zirvedesiniz!
          </p>
        )}
      </div>

      {/* 2. Genel İlerleme Özeti */}
      <div className={`p-5 rounded-3xl ${activeTheme.cardBg} border-2 ${activeTheme.cardBorder} shadow-soft ${
        isDark ? 'box-glow-indigo text-white' : 'text-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Genel Akademi İlerlemesi
            </span>
            <h3 className={`text-2xl font-black ${isDark ? 'text-white text-glow-pink' : 'text-slate-800'}`}>
              %{overallPercent} Tamamlandı
            </h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 text-xl font-black">
            %{overallPercent}
          </div>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 mb-3">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${overallPercent}%` }}
          />
        </div>

        <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-300">
          <span>{completedTopics} Biten Konu</span>
          <span>{inProgressTopics} Çalışılan</span>
          <span>{totalTopics - completedTopics} Kalan</span>
        </div>
      </div>

      {/* 3. Çalışma Süresi Analizi Göstergesi (Haftalık, Aylık, Tüm Zamanlar) */}
      <div className={`p-4 rounded-3xl ${activeTheme.cardBg} border-2 ${activeTheme.cardBorder} shadow-soft space-y-3 ${
        isDark ? 'box-glow-indigo text-white' : 'text-slate-800'
      }`}>
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <h4 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-rose-500 dark:text-rose-400">
            <Clock className="w-4 h-4" />
            <span>Çalışılan Zaman Göstergesi</span>
          </h4>
          <span className="text-[10px] font-bold text-slate-400">
            Pomodoro Takibi
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className={`p-3 rounded-2xl border ${
            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200/80'
          }`}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              📅 Bugün
            </span>
            <p className={`text-base font-black ${isDark ? 'text-white text-glow-pink' : 'text-slate-800'}`}>
              {formatHoursMins(todayMinutes)}
            </p>
          </div>

          <div className={`p-3 rounded-2xl border ${
            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200/80'
          }`}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              📆 Son 7 Gün (Haftalık)
            </span>
            <p className={`text-base font-black ${isDark ? 'text-white text-glow-indigo' : 'text-slate-800'}`}>
              {formatHoursMins(weekMinutes)}
            </p>
          </div>

          <div className={`p-3 rounded-2xl border ${
            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200/80'
          }`}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              🗓️ Son 30 Gün (Aylık)
            </span>
            <p className={`text-base font-black ${isDark ? 'text-white text-glow-indigo' : 'text-slate-800'}`}>
              {formatHoursMins(monthMinutes)}
            </p>
          </div>

          <div className={`p-3 rounded-2xl border ${
            isDark ? 'bg-indigo-950/50 border-indigo-800/80' : 'bg-rose-50/70 border-rose-200'
          }`}>
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block mb-0.5">
              🏆 Tüm Zamanlar
            </span>
            <p className={`text-base font-black ${isDark ? 'text-indigo-300 text-glow-indigo' : 'text-rose-700'}`}>
              {formatHoursMins(totalMinutes)}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Soru & Net Metrikleri */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`p-4 rounded-2xl ${activeTheme.cardBg} border-2 ${activeTheme.cardBorder} shadow-xs ${
          isDark ? 'text-white' : 'text-slate-800'
        }`}>
          <div className="flex items-center gap-2 mb-1.5 text-rose-500">
            <Target className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Çözülen Soru</span>
          </div>
          <div className={`text-2xl font-black ${isDark ? 'text-white text-glow-pink' : 'text-slate-800'}`}>
            {totalSolved}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Hedef: {dailyTarget} soru/gün
          </p>
        </div>

        <div className={`p-4 rounded-2xl ${activeTheme.cardBg} border-2 ${activeTheme.cardBorder} shadow-xs ${
          isDark ? 'text-white' : 'text-slate-800'
        }`}>
          <div className="flex items-center gap-2 mb-1.5 text-emerald-500">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Toplam Net</span>
          </div>
          <div className={`text-2xl font-black ${isDark ? 'text-white text-glow-indigo' : 'text-slate-800'}`}>
            {totalNet}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {totalCorrect} Doğru • {totalWrong} Yanlış
          </p>
        </div>
      </div>

      {/* 5. Genişletilmiş Başarımlar & Rozetler (16 Adet) */}
      <div className={`p-4 rounded-3xl ${activeTheme.cardBg} border-2 ${activeTheme.cardBorder} shadow-soft space-y-3 ${
        isDark ? 'box-glow-indigo text-white' : 'text-slate-800'
      }`}>
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <h4 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-amber-500">
            <Award className="w-4 h-4" />
            <span>Kazanılan Başarımlar & Rozetler ({badgeCount}/{ACHIEVEMENTS.length})</span>
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedBadges.some((b) => b.id === ach.id);
            return (
              <div
                key={ach.id}
                className={`p-3 rounded-2xl border transition-all relative overflow-hidden ${
                  isUnlocked
                    ? isDark
                      ? 'bg-indigo-950/80 border-indigo-700/80 text-white shadow-[0_0_10px_rgba(99,102,241,0.25)]'
                      : 'bg-amber-50/80 border-amber-200 text-amber-900'
                    : isDark
                      ? 'bg-slate-950/50 border-slate-800 text-slate-500 opacity-50'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{ach.icon}</span>
                  <div className="min-w-0">
                    <p className={`text-xs font-black truncate ${
                      isUnlocked
                        ? isDark ? 'text-white text-glow-indigo' : 'text-slate-800'
                        : 'text-slate-400'
                    }`}>
                      {ach.title}
                    </p>
                    <p className="text-[10px] text-slate-400 leading-tight line-clamp-1">
                      {ach.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-1 flex items-center justify-between text-[10px] font-extrabold">
                  {isUnlocked ? (
                    <span className="text-emerald-500 flex items-center gap-0.5">
                      ✓ Açıldı
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> Kilitli
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Ders Bazında İlerleme */}
      <div className={`p-4 rounded-3xl ${activeTheme.cardBg} border-2 ${activeTheme.cardBorder} shadow-soft ${
        isDark ? 'box-glow-indigo text-white' : 'text-slate-800'
      }`}>
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4 text-rose-500" />
          Ders Bazında Tamamlanma Durumu
        </h4>

        <div className="space-y-3">
          {categoryStats.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className={`font-bold truncate max-w-[200px] ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  {item.name}
                </span>
                <span className="text-slate-400 font-bold flex-shrink-0">
                  {item.completed}/{item.total} (%{item.percent})
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-300"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
