import React, { useState } from "react";
import Aurora from "../Backgrounds/Aurora/Aurora";
import Particles from "../Backgrounds/Particles/Particles";
import GradientText from "../TextAnimations/GradientText/GradientText";
import Navbar from "../Components/TiltedCard/reusable/NavBar";
import { SendIcon, CheckCircle, AlertTriangle } from "lucide-react";

export default function Feedback() {
  const [formState, setFormState] = useState({
    submitted: false,
    error: false,
    loading: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormState({ submitted: false, error: false, loading: true });

    const formDataToSend = new FormData(event.target);
    formDataToSend.append("access_key", "6b38b5cc-df19-4c65-a6fb-e9f1cbe28bad"); // Replace with your actual Web3Forms access key

    const object = Object.fromEntries(formDataToSend);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        console.log("Success", result);
        setFormState({ submitted: true, error: false, loading: false });
        setFormData({ name: "", email: "", message: "" });

        // Make success message disappear after 5 seconds
        setTimeout(() => {
          setFormState((prevState) => ({ ...prevState, submitted: false }));
        }, 4000);
      } else {
        console.log("Error", result);
        setFormState({ submitted: false, error: true, loading: false });

        // Make error message disappear after 5 seconds
        setTimeout(() => {
          setFormState((prevState) => ({ ...prevState, error: false }));
        }, 4000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormState({ submitted: false, error: true, loading: false });

      // Make error message disappear after 5 seconds
      setTimeout(() => {
        setFormState((prevState) => ({ ...prevState, error: false }));
      }, 4000);
    }
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

      <div className="relative z-10 container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <GradientText
              colors={["#FFFFFF", "#1E90FF", "#87CEEB", "#FFFFFF", "#1E90FF"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class font-bold text-[3rem] sm:text-[4rem] text-center text-white"
            >
              Send Us Feedback
            </GradientText>
          </div>

          <p className="text-lg text-gray-300 text-center mb-10">
            We value your thoughts and suggestions. Let us know how we can
            improve your experience.
          </p>

          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            {formState.submitted && (
              <div className="mb-6 bg-green-500/20 backdrop-blur-xl rounded-lg p-4 border border-green-500/30 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                <p className="text-green-300">
                  Thank you for your feedback! We'll get back to you soon.
                </p>
              </div>
            )}

            {formState.error && (
              <div className="mb-6 bg-red-500/20 backdrop-blur-xl rounded-lg p-4 border border-red-500/30 flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-400 mr-3" />
                <p className="text-red-300">
                  There was an error submitting your feedback. Please try again.
                </p>
              </div>
            )}

            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-white mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/50 text-white rounded-lg p-3 border border-white/10 focus:border-blue-500 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-white mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/50 text-white rounded-lg p-3 border border-white/10 focus:border-blue-500 focus:outline-none"
                  placeholder="Your email address"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-white mb-2">
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full bg-black/50 text-white rounded-lg p-4 border border-white/10 focus:border-blue-500 focus:outline-none min-h-32"
                  placeholder="Type your feedback here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formState.loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {formState.loading ? (
                  <>
                    Sending<span className="animate-pulse">...</span>
                  </>
                ) : (
                  <>
                    Submit Feedback <SendIcon className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
