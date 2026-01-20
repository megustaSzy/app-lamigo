    "use client";

import HeroSection from "../components/about/HeroSection";
import SejarahSection from "../components/about/SejarahSection";
import VisiMisiSection from "../components/about/VisiMisiSection";
import TeamSection from "../components/about/TeamSection";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <SejarahSection />
      <VisiMisiSection />
      <TeamSection />
      <NavBar />
      <Footer />
    </>
  );
}

