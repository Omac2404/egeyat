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
        text: "Bağlama kütüğüne kayıtlı gemi, deniz ve iç su araçlarının 2026 yılı ruhsatname harç bedelleri, tekne boyuna göre aşağıdaki şekilde uygulanacaktır. (Demo içerik — güncel tutarlar yayın öncesi eklenecektir.)",
      },
      {
        type: "table",
        caption: "2026 Yılı Bağlama Kütüğü Ruhsatname Harç Bedelleri",
        head: ["Tekne Boyu", "Harç Tutarı"],
        rows: [
          ["5 metreden 8,99 metreye kadar", "— TL"],
          ["9 metreden 11,99 metreye kadar", "— TL"],
          ["12 metreden 19,99 metreye kadar", "— TL"],
          ["20 metreden 29,99 metreye kadar", "— TL"],
          ["30 metre ve üzeri", "— TL"],
        ],
      },
      {
        type: "p",
        text: "Ruhsatname ve vize işlemleriniz için ofislerimizle iletişime geçebilirsiniz; işlemleri sizin adınıza sonuçlandırıyoruz.",
      },
    ],
  },
  {
    slug: "2026-transitlog-seyir-izin-harclari",
    title: "2026 Transitlog (Seyir İzin Belgesi) Harçları",
    date: "2026-01-05",
    summary:
      "Yabancı bayraklı tekneler için 2026 yılı transitlog seyir izin belgesi harçları güncellendi.",
    blocks: [
      {
        type: "p",
        text: "Yabancı bayraklı özel ve ticari teknelerin Türk karasularındaki seyirleri için düzenlenen Seyir İzin Belgesi (Transitlog) harç tutarları 2026 yılı için güncellenmiştir. (Demo içerik — güncel tutarlar yayın öncesi eklenecektir.)",
      },
      {
        type: "p",
        text: "Transitlog işlemlerinizin tamamı — başvuru, harç ödemesi ve belge teslimi — acenteliğimiz tarafından yürütülmektedir.",
      },
    ],
  },
  {
    slug: "2026-transitlog-ucretleri",
    title: "2026 Transitlog Ücretleri",
    date: "2026-01-05",
    summary:
      "2026 yılında uygulanacak transitlog düzenleme ücretlerine ilişkin bilgilendirme.",
    blocks: [
      {
        type: "p",
        text: "2026 yılında uygulanacak transitlog düzenleme ücretleri belirlenmiştir. Detaylı bilgi ve işlem başvurusu için ofislerimize ulaşabilirsiniz. (Demo içerik — güncel tutarlar yayın öncesi eklenecektir.)",
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
