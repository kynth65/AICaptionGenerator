import React from "react";
import TiltedCard from "./Components/TiltedCard/TiltedCard";
import { Type, Sparkles, CheckCircle, Copy, RotateCcw } from "lucide-react";
import GradientText from "./TextAnimations/GradientText/GradientText";
import SplitText from "./TextAnimations/SplitText/SplitText";

const HowItWorks = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  const steps = [
    {
      number: "1",
      title: "Input Content",
      description:
        "Type or paste your content in the text area. This will be used as the basis for generating your perfect caption.",
      icon: <Type className="w-8 h-8 text-blue-400" />,
    },
    {
      number: "2",
      title: "Generate Caption",
      description:
        "Click Generate and watch as AI creates engaging captions tailored to your content.",
      icon: <Sparkles className="w-8 h-8 text-purple-400" />,
    },
    {
      number: "3",
      title: "Review",
      description:
        "Review your generated caption. If it's not quite right, you can regenerate until you find the perfect match.",
      icon: <CheckCircle className="w-8 h-8 text-green-400" />,
    },
    {
      number: "4",
      title: "Copy or Reset",
      description:
        "Click Copy to use your caption, or Reset to start over with new content.",
      icon: (
        <div className="flex gap-2">
          <Copy className="w-8 h-8 text-orange-400" />
          <RotateCcw className="w-8 h-8 text-red-400" />
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-10">
        <SplitText
          text="How it works"
          className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]  
            font-light text-center text-blue-200 tracking-tight  "
          delay={150}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {steps.map((step, index) => (
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
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-blue-300 text-sm mb-1">
                      Step {step.number}
                    </div>
                    <h2 className="text-2xl text-white ">{step.title}</h2>
                  </div>
                </div>
                <p className="text-gray-400 text-lg">{step.description}</p>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
