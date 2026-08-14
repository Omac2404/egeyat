import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatButtons } from "@/components/site/FloatButtons";
import { LogoSlider } from "@/components/site/LogoSlider";
import { CookieConsent } from "@/components/site/CookieConsent";
import { getPublishedServices } from "@/lib/data/services";
import { getGeneralSettings } from "@/lib/data/general";

// Menü ve footer hizmet listesi DB'den geldiği için her istekte taze render
export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [services, general] = await Promise.all([
    getPublishedServices(),
    getGeneralSettings(),
  ]);
  const navServices = services.map((s) => ({ slug: s.slug, title: s.title }));

  return (
    <>
      <Header services={navServices} social={general.social} />
      <main>{children}</main>
      <LogoSlider />
      <Footer services={navServices} />
      <FloatButtons />
      <CookieConsent />
    </>
  );
}
