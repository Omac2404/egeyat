// Yasal sayfa içerikleri (KVKK, gizlilik, çerez). Metinler standart şablondur;
// yayın öncesi firma ve hukuk danışmanı tarafından gözden geçirilmelidir.
import { site } from "@/lib/site";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalDoc = {
  slug: string;
  title: string;
  subtitle: string;
  sections: LegalSection[];
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "kvkk",
    title: "KVKK Aydınlatma Metni",
    subtitle:
      "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
    sections: [
      {
        heading: "Veri Sorumlusu",
        paragraphs: [
          `Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, veri sorumlusu sıfatıyla ${site.legalName} ("Şirket") tarafından hazırlanmıştır.`,
          `Adres: ${site.offices[0].address}`,
        ],
      },
      {
        heading: "İşlenen Kişisel Veriler",
        paragraphs: [
          "Web sitemiz ve hizmet süreçlerimiz kapsamında aşağıdaki kişisel veriler işlenebilmektedir:",
        ],
        list: [
          "Kimlik bilgileri (ad, soyad)",
          "İletişim bilgileri (telefon numarası, e-posta adresi)",
          "İletişim formu üzerinden ilettiğiniz mesaj içeriği",
          "İşlem güvenliği bilgileri (IP adresi, erişim kayıtları)",
          "Hizmet süreçlerinin yürütülmesi için gerekli belge ve bilgiler (tekne ve tescil işlemlerine ilişkin veriler)",
        ],
      },
      {
        heading: "Kişisel Verilerin İşlenme Amaçları",
        list: [
          "İletişim taleplerinin yanıtlanması ve teklif süreçlerinin yürütülmesi",
          "Acentelik, tescil, gümrük ve danışmanlık hizmetlerinin sunulması",
          "Yasal yükümlülüklerin yerine getirilmesi ve yetkili kurumlara bildirim yapılması",
          "Hizmet kalitesinin geliştirilmesi ve kayıtların tutulması",
        ],
      },
      {
        heading: "İşlemenin Hukuki Sebepleri",
        paragraphs: [
          "Kişisel verileriniz; KVKK'nın 5. maddesinde yer alan sözleşmenin kurulması veya ifası, hukuki yükümlülüğün yerine getirilmesi, bir hakkın tesisi ve meşru menfaat hukuki sebeplerine dayanılarak, gerekli hallerde ise açık rızanıza başvurularak işlenmektedir.",
        ],
      },
      {
        heading: "Kişisel Verilerin Aktarılması",
        paragraphs: [
          "Kişisel verileriniz; hizmetin gerektirdiği ölçüde liman başkanlıkları, gümrük idareleri ve ilgili bakanlıklar gibi yetkili kamu kurum ve kuruluşlarına, yasal yükümlülükler çerçevesinde aktarılabilir. Verileriniz bunun dışında üçüncü kişilerle paylaşılmaz.",
        ],
      },
      {
        heading: "Saklama Süresi",
        paragraphs: [
          "Kişisel verileriniz, işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen zamanaşımı süreleri boyunca saklanır; sürelerin dolması halinde silinir, yok edilir veya anonim hale getirilir.",
        ],
      },
      {
        heading: "KVKK Kapsamındaki Haklarınız",
        paragraphs: [
          "KVKK'nın 11. maddesi uyarınca veri sorumlusuna başvurarak aşağıdaki haklarınızı kullanabilirsiniz:",
        ],
        list: [
          "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
          "İşlenmişse buna ilişkin bilgi talep etme",
          "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
          "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme",
          "Eksik veya yanlış işlenmişse düzeltilmesini isteme",
          "KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme",
          "İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme",
          "Kanuna aykırı işleme nedeniyle zarara uğramanız halinde zararın giderilmesini talep etme",
        ],
      },
      {
        heading: "Başvuru",
        paragraphs: [
          `Taleplerinizi ${site.email} adresine e-posta ile veya şirket adresimize yazılı olarak iletebilirsiniz. Başvurular en geç 30 gün içinde sonuçlandırılır.`,
        ],
      },
    ],
  },
  {
    slug: "gizlilik-politikasi",
    title: "Gizlilik Politikası",
    subtitle: "Kişisel bilgilerinizin gizliliğine verdiğimiz önem ve ilkelerimiz.",
    sections: [
      {
        heading: "Genel",
        paragraphs: [
          `${site.legalName} olarak ziyaretçilerimizin ve müşterilerimizin gizliliğine önem veriyoruz. Bu politika, web sitemizi kullanırken hangi bilgilerin toplandığını ve nasıl kullanıldığını açıklar.`,
        ],
      },
      {
        heading: "Toplanan Bilgiler",
        paragraphs: [
          "Web sitemizde yalnızca iletişim formu aracılığıyla bize ilettiğiniz ad, e-posta, telefon ve mesaj bilgileri ile sitenin çalışması için gerekli teknik kayıtlar (IP adresi, erişim logları) toplanır.",
        ],
      },
      {
        heading: "Bilgilerin Kullanımı",
        paragraphs: [
          "Toplanan bilgiler yalnızca taleplerinizi yanıtlamak, hizmet süreçlerini yürütmek ve yasal yükümlülükleri yerine getirmek için kullanılır. Bilgileriniz pazarlama amacıyla üçüncü kişilerle paylaşılmaz, satılmaz veya kiralanmaz.",
        ],
      },
      {
        heading: "Güvenlik",
        paragraphs: [
          "Bilgileriniz yetkisiz erişime karşı uygun teknik ve idari tedbirlerle korunur. İnternet üzerinden veri iletiminin tam güvenliği garanti edilemese de sektör standardı önlemler uygulanmaktadır.",
        ],
      },
      {
        heading: "Değişiklikler",
        paragraphs: [
          "Bu politika gerektiğinde güncellenebilir. Güncel sürüm her zaman bu sayfada yayınlanır.",
        ],
      },
      {
        heading: "İletişim",
        paragraphs: [
          `Gizlilik politikamıza ilişkin sorularınız için ${site.email} adresinden bize ulaşabilirsiniz.`,
        ],
      },
    ],
  },
  {
    slug: "cerez-politikasi",
    title: "Çerez Politikası",
    subtitle: "Web sitemizde kullanılan çerezler ve yönetim seçenekleri.",
    sections: [
      {
        heading: "Çerez Nedir?",
        paragraphs: [
          "Çerezler (cookie), bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler sitenin düzgün çalışmasını ve tercihlerinizin hatırlanmasını sağlar.",
        ],
      },
      {
        heading: "Kullandığımız Çerezler",
        paragraphs: [
          "Web sitemizde yalnızca sitenin çalışması için zorunlu çerezler kullanılmaktadır:",
        ],
        list: [
          "Oturum çerezleri: Yönetim paneline giriş yapan yetkili kullanıcıların oturumunu sürdürmek için kullanılır.",
          "Zorunlu teknik çerezler: Sitenin temel işlevlerinin çalışmasını sağlar.",
        ],
      },
      {
        heading: "Üçüncü Taraf Çerezleri",
        paragraphs: [
          "Sitemizde reklam veya izleme amaçlı üçüncü taraf çerezi kullanılmamaktadır. Harita gibi gömülü içerikler, ilgili hizmet sağlayıcının kendi çerez politikasına tabi olabilir.",
        ],
      },
      {
        heading: "Çerezlerin Yönetimi",
        paragraphs: [
          "Tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz. Zorunlu çerezlerin engellenmesi halinde sitenin bazı bölümleri düzgün çalışmayabilir.",
        ],
      },
      {
        heading: "İletişim",
        paragraphs: [
          `Çerez politikamıza ilişkin sorularınız için ${site.email} adresinden bize ulaşabilirsiniz.`,
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}
