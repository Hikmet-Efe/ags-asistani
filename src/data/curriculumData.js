// 🌸 AGS & ÖABT Sınıf Öğretmenliği Müfredat Veritabanı
// ÖSYM, MEB 7528 Sayılı Kanun ve Türkiye Yüzyılı Maarif Modeli ile %100 Uyumlu

export const MOTIVATIONAL_QUOTES = [
  { text: "Öğretmenler; yeni nesil, sizin eseriniz olacaktır.", author: "Mustafa Kemal Atatürk" },
  { text: "Bir çocuğu eğitmek, bir geleceği inşa etmektir.", author: "Eğitim Bilimi İlkesi" },
  { text: "Her gün çözülen 50 soru, yarının 30 öğrencisinin gülümsemesidir.", author: "Öğretmen Pusulası" },
  { text: "İnsan sevdiği işi yaparsa bir gün bile çalışmış sayılmaz.", author: "Konfüçyüs" },
  { text: "Zorluklar, başarının değerini artıran süslerdir.", author: "Moliere" },
  { text: "Bir öğretmenin etkisi sonsuzluğa uzanır; nerede biteceğini asla kestiremez.", author: "Henry Adams" },
  { text: "Bugün gösterdiğin sabır, yarın sınıfta anlatacağın dersin ışığı olacak.", author: "Geleceğin Öğretmenine" },
  { text: "Eğitim kafayı doldurmak değil, bir ateş yakmaktır.", author: "William Butler Yeats" }
];

export const THEMES = [
  {
    id: 'rose',
    name: 'Gül Kurusu & Pembe',
    emoji: '🌸',
    bg: 'bg-rose-50/70',
    cardBg: 'bg-white',
    cardBorder: 'border-rose-100',
    primary: 'bg-rose-500 hover:bg-rose-600 text-white',
    primaryText: 'text-rose-600',
    accentBg: 'bg-rose-100 text-rose-800',
    ring: 'ring-rose-300',
    headerGradient: 'from-rose-500 to-pink-500',
    badge: 'bg-rose-50 border-rose-200 text-rose-700',
  },
  {
    id: 'lavender',
    name: 'Lavanta Rüyası',
    emoji: '💜',
    bg: 'bg-purple-50/70',
    cardBg: 'bg-white',
    cardBorder: 'border-purple-100',
    primary: 'bg-purple-500 hover:bg-purple-600 text-white',
    primaryText: 'text-purple-600',
    accentBg: 'bg-purple-100 text-purple-800',
    ring: 'ring-purple-300',
    headerGradient: 'from-purple-500 to-indigo-500',
    badge: 'bg-purple-50 border-purple-200 text-purple-700',
  },
  {
    id: 'sage',
    name: 'Adaçayı Yeşili',
    emoji: '🌿',
    bg: 'bg-emerald-50/70',
    cardBg: 'bg-white',
    cardBorder: 'border-emerald-100',
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    primaryText: 'text-emerald-700',
    accentBg: 'bg-emerald-100 text-emerald-800',
    ring: 'ring-emerald-300',
    headerGradient: 'from-emerald-600 to-teal-500',
    badge: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  },
  {
    id: 'latte',
    name: 'Latte & Karamel',
    emoji: '☕',
    bg: 'bg-amber-50/60',
    cardBg: 'bg-white',
    cardBorder: 'border-amber-100',
    primary: 'bg-amber-600 hover:bg-amber-700 text-white',
    primaryText: 'text-amber-700',
    accentBg: 'bg-amber-100 text-amber-900',
    ring: 'ring-amber-300',
    headerGradient: 'from-amber-600 to-orange-500',
    badge: 'bg-amber-50 border-amber-200 text-amber-800',
  },
  {
    id: 'dark',
    name: 'Gece Yıldızları (Dark)',
    emoji: '🌌',
    isDark: true,
    bg: 'bg-slate-950 text-slate-100',
    cardBg: 'bg-slate-900/95 text-slate-100',
    cardBorder: 'border-slate-800 shadow-[0_0_15px_rgba(99,102,241,0.15)]',
    primary: 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-glow',
    primaryText: 'text-indigo-400',
    accentBg: 'bg-indigo-950/80 border border-indigo-700/50 text-indigo-200',
    ring: 'ring-indigo-400',
    headerGradient: 'from-slate-950 to-indigo-950',
    badge: 'bg-slate-900/90 border-indigo-500/40 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.2)]',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-200',
    textMuted: 'text-slate-400',
  }
];

// ==========================================
// 🏆 BAŞARIMLAR (ACHIEVEMENTS) & ÜNVAN SİSTEMİ
// ==========================================
export const ACHIEVEMENTS = [
  { id: 'q_10', icon: '🎯', title: 'İlk Adım', desc: 'Toplam 10 soru çöz', target: 10, type: 'questions' },
  { id: 'q_50', icon: '⚡', title: 'Isınma Turu', desc: 'Toplam 50 soru çöz', target: 50, type: 'questions' },
  { id: 'q_150', icon: '🏹', title: 'Soru Avcısı', desc: 'Toplam 150 soru çöz', target: 150, type: 'questions' },
  { id: 'q_300', icon: '🔥', title: 'Soru Canavarı', desc: 'Toplam 300 soru çöz', target: 300, type: 'questions' },
  { id: 'q_500', icon: '👑', title: 'Soru Üstadı', desc: 'Toplam 500 soru çöz', target: 500, type: 'questions' },
  { id: 'q_1000', icon: '🌟', title: 'Bininci Soru Efsanesi', desc: 'Toplam 1000 soru çöz', target: 1000, type: 'questions' },
  { id: 't_5', icon: '📖', title: 'Konu Kaşifi', desc: '5 konuyu tamamla', target: 5, type: 'topics' },
  { id: 't_15', icon: '📚', title: 'Konu Fatihi', desc: '15 konuyu tamamla', target: 15, type: 'topics' },
  { id: 't_30', icon: '🎓', title: 'Müfredat Hakimi', desc: '30 konuyu tamamla', target: 30, type: 'topics' },
  { id: 'pct_25', icon: '🚀', title: 'Çeyrek Barajı', desc: '%25 Genel ilerlemeye ulaş', target: 25, type: 'percent' },
  { id: 'pct_50', icon: '💎', title: 'Yarı Yol Zaferi', desc: '%50 Genel ilerlemeye ulaş', target: 50, type: 'percent' },
  { id: 'p_1', icon: '⏱️', title: 'İlk Odaklanma', desc: '1 Pomodoro seansı tamamla', target: 1, type: 'pomodoro' },
  { id: 'p_5', icon: '⏳', title: 'Odak Ustası', desc: '5 Pomodoro seansı tamamla', target: 5, type: 'pomodoro' },
  { id: 'm_120', icon: '🧘', title: 'Zaman Kaşifi', desc: '2 saat (120 dk) ders çalış', target: 120, type: 'minutes' },
  { id: 'm_300', icon: '🏆', title: 'Derin Çalışma Şampiyonu', desc: '5 saat (300 dk) ders çalış', target: 300, type: 'minutes' },
  { id: 's_3', icon: '🔥', title: 'Azim Serisi', desc: '3 gün kesintisiz çalışma serisi', target: 3, type: 'streak' },
];

export const TITLES = [
  { minBadges: 0, title: 'Aday Öğretmen', icon: '🌱', desc: 'Akademi yolculuğunun başlangıcı' },
  { minBadges: 2, title: 'Azimli Eğitimci', icon: '🌿', desc: 'Hedefe doğru ilk adımlar atıldı' },
  { minBadges: 4, title: 'Çalışkan Öğretmen', icon: '⭐', desc: 'Disiplinli çalışma meyvelerini veriyor' },
  { minBadges: 7, title: 'Konu & Soru Uzmanı', icon: '📚', desc: 'Müfredatı adım adım fethediyor' },
  { minBadges: 10, title: 'Kıdemli Maarifçi', icon: '🎓', desc: 'Sınavın inceliklerine tam hakim' },
  { minBadges: 13, title: 'Akademi Derecesi', icon: '👑', desc: 'Zirveye oynayan örnek öğretmen' },
  { minBadges: 15, title: 'Geleceğin Başöğretmeni', icon: '🏆', desc: 'Kusursuz hazırlık ve mutlak başarı' },
];

export const getTeacherTitle = (badgeCount) => {
  let currentTitle = TITLES[0];
  let nextTitle = null;

  for (let i = 0; i < TITLES.length; i++) {
    if (badgeCount >= TITLES[i].minBadges) {
      currentTitle = TITLES[i];
      nextTitle = TITLES[i + 1] || null;
    }
  }

  return {
    current: currentTitle,
    next: nextTitle,
    badgesNeededForNext: nextTitle ? nextTitle.minBadges - badgeCount : 0
  };
};

export const CURRICULUM_DATA = {
  // ==========================================
  // 1. OTURUM: MEB-AGS (80 Soru - 110 Dakika)
  // ==========================================
  ags: {
    title: "1. Oturum: MEB-AGS (80 Soru)",
    totalQuestions: 80,
    categories: [
      {
        id: "egitim-bilimleri",
        name: "Eğitim Bilimleri ve Türk Millî Eğitim Sistemi",
        icon: "GraduationCap",
        questionCount: 30,
        percentage: "%37.5",
        description: "En yüksek soru ağırlığına sahip ana oturum",
        subcategories: [
          {
            id: "egitim-tarihi-felsefe",
            title: "1. Eğitim Tarihi ve Felsefesi",
            topics: [
              "Felsefi Temeller",
              "Tarihi Temeller",
              "Sosyal / Toplumsal Temeller",
              "Ekonomik Temeller",
              "Politik Temeller"
            ]
          },
          {
            id: "gelisim-psikolojisi",
            title: "2. Gelişim Psikolojisi",
            topics: [
              "Gelişim Psikolojisine Giriş ve Temel Kavramlar",
              "Fiziksel ve Psikomotor Gelişim",
              "Bilişsel / Zihinsel Gelişim (Piaget, Vygotsky, Bruner)",
              "Kişilik Gelişimi (Freud, Erikson)",
              "Ahlak Gelişimi (Kohlberg, Piaget, Gilligan)",
              "Dil Gelişimi"
            ]
          },
          {
            id: "ogrenme-psikolojisi",
            title: "3. Öğrenme Psikolojisi",
            topics: [
              "Öğrenme Psikolojisine Giriş ve Temel İlkeler",
              "Davranışçı Kuramlar (Klasik ve Edimsel Koşullanma)",
              "Bilişsel Ağırlıklı Davranışçı Kuramlar (İşaret-Gestalt, Sosyal Öğrenme)",
              "Bilişsel Kuramlar (Gestalt ve Bilgi İşleme Kuramı)",
              "İnsancıl (Hümanist) ve Nörofizyolojik Yaklaşımlar"
            ]
          },
          {
            id: "oyt",
            title: "4. Öğretim Yöntem ve Teknikleri",
            topics: [
              "Öğretim İlkeleri",
              "Öğretim Stratejileri (Sunuş, Buluş, Araştırma-İnceleme)",
              "Öğretim Yöntemleri (Anlatım, Tartışma, Örnek Olay, Problem Çözme)",
              "Öğretim Teknikleri ve Aktif Öğrenme Yolları",
              "Öğrenme-Öğretme Modelleri ve Çağdaş Yaklaşımlar",
              "Öğrenme Stilleri ve Üstbiliş Stratejileri",
              "Kavram Öğretimi Teknikleri (Kavram Haritaları, Zihin Haritaları)",
              "Düşünme Becerileri (Eleştirel, Yaratıcı, Yansıtıcı Düşünme)"
            ]
          },
          {
            id: "olcme-degerlendirme",
            title: "5. Eğitimde Ölçme ve Değerlendirme",
            topics: [
              "Ölçme ve Değerlendirmeye İlişkin Temel Kavramlar",
              "Ölçme Araçlarında Bulunması Gereken Nitelikler (Güvenirlik, Geçerlik, Kullanışlılık)",
              "Eğitimde Kullanılan Ölçme Araçları (Geleneksel ve Tamamlayıcı/Alternatif)",
              "Temel İstatistiksel İşlemler ve Madde Analizi"
            ]
          },
          {
            id: "rehberlik",
            title: "6. Rehberlik ve Psikolojik Danışma",
            topics: [
              "Çağdaş Eğitim ve Öğrenci Kişilik Hizmetleri",
              "Rehberliğe Giriş, İlkeleri ve Felsefesi",
              "Rehberlik Hizmet Alanları",
              "İletişim Becerileri ve Empati",
              "Rehberlik Türleri (İşlevlerine, Birey Sayısına, Problem Alanına Göre)",
              "Mesleki Rehberlik ve Kariyer Gelişim Kuramları",
              "Bireyi Tanıma Teknikleri (Test ve Test Dışı)",
              "Örgütsel Yapı ve Okul Rehberlik Servisi",
              "Özel Eğitim, Kaynaştırma ve Bireyselleştirilmiş Eğitim Programı (BEP)",
              "Psikolojik Danışma Kuramlarına Giriş"
            ]
          },
          {
            id: "sinif-yonetimi",
            title: "7. Sınıf Yönetimi",
            topics: [
              "Sınıf Yönetimi Boyutları ve Modelleri",
              "Sınıf İçi İletişim ve Etkileşim",
              "Sınıf Kuralları ve Zaman Yönetimi",
              "İstenmeyen Davranışların Önlenmesi ve Yönetimi"
            ]
          },
          {
            id: "egitim-teknolojileri",
            title: "8. Eğitim ve Öğretim Teknolojileri",
            topics: [
              "Eğitim Teknolojisi ve Öğretim Materyalleri",
              "Materyal Tasarım İlkeleri ve Öğeleri",
              "Dijital Eğitim Araçları, EBA ve Yapay Zeka Entegrasyonu"
            ]
          },
          {
            id: "turk-milli-egitim-yapisi",
            title: "9. Türk Millî Eğitim Sisteminin Genel Yapısı",
            topics: [
              "MEB Teşkilat Yapısı ve Merkez-Taşra Görevleri",
              "Türk Millî Eğitiminin Amaçları ve Temel İlkeleri",
              "Öğretim Programları ve Ders Kitapları Süreci",
              "Öğretmenlik Mesleği ve Mesleki Standartlar"
            ]
          },
          {
            id: "tymm-genel",
            title: "10. Türkiye Yüzyılı Maarif Modeli Genel Yapısı",
            topics: [
              "TYMM Eğitim Felsefesi ve Temel Bileşenleri",
              "TYMM'nin Hedeflediği Öğrenci Profilleri",
              "Erdem - Değer - Eylem Çerçevesi",
              "Beceriler Çerçevesi (Alan ve Kavramsal Beceriler)",
              "Bütüncül (Holistik) Eğitim Yaklaşımı",
              "TYMM'de Yararlanılan Çağdaş Yaklaşım ve Yöntemler"
            ]
          },
          {
            id: "tymm-okuryazarlik",
            title: "11. TYMM Program Okuryazarlığı",
            topics: [
              "Program Okuryazarlığı Kavramı ve Önemi",
              "Kazanım, Öğrenme Çıktısı ve Süreç Bileşenleri Analizi",
              "Tema, Öğrenme Alanı ve Disiplinlerarası Geçişler"
            ]
          }
        ]
      },
      {
        id: "mevzuat",
        name: "Mevzuat (Hukuki Çerçeve)",
        icon: "Scale",
        questionCount: 8,
        percentage: "%10",
        description: "Anayasa ve öğretmenliği ilgilendiren temel kanunlar",
        subcategories: [
          {
            id: "anayasa",
            title: "1. 1982 T.C. Anayasası Genel Esaslar",
            topics: [
              "1982 Anayasası Genel Esasları ve Devletin Temel Nitelikleri",
              "Temel Hak ve Hürriyetler (Kişinin Hakları ve Ödevleri)",
              "Sosyal ve Ekonomik Haklar ile Siyasi Haklar",
              "Yasama (Devlet Organları, TBMM Görev ve Yetkileri)",
              "Yürütme (Cumhurbaşkanı ve İdari Yapı)",
              "Yargı (Genel Hükümler, Yüksek Mahkemeler: AYM, Yargıtay, Danıştay, Uyuşmazlık)",
              "Hakimler ve Savcılar Kurulu (HSK) ile Sayıştay",
              "İdare Hukuku Esasları ve Teşkilat Yapısı"
            ]
          },
          {
            id: "kanun-1739",
            title: "2. 1739 Sayılı Millî Eğitim Temel Kanunu",
            topics: [
              "Türk Millî Eğitiminin Genel ve Özel Amaçları",
              "Türk Millî Eğitiminin Temel İlkeleri (Genellik, Eşitlik, Laiklik, Bilimsellik)",
              "Örgün Eğitim Kademeleri (Okul Öncesi, İlköğretim, Ortaöğretim, Yükseköğretim)",
              "Yaygın Eğitim ve Öğretmenlik Mesleği Hükümleri"
            ]
          },
          {
            id: "kanun-222",
            title: "3. 222 Sayılı İlköğretim ve Eğitim Kanunu",
            topics: [
              "İlköğretim Kurumları ve Zorunlu Öğrenim Çağı",
              "Kayıt-Kabul, Devam ve Devamsızlık Takibi",
              "İlköğretim Görevlileri ve Personel Hükümleri",
              "Okul Arsaları, Binaları ve Gelir-Gider Düzenlemeleri"
            ]
          },
          {
            id: "kanun-7528",
            title: "4. 7528 Sayılı Öğretmenlik Mesleği Kanunu (ÖMK)",
            topics: [
              "Temel İlkeler ve Kanunun Kapsamı",
              "Öğretmenlerin Hak, Ödev ve Sorumlulukları",
              "Yöneticilerin Ödev ve Sorumlulukları",
              "Öğretmenlerin Nitelikleri ve Seçimi",
              "Millî Eğitim Akademisi ve Hazırlık Eğitimi",
              "Hazırlık Eğitiminde Başarı ve Değerlendirme Kriterleri",
              "Akademi ile İlişiğin Kesilmesine İlişkin Durumlar",
              "Disiplin Kurulu ve Disiplin Cezalarının Uygulanması",
              "Öğretmen Adaylarına İlişkin Mali ve Sosyal Hükümler",
              "Kadrolu Öğretmenliğe Atama Usulleri",
              "Öğretmenlerin Yer Değişikliği ve Mazeret Tayinleri",
              "Mesleki Gelişim, Kariyer Basamakları ve Yönetici Görevlendirme",
              "Öğretmenlik Mesleğinde Kariyer (Uzman ve Başöğretmenlik)",
              "Öğretmenliğin Sona Ermesi Halleri",
              "Millî Eğitim Akademisinin Kuruluşu, Organları ve Görevleri"
            ]
          }
        ]
      },
      {
        id: "sayisal-yetenek",
        name: "Sayısal Yetenek (Matematik)",
        icon: "Calculator",
        questionCount: 15,
        percentage: "%18.75",
        description: "Temel matematik, grafik-tablo ve mantıksal muhakeme",
        subcategories: [
          {
            id: "temel-matematik",
            title: "1. Temel Matematik & Problemler",
            topics: [
              "Sayılar ve Sayı Kümeleri",
              "Dört İşlem ve İşlem Önceliği",
              "Bölme ve Bölünebilme Kuralları",
              "Asal Sayılar ve Asal Çarpanlara Ayırma",
              "EBOB - EKOK ve Uygulamaları",
              "Kesirler ve Rasyonel Sayılar",
              "Ondalık Gösterim ve Devirli Sayılar",
              "Basit Eşitsizlikler ve 1. Dereceden Denklemler",
              "Mutlak Değer",
              "Üslü İfadeler",
              "Köklü İfadeler",
              "Oran ve Orantı",
              "Yüzde Hesapları",
              "Sayı ve Kesir Problemleri",
              "Yaş Problemleri",
              "Yüzde, Kâr - Zarar Problemleri",
              "Oran - Orantı Problemleri",
              "Karışım Problemleri",
              "İşçi - Havuz Problemleri",
              "Hareket ve Hız Problemleri",
              "Günlük Hayat Matematik Problemleri"
            ]
          },
          {
            id: "grafik-tablo",
            title: "2. Grafik ve Tablo Yorumlama",
            topics: [
              "Sütun Grafikleri Okuma ve Analizi",
              "Çizgi Grafikleri Analizi",
              "Daire (Pasta) Grafikleri ve Açı Dağılımı",
              "Tablo Okuma ve Veri Çıkarımı",
              "Veri Karşılaştırma",
              "Birden Fazla Veri Setini Karşılaştırma",
              "Veriden Sonuç / Çıkarım Yapma",
              "Eksik Veri Tamamlama",
              "Oran - Yüzde Fark Üzerinden Grafik / Tablo Soruları",
              "Ortalama ve Basit İstatistiksel Yorumlama"
            ]
          },
          {
            id: "mantiksal-muhakeme",
            title: "3. Mantıksal Muhakeme Problemleri",
            topics: [
              "Sayı Örüntüleri ve Sayı Dizileri",
              "Şekil - Örüntü İlişkileri",
              "Sıralama Problemleri",
              "Eşleştirme Problemleri",
              "Gruplama ve Sınıflandırma",
              "Koşullu İfadeler ve Kısıtlar",
              "Tablo Oluşturma ve Seçenek Eleme",
              "Çok Adımlı Akıl Yürütme",
              "Verilenden Kesin / Olası Çıkarım Yapma",
              "Mantık İçeren Günlük Hayat Problemleri"
            ]
          }
        ]
      },
      {
        id: "sozel-yetenek",
        name: "Sözel Yetenek (Türkçe)",
        icon: "BookOpen",
        questionCount: 15,
        percentage: "%18.75",
        description: "Anlam bilgisi, anlatım kuralları ve sözel mantık",
        subcategories: [
          {
            id: "anlam-bilgisi",
            title: "1. Sözcük, Cümle ve Paragrafta Anlam",
            topics: [
              "Sözcükte Anlam (Gerçek, Yan, Mecaz, Terim)",
              "Söz Öbekleri, Deyimler ve Atasözleri",
              "Cümlede Anlam ve Anlatım Özellikleri",
              "Cümleler Arası Anlam İlişkileri",
              "Paragrafta Ana Düşünce ve Yardımcı Düşünceler",
              "Paragrafta Yapı (Giriş, Gelişme, Sonuç)",
              "Paragrafı İkiye Bölme ve Akışı Bozan Cümleler",
              "Anlatım Biçimleri ve Düşünceyi Geliştirme Yolları"
            ]
          },
          {
            id: "sozel-mantik",
            title: "2. Sözel Mantık ve Muhakeme",
            topics: [
              "Tablo ve Sıralama Kurma Yöntemleri",
              "Öncül Analizi ve Kesin Yargı Çıkarımı",
              "İhtimalli Durumlar ve Çapraz Eşleştirme"
            ]
          },
          {
            id: "dil-bilgisi",
            title: "3. Dil Bilgisi ve Yazım Kuralları",
            topics: [
              "Yazım Kuralları (TDK Güncel)",
              "Noktalama İşaretleri",
              "Anlatım Bozuklukları (Anlamsal ve Yapısal)"
            ]
          }
        ]
      },
      {
        id: "cografya",
        name: "Türkiye Coğrafyası",
        icon: "MapPin",
        questionCount: 6,
        percentage: "%7.5",
        description: "Fiziki, beşeri ve ekonomik coğrafya",
        subcategories: [
          {
            id: "fiziki-cografya",
            title: "1. Türkiye Fiziki Coğrafyası",
            topics: [
              "Türkiye'nin Coğrafi Konumu (Matematik ve Özel)",
              "Türkiye'de İklim - Sıcaklık",
              "Türkiye'de İklim - Basınç ve Rüzgarlar",
              "Türkiye'de İklim - Nem ve Yağış",
              "Türkiye'de İklim Tipleri ve Bitki Örtüsü",
              "Türkiye'de Yeryüzü Şekilleri - Dağlar",
              "Türkiye'nin Akarsuları ve Özellikleri",
              "Türkiye'nin Platoları",
              "Türkiye'nin Ovaları",
              "Türkiye'nin Gölleri, Göl ve Barajları",
              "Türkiye'de Doğal Afetler",
              "Türkiye'de Toprak Oluşumu ve Çeşitleri",
              "Türkiye'de Dış Kuvvetler (Karstik, Buzul, Dalga, Rüzgar)"
            ]
          },
          {
            id: "beseri-cografya",
            title: "2. Beşerî Coğrafya",
            topics: [
              "Türkiye'de Nüfusun Dağılışı ve Özellikleri",
              "Türkiye'de Göçler ve Yerleşme Tipleri"
            ]
          },
          {
            id: "ekonomik-cografya",
            title: "3. Ekonomik Coğrafya",
            topics: [
              "Türkiye'de Tarım ve Tarım Ürünleri",
              "Türkiye'de Hayvancılık",
              "Türkiye'de Madenler ve Enerji Kaynakları",
              "Türkiye'de Sanayi ve Dağılımı",
              "Türkiye'de Ulaşım Ağları",
              "Türkiye'de Ticaret",
              "Türkiye'de Turizm",
              "Türkiye'de Coğrafi Bölgeler ve Kalkınma Projeleri"
            ]
          }
        ]
      },
      {
        id: "tarih",
        name: "Tarih",
        icon: "Clock",
        questionCount: 6,
        percentage: "%7.5",
        description: "İlk Türk devletlerinden günümüze Türk ve Dünya tarihi",
        subcategories: [
          {
            id: "islamiyet-oncesi-selcuklu",
            title: "1. İslam Öncesi & İlk Türk-İslam Devletleri",
            topics: [
              "İslamiyet Öncesi Türk Tarihi ve Kültür-Uygarlığı",
              "İlk Türk-İslam Devletleri (Karahanlı, Gazneli, Selçuklular)",
              "Türkiye Selçuklu Devleti ve Anadolu Beylikleri"
            ]
          },
          {
            id: "osmanli-tarihi",
            title: "2. Osmanlı Tarihi ve Medeniyeti",
            topics: [
              "Osmanlı Kuruluş ve Yükselme Dönemleri",
              "Osmanlı Kültür ve Medeniyeti (Devlet, Toplum, Hukuk, Ordu)",
              "Osmanlı Duraklama, Gerileme ve Dağılma Dönemi Islahatları"
            ]
          },
          {
            id: "inkilap-cagdas",
            title: "3. Millî Mücadele, İnkılaplar & Çağdaş Tarih",
            topics: [
              "20. Yüzyıl Başlarında Osmanlı (Trablusgarp, Balkan, I. Dünya Savaşı)",
              "Millî Mücadele Hazırlık Dönemi (Genelgeler ve Kongreler)",
              "I. ve II. TBMM Dönemi ve Cepheler",
              "Atatürk İlkeleri ve İnkılapları",
              "Atatürk Dönemi Türk Dış Politikası",
              "Çağdaş Türk ve Dünya Tarihi"
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // 2. OTURUM: ÖABT - SINIF ÖĞRETMENLİĞİ (50 Soru - 70 Dakika)
  // ==========================================
  oabt: {
    title: "2. Oturum: ÖABT Sınıf Öğretmenliği (50 Soru)",
    totalQuestions: 50,
    categories: [
      {
        id: "alan-egitimi",
        name: "Alan Eğitimi Testi (%66 - ~33 Soru)",
        icon: "Layers",
        questionCount: 33,
        percentage: "%66",
        description: "İlkokul derslerinin özel öğretim yöntemleri ve kazanımları",
        subcategories: [
          {
            id: "turkce-egitimi",
            title: "1. Türkçe Eğitimi & İlk Okuma Yazma (~%20)",
            topics: [
              "Ses Temelli Cümle Yöntemi ve İlk Okuma Yazma Süreci",
              "Okuma Becerisi Öğretimi ve Okuma Güçlükleri (Disleksi vb.)",
              "Yazma Becerisi Öğretimi, Yazı Türleri ve Yazma Güçlükleri",
              "Dinleme / İzleme Becerileri ve Öğretim Süreci",
              "Konuşma Becerileri ve Sözlü İletişim Öğretimi",
              "İlkokul Türkçe MEB Müfredatı, Temalar ve Kazanım Analizi",
              "Türkçe Dersi Ölçme ve Değerlendirme Yöntemleri"
            ]
          },
          {
            id: "matematik-egitimi",
            title: "2. Matematik Eğitimi (~%20)",
            topics: [
              "Sayılar ve Sayı Kavramı Öğretimi (Doğal, Kesir, Ondalık)",
              "Geometri ve Uzamsal Düşünme Becerileri Öğretimi",
              "Ölçme Öğretimi (Uzunluk, Alan, Hacim, Zaman, Tartma)",
              "Veri İşleme ve Olasılık Kavramlarının İlkokul Düzeyinde Öğretimi",
              "Problem Çözme Süreçleri ve Öğretim Stratejileri (Polya Adımları)",
              "Matematiksel Kavram Yanılgıları ve Hata Analizi",
              "İlkokul Matematik MEB Müfredatı ve Sınıf Düzeyi Kazanımları"
            ]
          },
          {
            id: "sinif-yonetimi-oyt",
            title: "3. Sınıf Yönetimi ve Öğretim Yöntemleri (~%20)",
            topics: [
              "İlkokulda Sınıf Yönetimi Modelleri (Önleyici, Destekleyici, Düzeltici)",
              "İlkokul Düzeyine Uygun Öğretim Yöntemleri (Örnek Olay, İstasyon, Gösterip Yaptırma)",
              "Fiziksel Öğrenme Ortamı Düzenleme ve Oturma Düzenleri",
              "Davranış Yönetimi ve Kural Belirleme Süreci",
              "Bireysel Farklılıklar, Kapsayıcı Eğitim ve Kaynaştırma İlkeleri",
              "İlkokulda Ölçme-Değerlendirme (Rubrik, Portfolyo, Gözlem Formu)"
            ]
          },
          {
            id: "fen-egitimi",
            title: "4. Fen Bilgisi Eğitimi (~%13)",
            topics: [
              "Fen Öğretim Yaklaşımları (5E ve 7E Modeli, Sorgulama Tabanlı Öğrenme)",
              "Bilimsel Süreç Becerileri (Gözlem, Sınıflama, Hipotez Kurma vb.)",
              "İlkokul Öğrencilerinde Fen Kavram Yanılgıları ve Giderilme Yolları",
              "İlkokulda Basit Deney Tasarımı ve Laboratuvar Güvenliği",
              "İlkokul Fen Bilimleri MEB Müfredatı ve Kazanım Dağılımı"
            ]
          },
          {
            id: "sosyal-hayat-bilgisi",
            title: "5. Sosyal Bilgiler ve Hayat Bilgisi Eğitimi (~%20)",
            topics: [
              "Hayat Bilgisi Programının Amacı, Sarmal Yapısı ve Tema Odaklılığı",
              "Hayat Bilgisi Kazanım Sınıflandırması (Bilgi, Beceri, Değer, Tutum)",
              "Sosyal Bilgiler Öğretim Yaklaşımları (Vatandaşlık, Çevreden Evrene)",
              "Mekanı Algılama, Harita Okuma ve Zaman-Kronoloji Becerileri Öğretimi",
              "Değerler Eğitimi ve Kök Değerlerin İlkokulda Kazandırılması",
              "Sosyal Bilgiler MEB Müfredatı ve Öğrenme Alanları"
            ]
          },
          {
            id: "sanat-muzik-beden-drama",
            title: "6. Görsel Sanatlar, Müzik, Oyun-Fiziki Etkinlikler, Drama & DKAB (~%7)",
            topics: [
              "Görsel Sanatlar Öğretimi (Tasarım İlkeleri, Sanatsal Gelişim Evreleri)",
              "Müzik Öğretimi (Temel Ritim, Ses Açma, İlkokul Çocuk Şarkıları)",
              "Oyun ve Fiziki Etkinlikler (Motor Gelişim, Eğitsel Oyun Türleri)",
              "İlkokulda Yaratıcı Drama Aşamaları (Isınma, Canlandırma, Değerlendirme)",
              "Din Kültürü ve Ahlak Bilgisi İlkokul Öğretim Esasları"
            ]
          }
        ]
      },
      {
        id: "alan-bilgisi",
        name: "Alan Bilgisi Testi (%34 - ~17 Soru)",
        icon: "BookCheck",
        questionCount: 17,
        percentage: "%34",
        description: "Sınıf öğretmeninin hakim olması gereken temel akademik bilimler",
        subcategories: [
          {
            id: "temel-fen-matematik",
            title: "1. Temel Fen Bilimleri (%10) & Temel Matematik (%6)",
            topics: [
              "Temel Fizik (Madde, Hareket, Kuvvet, Enerji, Basit Makineler, Işık, Ses)",
              "Temel Kimya (Maddenin Halleri, Karışımlar, Asitler-Bazlar, Periyodik Sistem)",
              "Temel Biyoloji (Hücre, Canlıların Sınıflandırılması, Kalıtım, Çevre ve Ekoloji)",
              "İlkokul Matematik Alan Bilgisi (Sayı Kümeleri, Cebir, Temel Geometri)"
            ]
          },
          {
            id: "turk-dili-cocuk-edebiyati",
            title: "2. Türk Dili (%6) & Çocuk Edebiyatı (%4)",
            topics: [
              "Türk Dili (Ses Bilgisi, Biçim Bilgisi, Cümle Bilgisi, Anlam Bilimi)",
              "Dünya ve Türk Çocuk Edebiyatı Tarihsel Gelişimi",
              "Çocuk Kitaplarında Bulunması Gereken Nitelikler (Tasarım, Dil, İleti)",
              "Çocuk Edebiyatı Türleri (Masal, Fabl, Hikaye, Çizgi Roman, Şiir)"
            ]
          },
          {
            id: "tarih-cografya-kultur",
            title: "3. Türk Tarihi & Kültürü (%4) - Türkiye Coğrafyası & Jeopolitiği (%4)",
            topics: [
              "Türk Tarihi ve Kültürü Temel Dönüm Noktaları",
              "Kültürel Miras ve Anadolu Uygarlıkları",
              "Türkiye Coğrafyası, Doğal Kaynaklar ve Jeopolitik Konum"
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // 3. ÖZEL MODÜL: PSİKOLOJİK DANIŞMA KURAMLARI & ÇALIŞMA TAKVİMİ
  // ==========================================
  counselingAndSchedule: {
    title: "Psikolojik Danışma Kuramları & Çalışma Takvimi",
    description: "27 Terapi Kuramı, Aile Kuramları ve Özelleştirilebilir Çalışma Takvimi",
    kuramlar: [
      { id: "k1", name: "Psikanalitik Kuram", author: "Sigmund Freud" },
      { id: "k2", name: "Analitik Terapi", author: "Carl Gustav Jung" },
      { id: "k3", name: "Ego Psikolojisi", author: "Anna Freud / Hartmann" },
      { id: "k4", name: "Psiko-Sosyal Gelişim Kuramı", author: "Erik Erikson" },
      { id: "k5", name: "Bireysel Psikoloji Kuramı", author: "Alfred Adler" },
      { id: "k6", name: "Varoluşçu Terapi", author: "Yalom / May / Frankl" },
      { id: "k7", name: "Logoterapi", author: "Viktor Frankl" },
      { id: "k8", name: "Birey Merkezli Terapi", author: "Carl Rogers" },
      { id: "k9", name: "Davranışçı Terapi", author: "Watson / Skinner / Pavlov" },
      { id: "k10", name: "Bilişsel Terapi", author: "Aaron Beck" },
      { id: "k11", name: "Akılcı Duygusal Davranışçı Terapi (REBT)", author: "Albert Ellis" },
      { id: "k12", name: "Gerçeklik Terapisi (Seçim Kuramı)", author: "William Glasser" },
      { id: "k13", name: "Çözüm Odaklı Kısa Süreli Terapi", author: "Steve de Shazer / Insoo Kim Berg" },
      { id: "k14", name: "Öyküsel (Anlatı) Terapi", author: "Michael White / David Epston" },
      { id: "k15", name: "Nevrotik Kişilik Teorisi", author: "Karen Horney" },
      { id: "k16", name: "Transaksiyonel Analiz (İşlemsel Çözümleme)", author: "Eric Berne" },
      { id: "k17", name: "Feminist Terapi", author: "Carol Gilligan vb." },
      { id: "k18", name: "Duygu Odaklı Terapi", author: "Leslie Greenberg" },
      { id: "k19", name: "Diyalektik Davranış Terapisi (DBT)", author: "Marsha Linehan" },
      { id: "k20", name: "Şema Terapi", author: "Jeffrey Young" },
      { id: "k21", name: "Kabul ve Kararlılık Terapisi (ACT)", author: "Steven Hayes" },
      { id: "k22", name: "Çok Boyutlu Terapi", author: "Arnold Lazarus" },
      { id: "k23", name: "Özgürlükten Kaçış Kuramı", author: "Erich Fromm" },
      { id: "k24", name: "Kişilerarası İlişkiler Kuramı", author: "Harry Stack Sullivan" },
      { id: "k25", name: "Özellik-Faktör Yaklaşımı", author: "Gordon Allport" },
      { id: "k26", name: "Kişilik Özellik Kuramları", author: "Raymond Cattell & Hans Eysenck" },
      { id: "k27", name: "Kişisel Yapılar Kuramı", author: "George Kelly" }
    ],
    aileKuramlari: [
      { id: "ak1", name: "Aile Sistemleri Kuramı", author: "Murray Bowen" },
      { id: "ak2", name: "Yapısal Aile Terapisi", author: "Salvador Minuchin" },
      { id: "ak3", name: "Yaşantısal - İnsancıl Aile Danışmanlığı", author: "Virginia Satir" },
      { id: "ak4", name: "Stratejik Aile Danışmanlığı", author: "Jay Haley / MRI" },
      { id: "ak5", name: "Çözüm Odaklı ve Çok Kuşaklı Yaklaşımlar", author: "Genel Aile Kuramları" }
    ],
    dersProgrami: [
      { id: "plan_1", dateRange: "24 Ekim - 26 Aralık", title: "Danışma Kuramları (1 - 26. Dersler)", lessons: 26 },
      { id: "plan_2", dateRange: "27 - 28 Aralık", title: "Aile Danışmanlığı (27 ve 28. Dersler)", lessons: 2 },
      { id: "plan_3", dateRange: "2 - 4 Ocak", title: "Bireyle Psikolojik Danışma & Kuram Soru Çözümü", lessons: 3 },
      { id: "plan_4", dateRange: "10 - 30 Ocak", title: "Davranış ve Uyum Problemleri (9 Ders)", lessons: 9 },
      { id: "plan_5", dateRange: "31 Ocak - 1 Şubat", title: "Fizyolojik Psikoloji (2 Ders)", lessons: 2 },
      { id: "plan_6", dateRange: "6 - 15 Şubat", title: "Sosyal Psikoloji & Soru Çözümü (6 Ders)", lessons: 6 },
      { id: "plan_7", dateRange: "20 - 28 Şubat", title: "Öğrenme Psikolojisi (4 Ders)", lessons: 4 },
      { id: "plan_8", dateRange: "1 - 15 Mart", title: "Gelişim Psikolojisi (7 Ders)", lessons: 7 },
      { id: "plan_9", dateRange: "21 - 29 Mart", title: "Grupla Psikolojik Danışma (5 Ders)", lessons: 5 },
      { id: "plan_10", dateRange: "3 - 18 Nisan", title: "Mesleki Rehberlik ve Kariyer Planlama (7 Ders)", lessons: 7 },
      { id: "plan_11", dateRange: "19 Nisan", title: "Etik ve Yasal Konular (1 Ders)", lessons: 1 },
      { id: "plan_12", dateRange: "24 Nisan - 2 Mayıs", title: "Ölçme ve Test İstatistiği (5 Ders)", lessons: 5 },
      { id: "plan_13", dateRange: "3 Mayıs", title: "Örnekleme Yöntemleri ve Alan Eğitimi Giriş", lessons: 1 },
      { id: "plan_14", dateRange: "10 Mayıs", title: "Alan Eğitimi Kapanış (5 Ders)", lessons: 5 }
    ]
  }
};
