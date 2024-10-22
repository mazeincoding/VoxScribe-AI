import { CtaSection } from "@/components/landing/cta";
import { Features } from "@/components/landing/features";
import { Header } from "@/components/header";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";
import { FAQSection } from "@/components/landing/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <div>
        <Hero />
        <Features />
        <Pricing />
        <FAQSection />
        <CtaSection />
        <Footer />
      </div>
    </div>
  );
}
