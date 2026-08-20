// Teknik ayarlar: panelden düzenlenir, site_settings("teknik") altında saklanır.

export type TechnicalSettings = {
  // <head> içine eklenecek ham kod (Search Console doğrulaması, analytics vb.)
  headCode: string;
  smtp: {
    host: string;
    port: number;
    user: string;
    pass: string;
    from: string;
  };
  // Formdan gelen e-postaların alıcıları (virgülle ayrılır)
  mailTo: string;
  // Google reCAPTCHA v2 ("Ben robot değilim") — iki anahtar da doluysa devreye girer
  recaptcha: {
    siteKey: string;
    secretKey: string;
  };
  // public/teknik altındaki favicon yolu, null → varsayılan ikon
  favicon: string | null;
  seo: {
    title: string;
    description: string;
  };
  // true → arama motorlarına kapalı: noindex meta + robots.txt engeli (demo yayını için)
  noindex: boolean;
  // Sitemap'e eklenecek sabit yollar (hizmet ve duyuru sayfaları otomatik eklenir)
  sitemap: string[];
};

export const defaultTechnicalSettings: TechnicalSettings = {
  headCode: "",
  smtp: { host: "", port: 587, user: "", pass: "", from: "" },
  mailTo: "",
  recaptcha: { siteKey: "", secretKey: "" },
  favicon: null,
  noindex: false,
  seo: {
    title: "Ege Yatçılık | Gemi Acenteliği & Müşavirlik",
    description:
      "Ege Yatçılık: 2002'den beri İzmir'de yat bayrak tescili, şirket kuruluşu, acentelik, gümrük ve ticari gemi işlemleri.",
  },
  sitemap: [
    "/",
    "/hakkimizda",
    "/hizmetlerimiz",
    "/duyurular",
    "/mevzuat",
    "/iletisim",
    "/kvkk",
    "/gizlilik-politikasi",
    "/cerez-politikasi",
  ],
};
