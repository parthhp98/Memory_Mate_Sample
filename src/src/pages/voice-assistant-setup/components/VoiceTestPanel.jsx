import React, { useState } from "react";
import Button from "../../../components/ui/button";
import Icon from "../../../components/AppIcon";

const VoiceTestPanel = ({
  isVoiceEnabled,
  audioOptions,
  onVolumeChange,
  volume = 75,
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);

  const testPhrases = {
    welcome:
      "Welcome to Memory Mate! I'm here to help guide you through your cognitive assessment.",
    gameRules:
      "In this memory game, you'll see a sequence of colored buttons. Watch carefully and repeat the pattern.",
    completion:
      "Excellent work! You've completed this section. Let's move on to the next activity.",
    encouragement:
      "You're doing great! Take your time and remember, there's no pressure to be perfect.",
  };

  const handleTestVoice = (type) => {
    if (!isVoiceEnabled) return;

    setIsPlaying(true);
    setCurrentTest(type);

    // Simulate voice playback
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(testPhrases[type]);
      utterance.volume = volume / 100;
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentTest(null);
      };

      speechSynthesis.speak(utterance);
    } else {
      // Fallback for browsers without speech synthesis
      setTimeout(() => {
        setIsPlaying(false);
        setCurrentTest(null);
      }, 3000);
    }
  };

  const handleStopVoice = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setCurrentTest(null);
  };

  const testButtons = [
    { type: "welcome", label: "Welcome Message", icon: "MessageSquare" },
    { type: "gameRules", label: "Game Instructions", icon: "BookOpen" },
    { type: "completion", label: "Completion Alert", icon: "CheckCircle" },
    { type: "encouragement", label: "Encouragement", icon: "Heart" },
  ];

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-card-foreground">
            Test Voice Settings
          </h3>
          <p className="text-lg text-text-secondary">
            Preview how voice assistance will sound during your assessment
          </p>
        </div>

        {/* Volume Control */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-card-foreground">
              Volume Level
            </label>
            <span className="text-lg text-primary font-bold">{volume}%</span>
          </div>

          <div className="flex items-center space-x-4">
            <Icon name="VolumeX" size={24} className="text-text-secondary" />
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => onVolumeChange(parseInt(e?.target?.value))}
                disabled={!isVoiceEnabled}
                className={`w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-2 ${
                  !isVoiceEnabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={{
                  background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${volume}%, var(--color-muted) ${volume}%, var(--color-muted) 100%)`,
                }}
              />
            </div>
            <Icon name="Volume2" size={24} className="text-text-secondary" />
          </div>
        </div>

        {/* Test Buttons */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-card-foreground">
            Test Audio Samples
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {testButtons?.map((button) => (
              <Button
                key={button?.type}
                variant={currentTest === button?.type ? "default" : "outline"}
                size="lg"
                onClick={() => handleTestVoice(button?.type)}
                disabled={
                  !isVoiceEnabled || !audioOptions?.[button?.type] || isPlaying
                }
                iconName={
                  currentTest === button?.type ? "Square" : button?.icon
                }
                iconPosition="left"
                className="h-16 text-left justify-start"
              >
                <div className="flex flex-col items-start">
                  <span className="font-semibold">{button?.label}</span>
                  {currentTest === button?.type && (
                    <span className="text-sm opacity-80">Playing...</span>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4">
          {isPlaying ? (
            <Button
              variant="destructive"
              size="lg"
              onClick={handleStopVoice}
              iconName="Square"
              iconPosition="left"
              className="min-w-[140px]"
            >
              Stop Audio
            </Button>
          ) : (
            <Button
              variant="default"
              size="lg"
              onClick={() => handleTestVoice("welcome")}
              disabled={!isVoiceEnabled}
              iconName="Play"
              iconPosition="left"
              className="min-w-[140px]"
            >
              Test Voice
            </Button>
          )}
        </div>

        {/* Status Messages */}
        {!isVoiceEnabled && (
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
              <p className="text-base text-warning font-medium">
                Enable voice assistant above to test audio settings
              </p>
            </div>
          </div>
        )}

        {isVoiceEnabled &&
          Object.values(audioOptions)?.every((option) => !option) && (
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
                <p className="text-base text-warning font-medium">
                  Select at least one audio feedback option to test voice
                  settings
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default VoiceTestPanel;
