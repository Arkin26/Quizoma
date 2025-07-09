import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Reviews from "../components/Reviews";
import AboutUs from "../components/AboutUs";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const reviewsRef = useRef(null);

  useEffect(() => {
    const animate = (ref) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          {
            opacity: 0,
            y: 50,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    };

    animate(heroRef);
    animate(aboutRef);
    animate(featuresRef);
    animate(reviewsRef);
  }, []);

  return (
    <>
      <div ref={heroRef}>
      <HeroSection scrollToFeatures={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      </div>
      <div ref={aboutRef}>
        <AboutUs />
      </div>
      <div ref={featuresRef}>
        <Features />
      </div>
      <div ref={reviewsRef}>
        <Reviews />
      </div>
    </>
  );
}
