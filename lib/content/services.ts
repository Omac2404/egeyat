export type ServiceSection = {
  title: string;
  description?: string;
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
    slug: "turk-bayrakli-tekneler",
    title: "Türk Bayraklı Tekneler",
    shortTitle: "Türk Bayrağı",
    icon: "flag",
    summary:
      "Özel ve ticari Türk bayraklı teknelerin tescil, belge ve liman işlemlerinin tamamı.",
    intro:
      "Türk bayraklı özel ve ticari teknelerin liman başkanlıkları, gümrük ve ilgili kurumlar nezdindeki tüm işlemlerini sizin adınıza yürütüyor; süreli evraklarınızı takip edip gerekli hatırlatmaları yapıyoruz.",
    sections: [
      {
        title: "Özel Tekne",
        items: [
          "Bağlama Kütüğü Ruhsatnamesi işlemleri (isim onayı, ölçüm, ilk tescil, alış-satış, süre yenileme, makine değişikliği, cins değişikliği, nakil)",
          "Telsiz Ruhsatnamesi (Gemi istasyon ruhsatnamesi) işlemleri (ilk kurulum, süre yenileme, alış-satış, cihaz ekleme ve çıkartma, gemi bilgilerinde değişiklik, çağrı kodu, MMSI ve IMO numarası alınması)",
          "Yeni inşa edilecek teknelerin inşa izin belgelerinin alınması",
          "İthalat, geçici ithalat, ihracat, geçici ihracat işlemleri (transit gümrükleme, TIR karnesi ve T1/T2 işlemleri)",
          "Gemi inşa izni ve 24 metre üstü tekneler için proje işlemleri",
          "Tekne sigorta işlemleri",
          "Yurt dışı çıkış ve yurt içi giriş işlemleri (Seyir İzin Belgesi \"Transitlog\")",
          "ADB 10 / ADB 24 (Amatör Denizci Belgesi) ve KMT (Kısa Mesafe Telsiz) yenileme, zayi işlemleri",
          "Süreli evrakların takibi ve gerekli hatırlatmaların yapılması",
        ],
      },
      {
        title: "Ticari Tekne",
        items: [
          "Liman Başkanlığı tescil işlemleri",
          "Gemi inşa izni ve proje işlemleri",
          "Denize elverişlilik belge işlemleri (başlangıç, şaft, kara ve deniz sörveyi)",
          "Uluslararası tonilato belge işlemleri",
          "Gemi sicil işlemleri (Milli Gemi Sicili ve TUGS)",
          "Su ürünleri ruhsat tezkeresi işlemleri (yeşil ruhsat, balık avlama ve balıkçılık yardımcı gemisi)",
          "ÖTV'siz yakıt alım defteri ve gemi hareket jurnali işlemleri",
          "Liman çıkış belgesi işlemleri",
          "Gemi sahil sağlık belgesi işlemleri",
          "PAL 2002 sertifika işlemleri",
          "İthalat, geçici ithalat, ihracat, geçici ihracat işlemleri (transit gümrükleme, TIR karnesi ve T1/T2 işlemleri)",
          "Telsiz Ruhsatnamesi (Gemi istasyon ruhsatnamesi) işlemleri (ilk kurulum, süre yenileme, alış-satış, cihaz ekleme ve çıkartma, gemi bilgilerinde değişiklik, çağrı kodu, MMSI ve IMO numarası alınması)",
          "Yurt dışı çıkış ve yurt içi giriş işlemleri",
          "Tekne sigorta işlemleri",
          "Gemi insanları asgari donatım belgesi işlemleri",
          "2581 sayılı vergi muafiyeti işlemleri",
          "Deniz Turizmi Araçları Turizm İşletme belge işlemleri",
          "Süreli evrakların takibi ve gerekli hatırlatmaların yapılması",
        ],
      },
    ],
  },
  {
    slug: "yabanci-bayrakli-tekneler",
    title: "Yabancı Bayraklı Tekneler",
    shortTitle: "Yabancı Bayrak",
    icon: "ship",
    summary:
      "İngiltere, Jersey ve Palau başta olmak üzere yabancı bayrak tescil işlemlerinin tamamı.",
    intro:
      "Teknenizin tescil işlemleri için hizmet verdiğimiz bayrakları tercih edebilirsiniz. Tekne bilgilerinize göre size en uygun bayrak için iletişim adreslerimizden detaylı bilgi alabilirsiniz.",
    sections: [
      {
        title: "İngiltere Bayrağı",
        description:
          "İngiltere tescil (Registration) belgesi QR kodlu olarak yayınlanmaktadır; belge istediğiniz anda sorgulanabilir ve doğrulanabilir. İngiltere bayrağında 116 bağlama sicil limanı bulunmaktadır. Londra (London), İngiltere bayrağındaki en popüler kayıt limanıdır.",
        items: [
          "3 aylık geçici register",
          "5 yıllık kalıcı register",
          "Tonaj ölçüm sörveyi",
          "Ship Radio Licence (Call Sign & MMSI)",
          "Carving and Marking Note",
          "Tonaj plakası",
          "Tekne kaşesi",
          "İngiltere bayrağı",
          "Donatan ve isim değişikliği",
          "Seyir İzin Belgesi (Transitlog)",
          "Kaptan yetki belgesi",
          "Tekne devir işlemleri (Bill of Sale)",
          "Kayıt kapama (Certificate of Deletion)",
        ],
      },
      {
        title: "Jersey Bayrağı",
        description:
          "Jersey Gemi Sicili uluslararası bir sicildir; dünyanın herhangi bir yerinde bulunan ve kullanılan 399 GT'ye kadar olan özel ve ticari yatları kabul etmektedir. Jersey tescil (Register) belgesi \"Blue Book\" olarak bilinir ve geleneksel olarak A3 boyutunda orijinal olarak yayınlanır.",
        items: [
          "10 yıllık kalıcı register",
          "Tonaj ölçüm sörveyi",
          "Çağrı kodu ve MMSI numarası",
          "Carving and Marking Note",
          "Tonaj plakası",
          "Jersey bayrağı",
          "Donatan ve isim değişikliği",
          "Seyir İzin Belgesi (Transitlog)",
          "Kaptan yetki belgesi",
          "Tekne devir işlemleri (Bill of Sale)",
          "Kayıt kapama (Certificate of Deletion)",
        ],
      },
      {
        title: "Palau Bayrağı",
        description:
          "Palau bayrağı tekne tescili, 24 metreye kadar olan tekneler için dünya genelinde yat sahipleri tarafından tercih edilen alternatif bir yabancı bayrak kayıt sistemidir. Palau tescil (Registration) belgesi QR kodlu olarak yayınlanır; belge istediğiniz anda sorgulanabilir ve doğrulanabilir.",
        items: [
          "3 aylık geçici register",
          "1, 3 ve 5 yıllık kalıcı register",
          "Sörvey işlemleri",
          "Ship Radio Licence (Call Sign & MMSI)",
          "Palau bayrağı",
          "Donatan ve isim değişikliği",
          "Seyir İzin Belgesi (Transitlog)",
          "Kaptan yetki belgesi",
          "Tekne devir işlemleri (Bill of Sale)",
          "Kayıt kapama (Certificate of Deletion)",
        ],
      },
      {
        title: "Diğer Yabancı Bayraklar",
        description:
          "Aşağıdaki bayraklar için de tescil hizmeti sunuyoruz:",
        items: [
          "Cayman Islands",
          "Isle of Man",
          "British Virgin Islands",
          "Malta",
          "Polonya (Poland)",
          "Marshall Islands",
          "San Marino",
          "St. Vincent & the Grenadines",
          "Saint Kitts & Nevis",
        ],
      },
    ],
  },
  {
    slug: "sirket-kurulus-islemleri",
    title: "Şirket Kuruluş İşlemleri",
    shortTitle: "Şirket Kuruluşu",
    icon: "building",
    summary:
      "Yabancı bayrak tescili için İngiltere (UK) ve ABD (Delaware) merkezli şirket kuruluşu ve yıllık takibi.",
    intro:
      "Hizmetini verdiğimiz yabancı bayrakların tescil (Register) işlemleri için bayrak devletlerinin kabul ettiği ülkelerde kurulu bir şirketiniz varsa, teknenizi kurulu şirketiniz adına tescil edebiliriz. Kurulu bir şirketiniz yoksa sizin adınıza Amerika Birleşik Devletleri'nin Delaware eyaletinde veya İngiltere'de (UK) şirket kurulumu yapabiliriz. Denizcilik acenteliği tecrübemizle şirket kurulum süreçlerini baştan sona profesyonelce yönetiyoruz.",
    sections: [
      {
        title: "Avantajları",
        items: [
          "Prestijli bayrak tescili: İngiltere ve ABD tescilli şirketler aracılığıyla teknenize uluslararası sularda geçerliliği ve saygınlığı yüksek bayrak kayıtları sağlanır.",
          "Hukuki koruma ve varlık güvenliği: Teknenin tüzel kişilik (şirket) adına kayıtlı olması, mülkiyetin yasal çerçevede korunmasını ve olası sorumlulukların ayrıştırılmasını sağlar.",
          "Kolay ve hızlı devir işlemleri: Tekne satışı veya hisse devri durumlarında bürokratik süreçler çok daha hızlı tamamlanır.",
          "Gizlilik ve kurumsal yapı: Mülkiyetin tüzel kişilik üzerinden yürütülmesi, uluslararası denizcilik regülasyonlarına tam uyum ve kurumsal bir yapı sunar.",
        ],
      },
      {
        title: "Sunduğumuz Kapsamlı Hizmetler",
        items: [
          "Şirket kuruluşu: İngiltere veya ABD'de şirketinizin (LLC / LTD) resmi tescilinin yapılması",
          "Yıllık takip ve temsilcilik: Yasal adres (Registered Agent), resmi vergi ve yıllık beyan süreçlerinin eksiksiz takibi",
          "Bayrak kaydı ve belgelendirme: Şirket adına tescil edilen teknenin bayrak düşümü (Deletion), yeni bayrak kaydı ve tescil belgelerinin (Certificate of Registry vb.) temini",
          "Resmi evrak yönetimi: Noter, apostil ve uluslararası devir evraklarının (Bill of Sale) hazırlanması",
        ],
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
