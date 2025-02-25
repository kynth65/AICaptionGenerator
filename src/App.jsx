import { useState, useRef } from "react"; // Add useRef import
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SplitText from "./TextAnimations/SplitText/SplitText";
import Aurora from "./Backgrounds/Aurora/Aurora";
import HowItWorks from "./HowItWorks";
import ScrollVelocity from "./TextAnimations/ScrollVelocity/ScrollVelocity";
import Particles from "./Backgrounds/Particles/Particles";
import GradientText from "./TextAnimations/GradientText/GradientText";
import Navbar from "./Components/TiltedCard/reusable/NavBar";

function App() {
  const howItWorksRef = useRef(null);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen bg-black">
        <Aurora
          colorStops={["#0066FF", "#4DA6FF", "#66B2FF"]}
          blend={0.8}
          amplitude={0.8}
          speed={0.4}
        />
        <div style={{ width: "100%", height: "600px", position: "fixed" }}>
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex flex-col justify-center items-center min-h-screen px-4 mt-[-200px]">
            <GradientText
              colors={["#FFFFFF", "#1E90FF", "#87CEEB", "#FFFFFF", "#1E90FF"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class font-bold text-[3.5rem] sm:text-[6.5rem] text-center text-white mb-16"
            >
              Caption Generator
            </GradientText>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-6 max-w-xl text-center opacity-80">
              Generate engaging captions for your content with AI.
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={scrollToHowItWorks}
                className="px-6 py-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                how to use?
              </button>
              <a
                href="/AiContentGenerator"
                className="px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all flex items-center gap-2"
              >
                get started
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>

          {/* How it works section */}
          <div ref={howItWorksRef} className="relative z-10">
            <HowItWorks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
