// 🌸 LocalStorage & Veri Yönetim Yardımcısı
// %100 İstemci Taraflı, Sıfır Sunucu, Çevrimdışı Güvenli

const STORAGE_KEY = 'AGS_ASISTANI_STATE_V1';

export const DEFAULT_STATE = {
  isOnboarded: false,
  profile: {
    teacherName: '',
    branch: 'Sınıf Öğretmenliği',
    examDate: '2026-07-12', // Yaklaşık ÖSYM MEB-AGS Sınav Tarihi
    dailyTarget: 80,
    theme: 'rose',
    streak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
  },
  // Konu Takip Verileri: key = 'category_subcategory_topicIndex'
  // { status: 'none' | 'in_progress' | 'completed' | 'review', solved: 0, correct: 0, wrong: 0, stars: 0, note: '' }
  topicsProgress: {},
  // Günlük Soru Kayıtları: { '2026-10-03': { solved: 50, pomodoroMinutes: 25 } }
  dailyActivity: {},
  // Özelleştirilebilir Takvim Listesi (Kullanıcı dilediğinde ekleyip silebilir)
  customSchedule: null,
  // Özelleştirilebilir Pomodoro Süreleri (dakika)
  pomodoroSettings: {
    workMinutes: 25,
    breakMinutes: 5,
  },
  // Danışma Kuramları Modülü İlerlemesi: { kuramlar: { 'k1': true }, dersler: { 'plan_1': true } }
  counselingProgress: {
    kuramlar: {},
    dersler: {}
  }
};

export const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      profile: {
        ...DEFAULT_STATE.profile,
        ...(parsed.profile || {})
      },
      topicsProgress: parsed.topicsProgress || {},
      dailyActivity: parsed.dailyActivity || {},
      customSchedule: parsed.customSchedule || null,
      pomodoroSettings: parsed.pomodoroSettings || DEFAULT_STATE.pomodoroSettings,
      counselingProgress: parsed.counselingProgress || parsed.fatihKocaProgress || { kuramlar: {}, dersler: {} }
    };
  } catch (err) {
    console.error('LocalStorage okuma hatası:', err);
    return DEFAULT_STATE;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('LocalStorage yazma hatası:', err);
  }
};

// JSON Dosyası Olarak Dışa Aktar (Yedek Al)
export const exportBackup = (state) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  const teacherClean = (state.profile?.teacherName || 'Ogretmenim').replace(/[^a-zA-Z0-9_-]/g, '_');
  const dateStr = new Date().toISOString().split('T')[0];
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `AGS_Takip_Yedek_${teacherClean}_${dateStr}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

// JSON Dosyasından İçe Aktar (Yedekten Geri Yükle)
export const importBackup = (file, onSuccess, onError) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed && (parsed.profile || parsed.topicsProgress)) {
        saveState(parsed);
        onSuccess(parsed);
      } else {
        onError('Geçersiz yedek dosyası formatı!');
      }
    } catch (err) {
      onError('Dosya okunurken hata oluştu: ' + err.message);
    }
  };
  reader.readAsText(file);
};
