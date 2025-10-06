import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import ChatbotSidebar from "../../components/ui/ChatbotSidebar";
import TrustSignalFooter from "../../components/ui/TrustSignalFooter";
import Button from "components/ui/button";
import VoiceToggleCard from "./components/VoiceToggleCard";
import AudioFeedbackOptions from "./components/AudioFeedbackOptions";
import VoiceTestPanel from "./components/VoiceTestPanel";
import SetupInstructions from "./components/SetupInstructions";
import Icon from "../../components/AppIcon";

const VoiceAssistantSetup = () => {
  const navigate = useNavigate();
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [volume, setVolume] = useState(75);
  const [audioOptions, setAudioOptions] = useState({
    welcome: false,
    gameRules: false,
    completion: false,
    encouragement: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load saved settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("cognicare-voice-settings");
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setIsVoiceEnabled(settings?.isEnabled || false);
        setVolume(settings?.volume || 75);
        setAudioOptions(
          settings?.audioOptions || {
            welcome: false,
            gameRules: false,
            completion: false,
            encouragement: false,
          }
        );
      } catch (error) {
        console.error("Error loading voice settings:", error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      isEnabled: isVoiceEnabled,
      volume: volume,
      audioOptions: audioOptions,
    };
    localStorage.setItem("cognicare-voice-settings", JSON.stringify(settings));
  }, [isVoiceEnabled, volume, audioOptions]);

  const handleVoiceToggle = () => {
    setIsVoiceEnabled(!isVoiceEnabled);

    // If disabling voice, reset all audio options
    if (isVoiceEnabled) {
      setAudioOptions({
        welcome: false,
        gameRules: false,
        completion: false,
        encouragement: false,
      });
    }
  };

  const handleAudioOptionChange = (optionId, checked) => {
    setAudioOptions((prev) => ({
      ...prev,
      [optionId]: checked,
    }));
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const handleSaveAndContinue = () => {
    setIsLoading(true);

    // Simulate saving process
    setTimeout(() => {
      setIsLoading(false);
      navigate("/memory-pattern-game");
    }, 1500);
  };

  const handleSkipSetup = () => {
    // Set default disabled settings
    const defaultSettings = {
      isEnabled: false,
      volume: 75,
      audioOptions: {
        welcome: false,
        gameRules: false,
        completion: false,
        encouragement: false,
      },
    };
    localStorage.setItem(
      "cognicare-voice-settings",
      JSON.stringify(defaultSettings)
    );
    navigate("/memory-pattern-game");
  };

  const handleGoBack = () => {
    navigate("/user-registration");
  };

  const hasSelectedOptions = Object.values(audioOptions)?.some(
    (option) => option
  );
  const canProceed = !isVoiceEnabled || hasSelectedOptions;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        currentStage="voice-setup"
        voiceEnabled={isVoiceEnabled}
        onVoiceToggle={setIsVoiceEnabled}
        onStageChange={(path) => navigate(path)}
      />

      {/* Main Content */}
      <main className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Volume2" size={32} color="white" />
            </div>
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Voice Assistant Setup
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Configure your audio assistance preferences to make your cognitive
              assessment more accessible and comfortable. You can change these
              settings at any time.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2 bg-card border border-border rounded-lg px-4 py-2">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="text-sm font-medium text-card-foreground">
                Step 2 of 5
              </span>
              <span className="text-sm text-text-secondary">Voice Setup</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Instructions */}
            <div className="lg:col-span-1">
              <SetupInstructions />
            </div>

            {/* Right Column - Configuration */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main Voice Toggle */}
              <VoiceToggleCard
                isEnabled={isVoiceEnabled}
                onToggle={handleVoiceToggle}
              />

              {/* Audio Feedback Options */}
              <AudioFeedbackOptions
                options={audioOptions}
                onOptionChange={handleAudioOptionChange}
                disabled={!isVoiceEnabled}
              />

              {/* Voice Test Panel */}
              <VoiceTestPanel
                isVoiceEnabled={isVoiceEnabled}
                audioOptions={audioOptions}
                volume={volume}
                onVolumeChange={handleVolumeChange}
              />

              {/* Validation Message */}
              {isVoiceEnabled && !hasSelectedOptions && (
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="AlertTriangle"
                      size={20}
                      className="text-warning"
                    />
                    <p className="text-base text-warning font-medium">
                      Please select at least one audio feedback option to
                      continue
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleGoBack}
                  iconName="ArrowLeft"
                  iconPosition="left"
                  className="sm:w-auto"
                >
                  Go Back
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleSkipSetup}
                  className="sm:w-auto"
                >
                  Skip Voice Setup
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  onClick={handleSaveAndContinue}
                  disabled={!canProceed}
                  loading={isLoading}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="sm:w-auto sm:ml-auto"
                >
                  {isLoading ? "Saving Settings..." : "Save & Continue"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chatbot Sidebar */}
      <ChatbotSidebar
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        currentStage="voice-setup"
      />

      {/* Footer */}
      <TrustSignalFooter />
    </div>
  );
};

export default VoiceAssistantSetup;
