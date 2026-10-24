"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutMe from "../components/AboutMe";
import Resume from "../components/Resume";
import Testimonial from "../components/Testimonial";
import ContactMe from "../components/ContactMe";

const HomePage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const contactMeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sections = {
    home: homeRef,
    aboutme: aboutMeRef,
    resume: resumeRef,
    testimonial: testimonialRef,
    contactme: contactMeRef,
  };

  return (
    <>
      <Navbar sections={sections} />
      <div id="home" ref={homeRef}>
        <HeroSection />
      </div>
      <div id="aboutme" ref={aboutMeRef}>
        <AboutMe />
      </div>
      <div id="resume" ref={resumeRef}>
        <Resume />
      </div>
      <div id="testimonial" ref={testimonialRef}>
        <Testimonial />
      </div>
      <div id="contactme" ref={contactMeRef}>
        <ContactMe />
      </div>
    </>
  );
};

export default HomePage;
