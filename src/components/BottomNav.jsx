import React from 'react';
import { BookOpen, Sparkles, BarChart3, Clock } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange, activeTheme }) {
  const isDark = activeTheme.id === 'dark';

  const tabs = [
    { id: 'topics', label: 'Dersler', icon: BookOpen },
    { id: 'counseling', label: 'Kuram & Takvim', icon: Sparkles },
    { id: 'stats', label: 'İlerleme', icon: BarChart3 },
    { id: 'timer', label: 'Odaklan', icon: Clock },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md border-t max-w-md mx-auto safe-area-pb transition-colors ${
      isDark
        ? 'bg-slate-900/95 border-slate-800 text-slate-300'
        : 'bg-white/95 border-slate-200/80 text-slate-600'
    }`}>
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all relative ${
                isActive
                  ? isDark
                    ? 'text-white text-glow-indigo font-black scale-105'
                    : `${activeTheme.primaryText} font-bold scale-105`
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${
                isActive
                  ? isDark
                    ? 'bg-slate-800 shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                    : 'bg-rose-50 shadow-xs'
                  : ''
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${
                  isDark ? 'bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.8)]' : 'bg-rose-500'
                }`}></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
