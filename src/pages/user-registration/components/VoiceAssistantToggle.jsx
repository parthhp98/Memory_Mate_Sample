import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/button";

const VoiceAssistantToggle = ({
  isEnabled = false,
  onToggle = () => {},
  className = "",
}) => {
  const [isListening, setIsListening] = useState(false);

  const handleToggle = () => {
    const newState = !isEnabled;
    onToggle(newState);

    if (newState) {
      // Simulate voice activation
      setIsListening(true);
      setTimeout(() => setIsListening(false), 2000);
    }
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg p-6 shadow-soft ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 ${
              isEnabled ? "bg-success" : "bg-muted"
            }`}
          >
            <Icon
              name={isEnabled ? "Mic" : "MicOff"}
              size={24}
              color={isEnabled ? "white" : "var(--color-text-secondary)"}
            />
          </div>
          <div>
            <h3 className="font-semibold text-xl text-card-foreground">
              Voice Assistant
            </h3>
            <p className="text-sm text-text-secondary">
              {isEnabled
                ? "Ready to help you"
                : "Click to enable voice guidance"}
            </p>
          </div>
        </div>

        <Button
          variant={isEnabled ? "default" : "outline"}
          size="lg"
          onClick={handleToggle}
          iconName={isEnabled ? "VolumeX" : "Volume2"}
          iconPosition="left"
          className="min-w-[140px] min-h-[60px] text-lg"
        >
          {isEnabled ? "Turn Off" : "Turn On"}
        </Button>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center space-x-3 mb-4">
        <div
          className={`w-3 h-3 rounded-full transition-colors duration-200 ${
            isListening
              ? "bg-success animate-pulse"
              : isEnabled
              ? "bg-warning"
              : "bg-muted"
          }`}
        />
        <span className="text-sm font-medium text-card-foreground">
          {isListening
            ? "Listening..."
            : isEnabled
            ? "Voice assistant is active"
            : "Voice assistant is off"}
        </span>
      </div>

      {/* Voice Features */}
      <div className="space-y-3">
        <h4 className="font-medium text-card-foreground">Voice Features:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Icon name="Volume2" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">
              Form field assistance
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MessageCircle" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">
              Step-by-step guidance
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="HelpCircle" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">
              Question support
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Headphones" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">Audio feedback</span>
          </div>
        </div>
      </div>

      {/* Voice Commands Help */}
      {isEnabled && (
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h4 className="font-medium text-primary mb-3">Try saying:</h4>
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">
              "Help me fill out this form"
            </p>
            <p className="text-sm text-text-secondary">
              "Read the instructions"
            </p>
            <p className="text-sm text-text-secondary">
              "What information do I need?"
            </p>
          </div>
        </div>
      )}

      {/* Browser Support Notice */}
      {!(
        "webkitSpeechRecognition" in window || "SpeechRecognition" in window
      ) && (
        <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <p className="text-sm text-warning">
              Voice features work best in Chrome or Edge browsers
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistantToggle;
