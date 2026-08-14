import { site } from "@/lib/site";

// Ana sayfa ve site geneli içerikler: panelden düzenlenir,
// site_settings("genel") altında saklanır.

export type HomeButton = { label: string; href: string };
export type HomeFlag = { name: string; image: string };

export type GeneralSettings = {
  hero: {
    title: string;
    // Başlık içinde turuncu vurgulanacak kelime/ifade (boş bırakılabilir)
    highlight: string;
    text: string;
    primary: HomeButton;
    secondary: HomeButton;
  };
  flags: HomeFlag[];
  about: {
    title: string;
    text1: string;
    text2: string;
    image: string | null;
  };
  cta: {
    title: string;
    text: string;
    primary: HomeButton;
    secondary: HomeButton;
  };
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    x: string;
  };
};

export const defaultGeneralSettings: GeneralSettings = {
  hero: {
    title: "Yat ve Gemi İşlemlerinde Güvenilir Çözüm Ortağınız",
    highlight: "Güvenilir",
    text: "Türk ve yabancı bayraklı yat sahiplerine tek işimiz olan acentelik ve müşavirlik hizmetini 20 yılı aşkın tecrübemizle sunuyoruz. Bayrak tescili, şirket kuruluşu, gümrük ve liman işlemleriniz bizde.",
    primary: { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    secondary: { label: "Bize Ulaşın", href: "/iletisim" },
  },
  flags: [
    { name: "Türkiye", image: "/bayraklar/turkiye.png" },
    { name: "İngiltere (UK)", image: "/bayraklar/ingiltere.png" },
    { name: "Jersey", image: "/bayraklar/jersey.png" },
    { name: "Palau", image: "/bayraklar/palau.png" },
    { name: "Cayman Islands", image: "/bayraklar/cayman-islands.png" },
    { name: "Isle of Man", image: "/bayraklar/isle-of-man.png" },
    { name: "British Virgin Isl.", image: "/bayraklar/british-virgin-islands.png" },
    { name: "Malta", image: "/bayraklar/malta.png" },
    { name: "Polonya", image: "/bayraklar/polonya.png" },
    { name: "Marshall Islands", image: "/bayraklar/marshall-islands.png" },
    { name: "San Marino", image: "/bayraklar/san-marino.png" },
    { name: "St. Vincent", image: "/bayraklar/st-vincent-grenadines.png" },
    { name: "Saint Kitts & Nevis", image: "/bayraklar/saint-kitts-nevis.png" },
  ],
  about: {
    title: "Tek işimiz acentelik ve müşavirlik",
    text1:
      "Şirketimiz 2002 yılında kurulmuş olup merkezi Konak, İzmir'de; irtibat ofisi Çeşme'dedir. 20 yılı aşkın süredir Türk ve yabancı bayraklı yat sahiplerine tek işimiz olan acentelik ve danışmanlık hizmeti veriyoruz.",
    text2:
      "En iyi ve sürekli hizmet anlayışıyla müşterilerimize ve denizcilik sektörüne katkı sağlıyoruz; mevzuatı sürekli takip ederek işlemlerinizi gecikmesiz sonuçlandırıyoruz.",
    image: null,
  },
  cta: {
    title: "İşlemlerinizi bize bırakın, siz denizin keyfini çıkarın",
    text: "Bayrak tescili, transitlog, gümrük veya şirket kuruluşu; hangi konuda olursa olsun, ilk görüşme için bize ulaşın.",
    primary: { label: "İletişim Formu", href: "/iletisim" },
    secondary: { label: site.phone, href: site.phoneHref },
  },
  social: {
    instagram: site.instagram,
    facebook: "",
    linkedin: "",
    x: "",
  },
};
