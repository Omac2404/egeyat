import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatButtons } from "@/components/site/FloatButtons";
import { LogoSlider } from "@/components/site/LogoSlider";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <LogoSlider />
      <Footer />
      <FloatButtons />
    </>
  );
}
