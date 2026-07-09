import { useEffect, useRef, useState } from "react";
import Background from "../component/IntroComponent/Background";
import Footer from "../component/IntroComponent/Footer";
import Navbar from "../component/Navbar/Navbar.jsx";
import TypingHeadline from "../component/IntroComponent/TypingHeadLine.jsx";
import CardStack from "../component/IntroComponent/CardStack.jsx"
import Marquee from "../component/IntroComponent/Marque.jsx";
import SectionEyebrow from "../component/IntroComponent/SectionEyebrow.jsx";
import SectionTitle from "../component/IntroComponent/SectionTitle.jsx";
import CTA from "../component/IntroComponent/CTA.jsx";
import Hero from "../component/IntroComponent/Hero.jsx";
import GlobeExplorer from "../component/IntroComponent/Globe_Explorer.jsx";
import Timeline from "../component/IntroComponent/Timeline.jsx";
import MapPreview from "../component/IntroComponent/MapPreview.jsx";
import Collections from "../component/IntroComponent/Collections.jsx";
import ParallaxGallery from "../component/IntroComponent/ParallaxGallery.jsx";
import CommunityFeed from "../component/IntroComponent/CommunityFeed.jsx";

export default function Intro() {
  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans text-white antialiased" style={{ background: "#09090B" }}>
      <Background />
      <Navbar />
      <Hero />
      <Marquee />
      <GlobeExplorer />
      <Collections />
      <Timeline />
      <ParallaxGallery />
      <CommunityFeed />
      <MapPreview />
      <CTA />
      <Footer />
    </div>
  );
}
