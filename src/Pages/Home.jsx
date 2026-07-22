import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import StatsSection from "../components/StatsSection";
import Footer from "../components/Footer";

function Home() {
  return (
    <div
 className="
 min-h-screen
 bg-gradient-to-br 
 from-[#06B6D4] 
 via-cyan-500 
 to-[#1E3A8A]
 dark:bg-gray-900
 "
>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <Footer />

      
    </div>
  );
}

export default Home;