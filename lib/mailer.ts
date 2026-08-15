import "server-only";
import nodemailer from "nodemailer";
import { getTechnicalSettings } from "@/lib/data/technical";

type ContactMail = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

function createTransporter(smtp: {
  host: string;
  port: number;
  user: string;
  pass: string;
}) {
  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: { user: smtp.user, pass: smtp.pass },
    // Sunucuya ulaşılamıyorsa istek dakikalarca askıda kalmasın
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
  });
}

// İletişim formu bildirimi gönderir; SMTP ayarları eksikse sessizce atlar.
export async function sendContactNotification(data: ContactMail) {
  const settings = await getTechnicalSettings();
  const { smtp, mailTo } = settings;
  if (!smtp.host || !smtp.user || !mailTo) return;

  const recipients = mailTo
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
  if (recipients.length === 0) return;

  const transporter = createTransporter(smtp);

  await transporter.sendMail({
    from: smtp.from || smtp.user,
    to: recipients,
    replyTo: data.email,
    subject: `İletişim formu: ${data.subject || data.name}`,
    text: [
      `Ad Soyad: ${data.name}`,
      `E-posta: ${data.email}`,
      data.phone ? `Telefon: ${data.phone}` : null,
      data.subject ? `Konu: ${data.subject}` : null,
      "",
      data.message,
    ]
      .filter((l) => l !== null)
      .join("\n"),
  });
}

// Panelden SMTP testine yarar: kayıtlı ayarlarla verilen adrese test e-postası atar.
// Hata durumunda fırlatır; çağıran taraf mesajı kullanıcıya gösterir.
export async function sendTestMail(to: string) {
  const { smtp } = await getTechnicalSettings();
  if (!smtp.host || !smtp.user) {
    throw new Error(
      "SMTP sunucusu veya kullanıcı adı boş. Önce ayarları doldurup kaydedin."
    );
  }

  const transporter = createTransporter(smtp);
  await transporter.sendMail({
    from: smtp.from || smtp.user,
    to,
    subject: "Ege Yatçılık SMTP testi",
    text: [
      "Bu bir test e-postasıdır.",
      "",
      "Yönetim panelindeki SMTP ayarları çalışıyor; iletişim formu bildirimleri bu hesap üzerinden gönderilecek.",
      `Sunucu: ${smtp.host}:${smtp.port}`,
      `Gönderen: ${smtp.from || smtp.user}`,
    ].join("\n"),
  });
}
