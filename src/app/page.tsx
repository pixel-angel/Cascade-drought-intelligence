import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import DashboardPreview from "@/components/landing/DashboardPreview";
import FeatureSection from "@/components/landing/FeatureSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#06110D] text-slate-100">
      <Navbar />
      <HeroSection />
      <DashboardPreview />
      <FeatureSection />
      <Footer />
    </main>
  );
}
