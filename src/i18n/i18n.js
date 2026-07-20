import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      nav: {
        suites: 'Suites', experiences: 'Experiences', restaurants: 'Restaurants',
        spa: 'Spa & Wellness', cars: 'Luxury Cars', events: 'Events',
        concierge: 'Concierge', loyalty: 'Loyalty', reserve: 'Reserve Now',
      },
      hero: {
        title: 'Experience Luxury Beyond Imagination',
        sub: 'A world where hospitality meets exclusivity.',
        cta1: 'Reserve Your Stay', cta2: 'Explore Experiences',
      },
      booking: {
        title: 'Reserve Your Stay', checkin: 'Check-in', checkout: 'Check-out',
        guests: 'Guests', roomType: 'Room Type', currency: 'Currency',
        specialReq: 'Special Requests', book: 'Book Now',
      },
      common: {
        bookNow: 'Book Now', learnMore: 'Learn More', viewAll: 'View All',
        perNight: 'per night', from: 'From', reserve: 'Reserve',
        close: 'Close', loading: 'Loading...', confirm: 'Confirm',
        cancel: 'Cancel', save: 'Save', edit: 'Edit', delete: 'Delete',
      },
    },
  },
  ar: {
    translation: {
      nav: {
        suites: 'الأجنحة', experiences: 'التجارب', restaurants: 'المطاعم',
        spa: 'السبا والعافية', cars: 'السيارات الفاخرة', events: 'الفعاليات',
        concierge: 'الكونسيرج', loyalty: 'برنامج الولاء', reserve: 'احجز الآن',
      },
      hero: {
        title: 'تجربة الفخامة ما وراء الخيال',
        sub: 'عالم تلتقي فيه الضيافة مع الحصرية.',
        cta1: 'احجز إقامتك', cta2: 'اكتشف التجارب',
      },
      booking: {
        title: 'احجز إقامتك', checkin: 'تسجيل الدخول', checkout: 'تسجيل الخروج',
        guests: 'الضيوف', roomType: 'نوع الغرفة', currency: 'العملة',
        specialReq: 'طلبات خاصة', book: 'احجز الآن',
      },
      common: {
        bookNow: 'احجز الآن', learnMore: 'اعرف أكثر', viewAll: 'عرض الكل',
        perNight: 'في الليلة', from: 'من', reserve: 'احجز',
        close: 'إغلاق', loading: 'جاري التحميل...', confirm: 'تأكيد',
        cancel: 'إلغاء', save: 'حفظ', edit: 'تعديل', delete: 'حذف',
      },
    },
  },
  ru: {
    translation: {
      nav: {
        suites: 'Сьюты', experiences: 'Впечатления', restaurants: 'Рестораны',
        spa: 'Спа', cars: 'Авто', events: 'События', concierge: 'Консьерж',
        loyalty: 'Лояльность', reserve: 'Забронировать',
      },
      hero: {
        title: 'Роскошь, превосходящая воображение',
        sub: 'Мир, где гостеприимство встречается с эксклюзивностью.',
        cta1: 'Забронировать', cta2: 'Узнать больше',
      },
      common: { bookNow: 'Забронировать', learnMore: 'Подробнее', perNight: 'за ночь', from: 'От' },
    },
  },
  zh: {
    translation: {
      nav: {
        suites: '套房', experiences: '体验', restaurants: '餐厅',
        spa: '水疗', cars: '豪车', events: '活动', concierge: '礼宾',
        loyalty: '忠诚计划', reserve: '立即预订',
      },
      hero: {
        title: '超越想象的奢华体验',
        sub: '一个款待与独特相遇的世界。',
        cta1: '预订住宿', cta2: '探索体验',
      },
      common: { bookNow: '立即预订', learnMore: '了解更多', perNight: '每晚', from: '起' },
    },
  },
  fr: {
    translation: {
      nav: {
        suites: 'Suites', experiences: 'Expériences', restaurants: 'Restaurants',
        spa: 'Spa & Bien-être', cars: 'Voitures de luxe', events: 'Événements',
        concierge: 'Conciergerie', loyalty: 'Fidélité', reserve: 'Réserver',
      },
      hero: {
        title: 'Un Luxe au-delà de l\'Imagination',
        sub: 'Un monde où l\'hospitalité rencontre l\'exclusivité.',
        cta1: 'Réserver', cta2: 'Explorer',
      },
      common: { bookNow: 'Réserver', learnMore: 'En savoir plus', perNight: 'par nuit', from: 'Dès' },
    },
  },
  de: {
    translation: {
      nav: {
        suites: 'Suiten', experiences: 'Erlebnisse', restaurants: 'Restaurants',
        spa: 'Spa & Wellness', cars: 'Luxusautos', events: 'Events',
        concierge: 'Concierge', loyalty: 'Treueclub', reserve: 'Jetzt buchen',
      },
      hero: {
        title: 'Luxus jenseits der Vorstellungskraft',
        sub: 'Eine Welt, in der Gastfreundschaft auf Exklusivität trifft.',
        cta1: 'Aufenthalt buchen', cta2: 'Erlebnisse entdecken',
      },
      common: { bookNow: 'Buchen', learnMore: 'Mehr erfahren', perNight: 'pro Nacht', from: 'Ab' },
    },
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })

export default i18n
