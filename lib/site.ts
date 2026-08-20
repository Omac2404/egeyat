export const site = {
  name: "Ege Yatçılık",
  legalName: "Ege Yatçılık Gemi Acenteliği Müşavirlik Tur. Tic. Ltd. Şti.",
  tagline: "Gemi Acenteliği & Müşavirlik",
  foundedYear: 2002,
  phone: "0232 425 17 18",
  phoneHref: "tel:+902324251718",
  fax: "0232 425 47 42",
  gsm: ["0533 724 87 14", "0533 928 95 90"],
  whatsapp: "905339289590",
  email: "egeyatcilik@egeyatcilik.com",
  instagram: "https://www.instagram.com/yatcilikege",
  mapsUrl: "https://maps.app.goo.gl/CqVmQwtKBZQnQN4G6",
  offices: [
    {
      name: "İzmir Merkez Ofis",
      address:
        "İsmet Kaptan Mh. Şair Eşref Blv. İhsan Kayın Plaza No:15/81 Konak / İzmir",
      lines: [
        { label: "Tel", value: "0232 425 17 18", href: "tel:+902324251718" },
        { label: "Fax", value: "0232 425 47 42" },
        { label: "GSM", value: "0533 724 87 14", href: "tel:+905337248714" },
        { label: "GSM", value: "0533 928 95 90", href: "tel:+905339289590" },
        {
          label: "E-posta",
          value: "egeyatcilik@egeyatcilik.com",
          href: "mailto:egeyatcilik@egeyatcilik.com",
        },
      ],
    },
    {
      name: "Çeşme İrtibat Ofisi",
      address: "Çeşme / İzmir",
      lines: [
        { label: "GSM", value: "0533 724 09 24", href: "tel:+905337240924" },
        { label: "GSM", value: "0533 928 95 90", href: "tel:+905339289590" },
        {
          label: "E-posta",
          value: "buket@egeyatcilik.com",
          href: "mailto:buket@egeyatcilik.com",
        },
      ],
    },
  ],
} as const;

// "İşlem yaptığımız kurumlar": logolar eski siteden alındı (public/kurumlar)
export const institutions = [
  { name: "Ulaştırma ve Altyapı Bakanlığı", logo: "/kurumlar/ulastirmabakanligi.jpg" },
  { name: "Kıyı Emniyeti Genel Müdürlüğü", logo: "/kurumlar/kiyiemniyeti.jpg" },
  { name: "Deniz Ticaret Odası", logo: "/kurumlar/denizticaretodasi.jpg" },
  { name: "Ticaret Bakanlığı", logo: "/kurumlar/gumrukticaret.jpg" },
  { name: "Gümrük Muhafaza", logo: "/kurumlar/gumrukmuhavaza.jpg" },
  { name: "Deniz Polisi (EGM)", logo: "/kurumlar/denizpolisi.jpg" },
  { name: "Hudut ve Sahiller Sağlık GM", logo: "/kurumlar/hudutsahiller.jpg" },
  { name: "Kültür ve Turizm Bakanlığı", logo: "/kurumlar/kulturveturizm.jpg" },
  { name: "Hazine ve Maliye Bakanlığı", logo: "/kurumlar/hazinevemaliye.jpg" },
  { name: "İzmir Ticaret Odası", logo: "/kurumlar/izmirticaretodasi.jpg" },
] as const;
