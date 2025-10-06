import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import ChatbotSidebar from "../../components/ui/ChatbotSidebar";
import WelcomeHeader from "./components/WelcomeHeader";
import RegistrationForm from "./components/RegistrationForm";
import TrustSignals from "./components/TrustSignals";
import TrustSignalFooter from "components/ui/TrustSignalFooter";
import VoiceAssistantToggle from "./components/VoiceAssistantToggle";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data for demonstration
  const mockUsers = [
    { email: "senior@example.com", password: "SecurePass123!" },
    { email: "john.doe@email.com", password: "MyPassword456!" },
    { email: "mary.smith@gmail.com", password: "Memory Mate789!" },
  ];

  useEffect(() => {
    // Announce page load for screen readers
    const announcement = document.createElement("div");
    announcement?.setAttribute("aria-live", "polite");
    announcement?.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent =
      "User registration page loaded. Please fill out the form to create your account.";
    document.body?.appendChild(announcement);

    return () => {
      if (document.body?.contains(announcement)) {
        document.body?.removeChild(announcement);
      }
    };
  }, []);

  const handleVoiceToggle = (enabled) => {
    setIsVoiceEnabled(enabled);

    if (enabled) {
      // Simulate voice welcome message
      const utterance = new SpeechSynthesisUtterance(
        "Voice assistant activated. I'm here to help you create your account. You can ask me questions or request help filling out the form."
      );
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleRegistrationSubmit = async (formData) => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock registration logic
      const existingUser = mockUsers?.find(
        (user) => user?.email === formData?.email
      );

      if (existingUser) {
        throw new Error(
          "An account with this email already exists. Please use a different email or try signing in."
        );
      }

      // Simulate successful registration
      const newUser = {
        id: Date.now(),
        email: formData?.email,
        preferredName: formData?.preferredName,
        ageRange: formData?.ageRange,
        gender: formData?.gender,
        registrationDate: new Date()?.toISOString(),
        voiceEnabled: isVoiceEnabled,
      };

      // Store user data in localStorage for demo purposes
      localStorage.setItem("Memory Mate_user", JSON.stringify(newUser));
      localStorage.setItem("Memory Mate_registration_complete", "true");

      if (isVoiceEnabled) {
        const successMessage = new SpeechSynthesisUtterance(
          `Welcome ${formData.preferredName}! Your account has been created successfully. Let's continue to set up your voice assistant.`
        );
        successMessage.rate = 0.8;
        speechSynthesis.speak(successMessage);
      }

      // Navigate to voice assistant setup
      navigate("/voice-assistant-setup");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStageChange = (path, stage) => {
    navigate(path);
  };

  const handleVoiceCommand = (command) => {
    const lowerCommand = command?.toLowerCase();

    if (lowerCommand?.includes("help") || lowerCommand?.includes("assist")) {
      const helpMessage = new SpeechSynthesisUtterance(
        "I can help you fill out the registration form. Please provide your email, create a password, and tell me your preferred name and age range."
      );
      helpMessage.rate = 0.8;
      speechSynthesis.speak(helpMessage);
    } else if (
      lowerCommand?.includes("instructions") ||
      lowerCommand?.includes("how")
    ) {
      const instructionMessage = new SpeechSynthesisUtterance(
        "To register, fill out all the required fields including email, password, preferred name, and age range. Then check the agreement boxes and click Create My Account."
      );
      instructionMessage.rate = 0.8;
      speechSynthesis.speak(instructionMessage);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header
        currentStage="registration"
        voiceEnabled={isVoiceEnabled}
        onVoiceToggle={handleVoiceToggle}
        onStageChange={handleStageChange}
      />

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-8">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Welcome & Trust Signals */}
            <div className="lg:col-span-1 space-y-8">
              <WelcomeHeader />

              {/* Voice Assistant Toggle */}
              <VoiceAssistantToggle
                isEnabled={isVoiceEnabled}
                onToggle={handleVoiceToggle}
              />

              {/* Trust Signals - Desktop Only */}
              <div className="hidden lg:block w-full">
                <TrustSignals />
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="lg:col-span-2 w-full max-w-full">
              <div className="w-full max-w-2xl mx-auto space-y-8">
                <div className="w-full max-w-full bg-card border border-border rounded-xl shadow-soft p-8 lg:p-12">
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                      Create Your Account
                    </h2>
                    <p className="text-lg text-text-secondary">
                      Please provide your information to get started with your
                      cognitive assessment.
                    </p>
                  </div>

                  <RegistrationForm
                    onSubmit={handleRegistrationSubmit}
                    isLoading={isLoading}
                  />
                </div>

                {/* Mobile Trust Signals - NOW OUTSIDE THE CARD */}
                <div className="lg:hidden w-full">
                  <TrustSignals />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <TrustSignalFooter className="mt-auto" />

      {/* Chatbot Sidebar */}
      <ChatbotSidebar
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        currentStage="registration"
      />
    </div>
  );
};

export default UserRegistration;
