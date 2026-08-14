// NOT: Demo içerik — tutarlar ve tarihler yayın öncesi firma tarafından
// iletilecek güncel değerlerle değiştirilecek. Bu bölüm admin panelinden
// yönetilebilir hale getirilecek (yıllık harç güncellemeleri için).

export type AnnouncementBlock =
  | { type: "p"; text: string }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "link"; href: string; label: string };

export type Announcement = {
  slug: string;
  title: string;
  date: string; // ISO
  summary: string;
  blocks: AnnouncementBlock[];
};

export const announcements: Announcement[] = [
  {
    slug: "2026-baglama-kutugu-ruhsatname-harclari",
    title: "2026 Yılı Bağlama Kütüğü Ruhsatname Harçları",
    date: "2026-01-05",
    summary:
      "2026 yılı için bağlama kütüğü ruhsatname harç tutarları açıklandı. Tekne boyuna göre güncel tutarları inceleyebilirsiniz.",
    blocks: [
      {
        type: "p",
        text: "Bağlama kütüğüne kayıtlı gemi, deniz ve iç su araçlarının 2026 yılı ruhsatname harç bedelleri, tekne boyuna göre aşağıdaki şekilde uygulanacaktır.",
      },
      {
        type: "table",
        caption: "2026 Yılı Bağlama Kütüğü Ruhsatname Harç Bedelleri",
        head: ["Tekne Boyu", "Harç Tutarı"],
        rows: [
          ["5 metreden 6,99 metreye kadar olanlardan", "5.992,10 ₺"],
          ["7 metreden 8,99 metreye kadar olanlardan", "8.560,20 ₺"],
          ["9 metreden 11,99 metreye kadar olanlardan", "12.840,20 ₺"],
          ["12 metreden 14,99 metreye kadar olanlardan", "25.680,70 ₺"],
          ["15 metreden 19,99 metreye kadar olanlardan", "42.801,10 ₺"],
          ["20 metreden 29,99 metreye kadar olanlardan", "85.602,30 ₺"],
          ["30 metre ve daha büyük olanlardan", "171.204,70 ₺"],
        ],
      },
      {
        type: "p",
        text: "Bağlama Kütüğü Ruhsatnameleri 1, 2, 3, 4 ve 5 yıl geçerlilik süresiyle düzenlenebilmektedir. Yukarıdaki tabloda 1 yıllık harç miktarı yazılmıştır.",
      },
      {
        type: "p",
        text: "Ruhsatname ve vize işlemleriniz için ofislerimizle iletişime geçebilirsiniz; işlemleri sizin adınıza sonuçlandırıyoruz.",
      },
    ],
  },
  {
    slug: "2026-turk-bayrakli-transitlog-ucretleri",
    title: "2026 Yılı Türk Bayraklı Yatların Seyir İzin Belgesi (Transitlog) Ücretleri",
    date: "2026-01-05",
    summary:
      "Türk bayraklı yatların 2026 yılı seyir izin belgesi (transitlog) harç ve belge ücretleri açıklandı.",
    blocks: [
      {
        type: "p",
        text: "Türk bayraklı yatların 2026 yılı Seyir İzin Belgesi (Transitlog) harç tutarları ve belge ücretleri, tekne boyuna göre aşağıdaki şekilde uygulanacaktır.",
      },
      {
        type: "table",
        caption: "2026 Yılı Türk Bayraklı Yatların Transitlog Ücretleri",
        head: ["Tekne Boyu", "Harç Tutarı", "Belge Ücreti"],
        rows: [
          ["5 metreden 9,99 metreye kadar olanlardan", "513,59 ₺", "900,00 ₺"],
          ["10 metreden 14,99 metreye kadar olanlardan", "1.027,30 ₺", "900,00 ₺"],
          ["15 metreden 19,99 metreye kadar olanlardan", "1.712,05 ₺", "900,00 ₺"],
          ["20 metreden 24,99 metreye kadar olanlardan", "5.136,15 ₺", "900,00 ₺"],
          ["25 metreden 29,99 metreye kadar olanlardan", "8.560,24 ₺", "900,00 ₺"],
          ["30 metreden 39,99 metreye kadar olanlardan", "17.120,48 ₺", "900,00 ₺"],
          ["40 metre ve daha büyük olanlardan", "34.257,60 ₺", "900,00 ₺"],
        ],
      },
      {
        type: "p",
        text: "Transitlog işlemlerinizin tamamı (başvuru, harç ödemesi ve belge teslimi) acenteliğimiz tarafından yürütülmektedir.",
      },
    ],
  },
  {
    slug: "2026-yabanci-bayrakli-transitlog-ucretleri",
    title: "2026 Yılı Yabancı Bayraklı Yatların Seyir İzin Belgesi (Transitlog) Ücretleri",
    date: "2026-01-05",
    summary:
      "Yabancı bayraklı yatların 2026 yılı seyir izin belgesi (transitlog) harç ve belge ücretleri açıklandı.",
    blocks: [
      {
        type: "p",
        text: "Yabancı bayraklı özel ve ticari yatların Türk karasularındaki seyirleri için düzenlenen Seyir İzin Belgesi (Transitlog) 2026 yılı harç tutarları ve belge ücretleri, tekne boyuna göre aşağıdaki şekilde uygulanacaktır.",
      },
      {
        type: "table",
        caption: "2026 Yılı Yabancı Bayraklı Yatların Transitlog Ücretleri",
        head: ["Tekne Boyu", "Harç Tutarı", "Belge Ücreti"],
        rows: [
          ["5 metreden 9,99 metreye kadar olanlardan", "1.540,70 ₺", "70,00 €"],
          ["10 metreden 14,99 metreye kadar olanlardan", "3.081,60 ₺", "70,00 €"],
          ["15 metreden 19,99 metreye kadar olanlardan", "5.136,10 ₺", "70,00 €"],
          ["20 metreden 24,99 metreye kadar olanlardan", "15.408,40 ₺", "70,00 €"],
          ["25 metreden 29,99 metreye kadar olanlardan", "25.680,70 ₺", "70,00 €"],
          ["30 metreden 39,99 metreye kadar olanlardan", "51.361,40 ₺", "70,00 €"],
          ["40 metre ve daha büyük olanlardan", "102.722,80 ₺", "70,00 €"],
        ],
      },
      {
        type: "p",
        text: "Tablolarda belirtilen tutarlar, her yıl Ocak ayında yayımlanan tebliğe göre güncellenmektedir. Transitlog işlemlerinizin tamamı (başvuru, harç ödemesi ve belge teslimi) acenteliğimiz tarafından yürütülmektedir.",
      },
    ],
  },
  {
    slug: "amator-denizci-belgesi-sinavi",
    title: "Amatör Denizci Belgesi Sınavı",
    date: "2026-01-26",
    summary:
      "Amatör denizci belgesi ve kısa mesafe telsiz sınav başvurularınızı e-Devlet üzerinden yapabilirsiniz.",
    blocks: [
      {
        type: "p",
        text: "Amatör Denizci Belgesi (ADB) sınavı ve Kısa Mesafe Telsiz (KMT) sınav başvurularınızı aşağıdaki resmi bağlantı üzerinden gerçekleştirebilirsiniz.",
      },
      {
        type: "link",
        href: "https://adbs.uab.gov.tr/giris",
        label: "ADB Sınav Başvuru Sistemi",
      },
    ],
  },
  {
    slug: "liman-baskanliklari-randevu",
    title: "Liman Başkanlıkları Randevu Sistemi",
    date: "2026-01-26",
    summary:
      "Liman başkanlıklarında yapılacak işlemler için önceden randevu alınması gerekmektedir.",
    blocks: [
      {
        type: "p",
        text: "Liman başkanlıklarında yapılacak işlemler için randevu alınması gerekmektedir. Randevu işleminizi aşağıdaki bağlantıdan gerçekleştirebilirsiniz.",
      },
      {
        type: "link",
        href: "https://umurbey.uab.gov.tr/Vatandas/Login",
        label: "Umurbey Randevu Sistemi",
      },
    ],
  },
];

export function getAnnouncement(slug: string) {
  return announcements.find((a) => a.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
