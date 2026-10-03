import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TopicsView from './components/TopicsView';
import CounselingView from './components/CounselingView';
import DashboardStats from './components/DashboardStats';
import PomodoroTimer from './components/PomodoroTimer';
import BottomNav from './components/BottomNav';
import OnboardingModal from './components/OnboardingModal';
import SettingsModal from './components/SettingsModal';
import { THEMES } from './data/curriculumData';
import { loadState, saveState, DEFAULT_STATE } from './utils/storage';

export default function App() {
  const [state, setState] = useState(() => loadState());
  const [activeTab, setActiveTab] = useState('topics');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Veri değiştikçe LocalStorage'a kaydet
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Aktif Tema Bulucu
  const activeTheme = THEMES.find((t) => t.id === state.profile?.theme) || THEMES[0];
  const isDark = activeTheme.id === 'dark';

  // Dark modda HTML root sınıfını da güncelle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Konu İlerlemesini Güncelle
  const handleUpdateTopicProgress = (topicKey, progressData) => {
    setState((prev) => {
      const today = new Date().toISOString().split('T')[0];
      const prevTopic = prev.topicsProgress[topicKey] || {};
      const diffSolved = (progressData.solved || 0) - (prevTopic.solved || 0);

      const currentDayActivity = prev.dailyActivity[today] || { solved: 0, pomodoroMinutes: 0 };
      const newDailyActivity = {
        ...prev.dailyActivity,
        [today]: {
          ...currentDayActivity,
          solved: Math.max(0, currentDayActivity.solved + (diffSolved > 0 ? diffSolved : 0))
        }
      };

      return {
        ...prev,
        topicsProgress: {
          ...prev.topicsProgress,
          [topicKey]: progressData
        },
        dailyActivity: newDailyActivity
      };
    });
  };

  // Danışma Kuramları Modülü Güncelle
  const handleUpdateCounselingProgress = (newCounselingData) => {
    setState((prev) => ({
      ...prev,
      counselingProgress: newCounselingData
    }));
  };

  // Özelleştirilebilir Takvim Güncelle
  const handleUpdateCustomSchedule = (newSchedule) => {
    setState((prev) => ({
      ...prev,
      customSchedule: newSchedule
    }));
  };

  // Pomodoro Ayarları Güncelle
  const handleUpdatePomodoroSettings = (newSettings) => {
    setState((prev) => ({
      ...prev,
      pomodoroSettings: newSettings
    }));
  };

  // Profil Güncelle
  const handleUpdateProfile = (newProfile) => {
    setState((prev) => ({
      ...prev,
      profile: newProfile
    }));
  };

  // İlk Açılış Sihirbazı Tamamlama
  const handleOnboardingComplete = (profileData) => {
    setState((prev) => ({
      ...prev,
      isOnboarded: true,
      profile: {
        ...prev.profile,
        ...profileData
      }
    }));
  };

  // Pomodoro Tamamlandığında
  const handlePomodoroComplete = (minutes) => {
    const today = new Date().toISOString().split('T')[0];
    setState((prev) => {
      const current = prev.dailyActivity[today] || { solved: 0, pomodoroMinutes: 0 };
      return {
        ...prev,
        dailyActivity: {
          ...prev.dailyActivity,
          [today]: {
            ...current,
            pomodoroMinutes: current.pomodoroMinutes + minutes
          }
        }
      };
    });
  };

  // Veri Sıfırlama
  const handleResetState = () => {
    setState(DEFAULT_STATE);
  };

  // Yedekten Geri Yükleme
  const handleRestoreState = (restoredData) => {
    setState(restoredData);
  };

  return (
    <div className={`min-h-screen ${activeTheme.bg} ${isDark ? 'dark' : ''} transition-colors duration-300 flex justify-center selection:bg-rose-200 selection:text-rose-800`}>
      {/* Mobil Uygulama Kabuğu (Zero Overflow) */}
      <div className="w-full max-w-md min-h-screen relative pb-20 shadow-2xl flex flex-col bg-inherit overflow-x-hidden">
        {/* Üst Başlık & Motivasyon & Dinamik Ünvan */}
        <Header
          profile={state.profile}
          topicsProgress={state.topicsProgress}
          dailyActivity={state.dailyActivity}
          onOpenSettings={() => setIsSettingsOpen(true)}
          activeTheme={activeTheme}
        />

        {/* Ana İçerik Görünümü */}
        <main className="flex-1 pb-4">
          {activeTab === 'topics' && (
            <TopicsView
              topicsProgress={state.topicsProgress}
              onUpdateProgress={handleUpdateTopicProgress}
              activeTheme={activeTheme}
            />
          )}

          {activeTab === 'counseling' && (
            <CounselingView
              counselingProgress={state.counselingProgress}
              customSchedule={state.customSchedule}
              onUpdateCounselingProgress={handleUpdateCounselingProgress}
              onUpdateCustomSchedule={handleUpdateCustomSchedule}
              activeTheme={activeTheme}
            />
          )}

          {activeTab === 'stats' && (
            <DashboardStats
              topicsProgress={state.topicsProgress}
              dailyActivity={state.dailyActivity}
              profile={state.profile}
              activeTheme={activeTheme}
            />
          )}

          {activeTab === 'timer' && (
            <PomodoroTimer
              activeTheme={activeTheme}
              dailyActivity={state.dailyActivity}
              pomodoroSettings={state.pomodoroSettings}
              onUpdatePomodoroSettings={handleUpdatePomodoroSettings}
              onSessionComplete={handlePomodoroComplete}
            />
          )}
        </main>

        {/* Sabit Alt Gezinme Menüsü */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          activeTheme={activeTheme}
        />

        {/* İlk Açılış Start-Up Sihirbazı */}
        <OnboardingModal
          isOpen={!state.isOnboarded}
          initialProfile={state.profile}
          onComplete={handleOnboardingComplete}
        />

        {/* Ayarlar ve Kişiselleştirme Modalı */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          state={state}
          onUpdateProfile={handleUpdateProfile}
          onRestoreState={handleRestoreState}
          onResetState={handleResetState}
        />
      </div>
    </div>
  );
}
