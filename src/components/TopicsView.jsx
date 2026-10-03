import React, { useState } from 'react';
import { Search, ArrowLeft, ChevronRight, GraduationCap, Scale, Calculator, BookOpen, MapPin, Clock, Layers, BookCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import TopicCard from './TopicCard';
import { CURRICULUM_DATA } from '../data/curriculumData';

const ICONS = {
  GraduationCap,
  Scale,
  Calculator,
  BookOpen,
  MapPin,
  Clock,
  Layers,
  BookCheck
};

export default function TopicsView({ topicsProgress, onUpdateProgress, activeTheme }) {
  const [examType, setExamType] = useState('ags'); // 'ags' | 'oabt'
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // null = Ders Seçim Ekranı, id = Özel Ders Ekranı
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'completed' | 'remaining'
  const [searchQuery, setSearchQuery] = useState('');

  const isDark = activeTheme.id === 'dark';
  const currentCurriculum = examType === 'ags' ? CURRICULUM_DATA.ags : CURRICULUM_DATA.oabt;
  const selectedCategory = currentCurriculum.categories.find((c) => c.id === selectedCategoryId);

  // Genel Kategori İstatistik Hesaplayıcı
  const getCategoryStats = (category) => {
    let total = 0;
    let completed = 0;
    let solved = 0;
    category.subcategories.forEach((sub) => {
      sub.topics.forEach((_, idx) => {
        total++;
        const key = `${category.id}_${sub.id}_${idx}`;
        const p = topicsProgress[key] || {};
        if (p.status === 'completed') completed++;
        if (p.solved) solved += p.solved;
      });
    });
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, solved, percent };
  };

  // =========================================================================
  // GÖRÜNÜM 2: SEÇİLEN DERSİN KONULARI İÇİN ÖZEL YAN PENCERE / DETAY EKRANI
  // =========================================================================
  if (selectedCategory) {
    const IconComponent = ICONS[selectedCategory.icon] || BookOpen;
    const stats = getCategoryStats(selectedCategory);

    return (
      <div className="p-4 space-y-4 animate-fadeIn">
        {/* Üst Geri Dönüş ve Ders Başlığı Kartı */}
        <div className={`p-4 rounded-3xl ${activeTheme.cardBg} border-2 ${activeTheme.cardBorder} shadow-soft ${
          isDark ? 'box-glow-indigo text-white' : 'text-slate-800'
        }`}>
          <button
            onClick={() => setSelectedCategoryId(null)}
            className={`inline-flex items-center gap-2 text-xs font-black px-3 py-1.5 rounded-xl border mb-3 active:scale-95 transition-all ${
              isDark
                ? 'bg-rose-950/80 border-rose-800 text-rose-300'
                : 'bg-rose-50 border-rose-200 text-rose-600 hover:text-rose-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tüm Derslere Dön</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-rose-500/20">
              <IconComponent className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className={`text-base font-black leading-tight ${
                  isDark ? 'text-white text-glow-indigo' : 'text-slate-800'
                }`}>
                  {selectedCategory.name}
                </h2>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded-lg ${
                  isDark ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'text-rose-700 bg-rose-100'
                }`}>
                  {selectedCategory.questionCount} Soru
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {selectedCategory.description}
              </p>
            </div>
          </div>

          {/* İlerleme Çubuğu */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-400">Tamamlanma Durumu:</span>
              <span className="text-rose-500 font-extrabold">
                {stats.completed} / {stats.total} Konu (%{stats.percent})
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-300"
                style={{ width: `${stats.percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filtre ve Arama Çubuğu */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={`${selectedCategory.name} içinde ara...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2.5 rounded-2xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-xs placeholder-slate-400 ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                filterMode === 'all'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : isDark
                    ? 'bg-slate-900 text-slate-300 border border-slate-700'
                    : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Tüm Konular ({stats.total})
            </button>
            <button
              onClick={() => setFilterMode('remaining')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                filterMode === 'remaining'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : isDark
                    ? 'bg-slate-900 text-slate-300 border border-slate-700'
                    : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Kalanlar ({stats.total - stats.completed})
            </button>
            <button
              onClick={() => setFilterMode('completed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                filterMode === 'completed'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : isDark
                    ? 'bg-slate-900 text-slate-300 border border-slate-700'
                    : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Tamamlananlar ({stats.completed})
            </button>
          </div>
        </div>

        {/* Alt Başlıklar ve Konu Kutucukları (Birbirinden Ayrılmış Ferah Bloklar) */}
        <div className="space-y-4">
          {selectedCategory.subcategories.map((sub) => {
            const filteredTopics = sub.topics
              .map((topicTitle, idx) => ({
                topicTitle,
                idx,
                key: `${selectedCategory.id}_${sub.id}_${idx}`,
                progress: topicsProgress[`${selectedCategory.id}_${sub.id}_${idx}`] || {}
              }))
              .filter(({ topicTitle, progress }) => {
                if (searchQuery.trim()) {
                  const q = searchQuery.toLowerCase();
                  if (!topicTitle.toLowerCase().includes(q)) return false;
                }
                if (filterMode === 'completed') return progress.status === 'completed';
                if (filterMode === 'remaining') return progress.status !== 'completed';
                return true;
              });

            if (filteredTopics.length === 0) return null;

            return (
              <div
                key={sub.id}
                className={`p-4 rounded-3xl border shadow-soft space-y-3 ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-800 text-white'
                    : 'bg-white/90 border-slate-200/80 text-slate-800'
                }`}
              >
                {/* Alt Kategori Başlığı - Büyük, Belirgin ve Vurgulu */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <h3 className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                    isDark ? 'text-indigo-300 text-glow-indigo' : 'text-slate-700'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span>{sub.title}</span>
                  </h3>
                </div>

                {/* Konuların Teker Teker Ayrılmış Kutucukları */}
                <div className="space-y-2.5">
                  {filteredTopics.map((item) => (
                    <TopicCard
                      key={item.key}
                      topicTitle={item.topicTitle}
                      topicKey={item.key}
                      progress={item.progress}
                      onUpdateProgress={onUpdateProgress}
                      activeTheme={activeTheme}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // GÖRÜNÜM 1: ANA DERSLER MENÜSÜ (Büyük, Ferah, Belirgin Ders Kartları)
  // =========================================================================
  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      {/* 1. Sınav Oturumu Değiştirici (AGS vs ÖABT) */}
      <div className={`flex p-1.5 rounded-2xl gap-1 ${
        isDark ? 'bg-slate-900 border border-slate-800' : 'bg-slate-200/70'
      }`}>
        <button
          type="button"
          onClick={() => { setExamType('ags'); setSelectedCategoryId(null); }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            examType === 'ags'
              ? isDark
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-white text-slate-800 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>1. Oturum: MEB-AGS</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
            isDark ? 'bg-rose-950 text-rose-300' : 'bg-rose-100 text-rose-700'
          }`}>80 Soru</span>
        </button>

        <button
          type="button"
          onClick={() => { setExamType('oabt'); setSelectedCategoryId(null); }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            examType === 'oabt'
              ? isDark
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-white text-slate-800 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>2. Oturum: ÖABT</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
            isDark ? 'bg-purple-950 text-purple-300' : 'bg-purple-100 text-purple-700'
          }`}>50 Soru</span>
        </button>
      </div>

      {/* Bilgi Başlığı */}
      <div className="px-1 flex items-center justify-between">
        <div>
          <h2 className={`text-sm font-black ${
            isDark ? 'text-white text-glow-indigo' : 'text-slate-800'
          }`}>
            {examType === 'ags' ? 'MEB-AGS Dersleri' : 'ÖABT Sınıf Öğretmenliği'}
          </h2>
          <p className="text-[11px] text-slate-400 font-medium">
            Çalışmak istediğiniz dersi seçerek konularına odaklanın
          </p>
        </div>
      </div>

      {/* Ders Kartları Listesi (Göz Yormayan, Büyük ve Ayrı Kutucuklar) */}
      <div className="space-y-3">
        {currentCurriculum.categories.map((category) => {
          const IconComponent = ICONS[category.icon] || BookOpen;
          const stats = getCategoryStats(category);

          return (
            <div
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`p-4 rounded-3xl ${activeTheme.cardBg} border-2 ${activeTheme.cardBorder} shadow-soft hover:shadow-md cursor-pointer transition-all active:scale-[0.98] group ${
                isDark ? 'box-glow-indigo text-white' : 'text-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Sol İkon ve Başlık Bilgisi */}
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors shadow-xs ${
                    isDark
                      ? 'bg-slate-800 border border-slate-700 text-rose-400 group-hover:bg-rose-600 group-hover:text-white'
                      : 'bg-rose-50 text-rose-600 border border-rose-100 group-hover:bg-rose-500 group-hover:text-white'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className={`text-sm font-black leading-tight group-hover:text-rose-500 transition-colors ${
                        isDark ? 'text-white text-glow-indigo' : 'text-slate-800'
                      }`}>
                        {category.name}
                      </h3>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg flex-shrink-0 ${
                        isDark
                          ? 'bg-rose-950/80 border border-rose-800 text-rose-300'
                          : 'text-rose-700 bg-rose-50 border border-rose-200'
                      }`}>
                        {category.questionCount} Soru ({category.percentage})
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-snug line-clamp-1 mb-2.5">
                      {category.description}
                    </p>

                    {/* İlerleme Durumu */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className={isDark ? 'text-indigo-300' : 'text-slate-600'}>
                          İlerleme: %{stats.percent}
                        </span>
                        <span className="text-slate-400 font-semibold">{stats.completed} / {stats.total} Konu</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-300"
                          style={{ width: `${stats.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sağ Ok Butonu */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors self-center ${
                  isDark
                    ? 'bg-slate-800 text-slate-300 group-hover:bg-rose-600 group-hover:text-white'
                    : 'bg-slate-100 text-slate-400 group-hover:bg-rose-500 group-hover:text-white'
                }`}>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
