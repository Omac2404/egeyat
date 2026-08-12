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
  email: "egeyatcilik@egeyatcilik.net",
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
          value: "egeyatcilik@egeyatcilik.net",
          href: "mailto:egeyatcilik@egeyatcilik.net",
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
          value: "buket@egeyatcilik.net",
          href: "mailto:buket@egeyatcilik.net",
        },
      ],
    },
  ],
} as const;

// "İşlem yaptığımız kurumlar" — eski sitedeki kurum listesi (logolar eklenecek)
export const institutions = [
  "Ulaştırma ve Altyapı Bakanlığı",
  "Kıyı Emniyeti Genel Müdürlüğü",
  "Deniz Ticaret Odası",
  "Ticaret Bakanlığı",
  "Gümrük Muhafaza",
  "Deniz Polisi (EGM)",
  "Hudut ve Sahiller Sağlık GM",
  "Kültür ve Turizm Bakanlığı",
  "Hazine ve Maliye Bakanlığı",
  "İzmir Ticaret Odası",
  "State of Delaware (ABD)",
] as const;
