import React from "react";
import Aurora from "../Backgrounds/Aurora/Aurora";
import Particles from "../Backgrounds/Particles/Particles";
import GradientText from "../TextAnimations/GradientText/GradientText";
import SplitText from "../TextAnimations/SplitText/SplitText";
import TiltedCard from "../Components/TiltedCard/TiltedCard";
import Navbar from "../Components/TiltedCard/reusable/NavBar";
import { MessageSquare, Zap, Globe, Users } from "lucide-react";

export default function About() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const features = [
    {
      number: "1",
      title: "AI-Powered Captions",
      description:
        "Our advanced AI analyzes your content to generate engaging, relevant captions tailored to your specific needs.",
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
    },
    {
      number: "2",
      title: "Multiple Styles",
      description:
        "Choose from various caption styles including professional, casual, humorous, and more to match your brand voice.",
      icon: <MessageSquare className="w-8 h-8 text-green-400" />,
    },
    {
      number: "3",
      title: "Global Language Support",
      description:
        "Generate captions in multiple languages to reach your international audience effectively.",
      icon: <Globe className="w-8 h-8 text-blue-400" />,
    },
    {
      number: "4",
      title: "Built for Creators",
      description:
        "Designed with social media creators, marketers, and businesses in mind to save time and boost engagement.",
      icon: <Users className="w-8 h-8 text-purple-400" />,
    },
  ];

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
          <div className="flex flex-col justify-center items-center min-h-screen px-4 pt-16">
            <GradientText
              colors={["#FFFFFF", "#1E90FF", "#87CEEB", "#FFFFFF", "#1E90FF"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class font-bold text-[3rem] sm:text-[5rem] text-center text-white mb-8"
            >
              About
            </GradientText>

            <div className="max-w-2xl text-center mb-16">
              <p className="text-lg text-gray-300 mb-6">
                Caption Generator is an innovative AI tool designed to help
                content creators, marketers, and businesses create engaging
                captions for their social media posts and content.
              </p>
              <p className="text-lg text-gray-300">
                Our mission is to simplify the content creation process, saving
                you time while helping you connect more effectively with your
                audience.
              </p>
            </div>

            <div className="container mx-auto px-4 mt-40">
              <div className="mb-10">
                <SplitText
                  text="Why Choose Us"
                  className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-light text-center text-blue-200 tracking-tight"
                  delay={150}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,50px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  easing="easeOutCubic"
                  threshold={0.2}
                  rootMargin="-50px"
                  onLetterAnimationComplete={handleAnimationComplete}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <TiltedCard
                    key={index}
                    containerHeight="300px"
                    containerWidth="100%"
                    imageHeight="100%"
                    imageWidth="100%"
                    showMobileWarning={false}
                    showTooltip={false}
                    scaleOnHover={1.05}
                    rotateAmplitude={10}
                    displayOverlayContent={true}
                    overlayContent={
                      <div className="w-full h-full bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="bg-blue-500/20 p-4 rounded-lg flex items-center justify-center">
                            {feature.icon}
                          </div>
                          <div>
                            <div className="text-blue-300 text-sm mb-1">
                              Feature {feature.number}
                            </div>
                            <h2 className="text-2xl text-white">
                              {feature.title}
                            </h2>
                          </div>
                        </div>
                        <p className="text-gray-400 text-lg">
                          {feature.description}
                        </p>
                      </div>
                    }
                  />
                ))}
              </div>
            </div>

            <div className="mt-20 mb-16 max-w-2xl text-center">
              <SplitText
                text="Our Technology"
                className="text-[2.5rem] sm:text-[3.5rem] font-light text-center text-blue-200 tracking-tight mb-8"
                delay={150}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,50px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
              />
              <p className="text-lg text-gray-300 mb-6">
                Our caption generator uses state-of-the-art natural language
                processing and machine learning algorithms to understand your
                content and generate captions that resonate with your audience.
              </p>
              <p className="text-lg text-gray-300">
                We continuously train and improve our models to ensure you get
                the most relevant and engaging captions for your specific needs.
              </p>
            </div>

            <div className="pb-16">
              <a
                href="/AIContentGenerator"
                className="px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all flex items-center gap-2 text-lg"
              >
                Get Started Now
                <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
