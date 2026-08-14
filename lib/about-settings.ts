// Hakkımızda sayfası içeriği: panelden düzenlenir, site_settings("hakkimizda") altında saklanır.
export type AboutReference = {
  name: string;
  // public/referanslar altındaki logo yolu
  image: string;
};

export type AboutSettings = {
  subtitle: string;
  heading: string;
  paragraphs: string[];
  mission: string;
  vision: string;
  references: AboutReference[];
};

export const defaultAboutSettings: AboutSettings = {
  subtitle: "2002'den beri denizcilik sektörüne hizmet veriyoruz.",
  heading: "Ege Yatçılık Gemi Acenteliği Müşavirlik Tur. Tic. Ltd. Şti.",
  paragraphs: [
    "Şirketimiz 2002 yılında kurulmuş olup merkezi Konak, İzmir'dedir; Çeşme'de irtibat ofisimiz bulunmaktadır. 20 yılı aşkın süredir sektörde, Türk ve yabancı bayraklı yat sahiplerine tek işimiz olan acentelik ve danışmanlık hizmeti vermekteyiz.",
    "Şirketimiz en iyi ve sürekli hizmet anlayışı ile müşterilerimize ve denizcilik sektörüne katkı sağlamaktadır. Hizmetlerimiz hakkında detaylı bilgi almak için iletişim bilgilerimizden bize ulaşabilirsiniz.",
  ],
  mission:
    "Türkiye'nin en değerli ve en büyük gemi acenteliği müşavirlik şirketi olmak.",
  vision:
    "Sektördeki müşterilerine fayda sağlayan, yenilikçi ve mevzuatı sürekli takip eden gemi acenteliği müşavirlik hizmeti sunmak.",
  references: [],
};
