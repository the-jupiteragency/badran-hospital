
import { HeroSection } from "@/components/home/hero-sec";
import { AboutSection } from "@/components/home/about-sec";
import { CenterOfExcellence } from "@/components/home/coe-sec";
import { MedicalServices } from "@/components/home/services-sec";
import { HealthHub } from "@/components/home/health-hub";
import { HospitalGallery } from "@/components/home/hospital-gallery";
const page = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection /> 
      <CenterOfExcellence /> 
      <MedicalServices />
      <HealthHub />
      <HospitalGallery />
    </main>
  );
};

export default page;
