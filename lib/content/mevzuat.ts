export type MevzuatItem = {
  title: string;
  href: string | null; // null → belge/PDF sonra eklenecek
};

export const mevzuatList: MevzuatItem[] = [
  { title: "Yat Turizmi Yönetmeliği", href: null },
  {
    title:
      "Kültür ve Turizm Bakanlığı Deniz Turizmi Yönetmeliği Uygulama Tebliği",
    href: null,
  },
  {
    title: "Yat Satışında Düzenlenen (Bill of Sale) Damga Vergisi",
    href: null,
  },
  {
    title:
      "Özel Tekne ve Kullanacak Kişilerin Yeterliliği Hakkında Yönetmelik",
    href: null,
  },
  {
    title: "Gemilerin Gemi Adamları ile Donatılmasına İlişkin Yönerge",
    href: null,
  },
];

export const usefulLinks = [
  { title: "Ulaştırma ve Altyapı Bakanlığı", href: "https://www.uab.gov.tr/" },
  {
    title: "Kıyı Emniyeti Genel Müdürlüğü",
    href: "https://www.kiyiemniyeti.gov.tr/",
  },
  {
    title: "ADB Sınav Başvuru Sistemi",
    href: "https://adbs.uab.gov.tr/giris",
  },
  {
    title: "Liman Başkanlıkları Randevu (Umurbey)",
    href: "https://umurbey.uab.gov.tr/Vatandas/Login",
  },
  {
    title: "Deniz Ticaret Odası",
    href: "https://www.denizticaretodasi.org.tr/",
  },
  { title: "Ticaret Bakanlığı", href: "https://ticaret.gov.tr/" },
  {
    title: "Hudut ve Sahiller Sağlık Genel Müdürlüğü",
    href: "https://www.hssgm.gov.tr/",
  },
  { title: "Kültür ve Turizm Bakanlığı", href: "https://www.ktb.gov.tr/" },
];
