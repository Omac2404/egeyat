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

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: { user: smtp.user, pass: smtp.pass },
  });

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
