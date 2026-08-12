export type ServiceSection = {
  title: string;
  items: string[];
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: "flag" | "building" | "anchor" | "stamp" | "ship";
  summary: string;
  intro: string;
  sections: ServiceSection[];
};

export const services: Service[] = [
  {
    slug: "yat-bayrak-tescil-islemleri",
    title: "Yat Bayrak Tescil İşlemleri",
    shortTitle: "Bayrak Tescili",
    icon: "flag",
    summary:
      "Türkiye, İngiltere ve Palau bayrağı altında yat tescil işlemlerinizi baştan sona yürütüyoruz.",
    intro:
      "Yatınızın hangi bayrak altında tescil edileceği; vergi, sigorta, seyir serbestisi ve işletme modeli açısından en kritik kararlardan biridir. 2002'den beri edindiğimiz tecrübeyle, Türkiye, İngiltere ve Palau bayrak tescillerinde dosyanızı eksiksiz hazırlıyor, süreci sizin adınıza takip ediyoruz.",
    sections: [
      {
        title: "Türk Bayrağı",
        items: [
          "Bağlama kütüğü ruhsatname işlemleri",
          "Liman tescil işlemleri",
          "Tonilato ve denize elverişlilik belgeleri",
          "Ruhsatname yenileme ve vize işlemleri",
        ],
      },
      {
        title: "İngiltere (UK) Bayrağı",
        items: [
          "UK Ship Register tescil başvurusu",
          "Gerekli survey ve belge organizasyonu",
          "Yıllık yenileme takibi",
        ],
      },
      {
        title: "Palau Bayrağı",
        items: [
          "Palau International Ship Registry tescili",
          "Belge ve sertifika işlemleri",
          "Yenileme ve statü takibi",
        ],
      },
    ],
  },
  {
    slug: "sirket-kurulus-islemleri",
    title: "ABD ve İngiltere Şirket Kuruluş İşlemleri",
    shortTitle: "Şirket Kuruluşu",
    icon: "building",
    summary:
      "Tekne sahipliği ve uluslararası tescil için ABD (Delaware) ve İngiltere'de şirket kuruluşu.",
    intro:
      "Yabancı bayrak tescillerinin çoğu, tescilin yapılacağı ülkede kurulu bir şirket üzerinden yürütülür. ABD (Delaware) ve İngiltere'de şirket kuruluşunu, yıllık yükümlülüklerin takibiyle birlikte tek elden yönetiyoruz.",
    sections: [
      {
        title: "Kapsam",
        items: [
          "ABD Delaware eyaletinde şirket kuruluşu",
          "İngiltere'de (UK Ltd.) şirket kuruluşu",
          "Şirket üzerine tekne tescil işlemleri",
          "Yıllık yenileme, beyan ve harç takibi",
          "Kayıtlı temsilci (registered agent) organizasyonu",
        ],
      },
    ],
  },
  {
    slug: "acentelik-hizmetleri",
    title: "Acentelik Hizmetleri",
    shortTitle: "Acentelik",
    icon: "anchor",
    summary:
      "Türk ve yabancı bayraklı özel ve ticari teknelerin tüm liman, belge ve seyir işlemleri.",
    intro:
      "Tek işimiz acentelik ve müşavirlik. Türk ve yabancı bayraklı, özel ve ticari tüm tekneler için liman başkanlıkları, gümrük ve ilgili kurumlar nezdindeki işlemlerinizi sizin adınıza yürütüyoruz.",
    sections: [
      {
        title: "Türk Bayraklı Özel Tekneler",
        items: [
          "Liman tescil işlemleri",
          "Bağlama kütüğü ruhsatname işlemleri",
          "Kıyı Emniyeti telsiz ruhsatname işlemleri",
          "İthalat ve ihracat işlemleri",
          "Yeni inşa teknelerin liman izin işlemleri",
          "Yurtdışı çıkış – yurtiçi giriş işlemleri",
          "ADB & KMT yenileme işlemleri",
          "Tekne sigortası",
        ],
      },
      {
        title: "Yabancı Bayraklı Özel Tekneler",
        items: [
          "Yurt dışında şirket kurma ve tekne tescil işlemleri (ABD)",
          "Transitlog (Seyir İzin Belgesi) işlemleri",
          "Yurtdışı çıkış ve yurtiçi giriş işlemleri",
          "Konsolosluk işlemleri",
          "Gümrükleme işlemleri",
          "Yabancı uyruklu tekne personeli için ikamet tezkeresi işlemleri",
          "Tekne sigortası",
        ],
      },
      {
        title: "Türk Bayraklı Ticari Tekneler",
        items: [
          "Liman tescil işlemleri",
          "Liman çıkış belgesi işlemleri",
          "İthalat ve ihracat işlemleri",
          "Gemi sağlık cüzdanı işlemleri",
          "Kıyı Emniyeti telsiz ruhsatnamesi işlemleri",
          "Yurtdışı çıkış ve yurtiçi giriş işlemleri",
          "2581 sayılı liman vergi muafiyeti işlemleri",
          "Deniz turizmi araçları turizm işletme belge işlemleri",
          "Alkollü içki ruhsat işlemleri",
          "Yeni inşa teknelerin liman izin işlemleri",
          "Tekne sigortası",
        ],
      },
      {
        title: "Yabancı Bayraklı Ticari Tekneler",
        items: [
          "Yat işletme belgesi işlemleri",
          "Yurtdışı çıkış ve yurtiçi giriş işlemleri",
          "P&I işlemleri",
          "Tekne sigortası",
        ],
      },
    ],
  },
  {
    slug: "gumruk-islemleri",
    title: "Gümrük İşlemleri",
    shortTitle: "Gümrük",
    icon: "stamp",
    summary:
      "Teknelerin ithalat, ihracat ve gümrükleme süreçleri ile transitlog işlemleri.",
    intro:
      "Tekne alım-satımında ve bayrak değişikliklerinde gümrük süreci, işin en fazla uzmanlık isteyen ayağıdır. İthalat, ihracat ve gümrükleme işlemlerinizi ilgili mevzuata uygun şekilde, gecikmesiz tamamlıyoruz.",
    sections: [
      {
        title: "Kapsam",
        items: [
          "Tekne ithalat işlemleri",
          "Tekne ihracat işlemleri",
          "Gümrükleme işlemleri",
          "Transitlog (Seyir İzin Belgesi) işlemleri",
          "2581 sayılı liman vergi muafiyeti işlemleri",
          "Konsolosluk işlemleri",
        ],
      },
    ],
  },
  {
    slug: "ticari-yat-ve-balikci-gemileri",
    title: "Ticari Yat ve Balıkçı Gemileri İşlemleri",
    shortTitle: "Ticari Gemi & Balıkçı",
    icon: "ship",
    summary:
      "Ticari yatlar ve balıkçı gemileri için belge, ruhsat ve işletme izin süreçleri.",
    intro:
      "Ticari yat işletmeciliği ve balıkçılık, sürekli güncellenen mevzuata tabidir. İşletme belgelerinden liman işlemlerine kadar tüm resmi süreçleri takip ediyor, teknelerinizin her an sefere hazır olmasını sağlıyoruz.",
    sections: [
      {
        title: "Kapsam",
        items: [
          "Yat işletme belgesi işlemleri",
          "Deniz turizmi araçları turizm işletme belgesi",
          "Liman çıkış belgesi işlemleri",
          "Gemi sağlık cüzdanı işlemleri",
          "Gemilerin gemi adamları ile donatılması işlemleri",
          "Balıkçı gemisi ruhsat ve tescil işlemleri",
          "P&I ve tekne sigortası",
        ],
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
