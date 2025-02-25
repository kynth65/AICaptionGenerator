import React, { useState } from "react";
import Aurora from "../Backgrounds/Aurora/Aurora";
import Particles from "../Backgrounds/Particles/Particles";
import GradientText from "../TextAnimations/GradientText/GradientText";
import Navbar from "../Components/TiltedCard/reusable/NavBar";
import { Sparkles, Copy, RotateCcw, Check } from "lucide-react";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_API_KEY || import.meta.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage
});

export default function AIContentGenerator() {
  const [content, setContent] = useState("");
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [style, setStyle] = useState("professional");
  const [copied, setCopied] = useState(false);

  // Styles for the caption generator
  const captionStyles = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "humorous", label: "Humorous" },
    { value: "inspirational", label: "Inspirational" },
    { value: "promotional", label: "Promotional" },
  ];

  // Generate caption using OpenAI SDK
  const generateCaption = async () => {
    if (!content.trim()) return;

    setIsGenerating(true);

    try {
      // Use the OpenAI SDK instead of fetch
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a caption generator that creates engaging ${style} style captions for social media.`,
          },
          {
            role: "user",
            content: `Create a ${style} caption for this content: ${content}. Include relevant hashtags.`,
          },
        ],
      });

      setGeneratedCaption(completion.choices[0].message.content);
    } catch (error) {
      console.error("Error generating caption:", error);

      // Fallback to client-side generation if API fails
      const stylePrefixes = {
        professional: "Elevate your professional presence with ",
        casual: "Just hanging out with ",
        humorous: "Who needs perfection when you've got ",
        inspirational: "Embrace the journey and discover ",
        promotional: "Don't miss out on our amazing ",
      };

      const prefix = stylePrefixes[style] || "";
      const words = content.split(" ");
      const shortenedContent =
        words.slice(0, 8).join(" ") + (words.length > 8 ? "..." : "");

      setGeneratedCaption(
        `${prefix}${shortenedContent} #caption #${style}content #trending`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCaption);
    setCopied(true);

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const resetForm = () => {
    setContent("");
    setGeneratedCaption("");
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background effects */}
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
      <Navbar />

      {/* Logo with home link */}

      <div className="relative z-10 container mx-auto px-4  pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <GradientText
              colors={["#FFFFFF", "#1E90FF", "#87CEEB", "#FFFFFF", "#1E90FF"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class font-bold text-[3rem] sm:text-[4rem] text-center text-white"
            >
              Generate Your Caption
            </GradientText>
          </div>

          <p className="text-lg text-gray-300 text-center mb-10">
            Input your content below and let our AI create the perfect caption
            for your posts.
          </p>

          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
            <label className="block text-white mb-2">Select Style:</label>
            <select
              className="w-full bg-black/50 text-white rounded-lg p-3 border border-white/10 mb-4"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              {captionStyles.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>

            <label className="block text-white mb-2">Your Content:</label>
            <textarea
              className="w-full bg-black/50 text-white rounded-lg p-4 border border-white/10 min-h-32 mb-4"
              placeholder="Type or paste your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 font-semibold transition-colors flex items-center justify-center gap-2"
              onClick={generateCaption}
              disabled={isGenerating || !content.trim()}
            >
              {isGenerating ? (
                <>
                  Generating<span className="animate-pulse">...</span>
                </>
              ) : (
                <>
                  {generatedCaption ? "Generate Again" : "Generate Caption"}{" "}
                  <Sparkles className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {generatedCaption && (
            <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-blue-500">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl text-white font-semibold">
                  Your Caption:
                </h3>
                <div className="flex gap-2">
                  <button
                    className={`p-2 ${
                      copied
                        ? "bg-green-500/30"
                        : "bg-white/10 hover:bg-white/20"
                    } rounded-lg transition-all duration-300 transform ${
                      copied ? "scale-110" : ""
                    }`}
                    onClick={copyToClipboard}
                    title={copied ? "Copied!" : "Copy to clipboard"}
                    disabled={copied}
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-white" />
                    )}
                  </button>
                  <button
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    onClick={resetForm}
                    title="Reset"
                  >
                    <RotateCcw className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              <div className="bg-black/50 rounded-lg p-4 border border-white/10">
                <p className="text-gray-200">{generatedCaption}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
