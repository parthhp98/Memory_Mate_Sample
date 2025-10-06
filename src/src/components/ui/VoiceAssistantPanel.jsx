import React, { useState, useEffect } from "react";
import Icon from "../AppIcon";
import Button from "./button";

const VoiceAssistantPanel = ({
  isEnabled = false,
  onToggle = () => {},
  onVoiceCommand = () => {},
  classNamclassNamee = "",
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastCommand, setLastCommand] = useState("");
  const [audioLevel, setAudioLevel] = useState(0);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        setIsProcessing(false);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event?.results)
          ?.map((result) => result?.[0])
          ?.map((result) => result?.transcript)
          ?.join("");

        if (event?.results?.[event?.results?.length - 1]?.isFinal) {
          setLastCommand(transcript);
          setIsProcessing(true);
          onVoiceCommand(transcript);

          setTimeout(() => {
            setIsProcessing(false);
          }, 1000);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event?.error);
        setIsListening(false);
        setIsProcessing(false);
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognition) {
        recognition?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (isEnabled && recognition) {
      recognition?.start();
    } else if (recognition) {
      recognition?.stop();
    }
  }, [isEnabled, recognition]);

  // Simulate audio level for visual feedback
  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
    } else {
      setAudioLevel(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isListening]);

  const handleToggle = () => {
    onToggle(!isEnabled);
  };

  const voiceCommands = [
    'Say "Next" to continue',
    'Say "Help" for assistance',
    'Say "Repeat" to hear again',
    'Say "Settings" for options',
  ];

  return (
    <div
      className={`bg-card border border-border rounded-lg shadow-soft p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
              isEnabled ? "bg-success" : "bg-muted"
            }`}
          >
            <Icon
              name={isEnabled ? "Mic" : "MicOff"}
              size={20}
              color={isEnabled ? "white" : "var(--color-text-secondary)"}
            />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">
              Voice Assistant
            </h3>
            <p className="text-sm text-text-secondary">
              {isEnabled ? "Active and listening" : "Currently disabled"}
            </p>
          </div>
        </div>

        <Button
          variant={isEnabled ? "default" : "outline"}
          size="default"
          onClick={handleToggle}
          iconName={isEnabled ? "VolumeX" : "Volume2"}
          iconPosition="left"
        >
          {isEnabled ? "Disable" : "Enable"}
        </Button>
      </div>
      {/* Status Indicator */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-3">
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
            {isProcessing
              ? "Processing..."
              : isListening
              ? "Listening..."
              : isEnabled
              ? "Ready to listen"
              : "Voice assistant off"}
          </span>
        </div>

        {/* Audio Level Visualization */}
        {isEnabled && (
          <div className="flex items-center space-x-1 h-8">
            {[...Array(20)]?.map((_, i) => (
              <div
                key={i}
                className={`w-1 bg-primary rounded-full transition-all duration-100 ${
                  audioLevel > i * 5 ? "h-6" : "h-2"
                }`}
                style={{
                  opacity: audioLevel > i * 5 ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        )}
      </div>
      {/* Last Command */}
      {lastCommand && (
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Last Command:
          </h4>
          <p className="text-sm text-card-foreground italic">"{lastCommand}"</p>
        </div>
      )}
      {/* Voice Commands Help */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-card-foreground">
          Available Commands:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {voiceCommands?.map((command, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 p-3 bg-surface rounded-lg border border-border"
            >
              <Icon name="Volume2" size={14} className="text-text-secondary" />
              <span className="text-sm text-surface-foreground">{command}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Settings */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-card-foreground">
              Voice Settings
            </h4>
            <p className="text-xs text-text-secondary">
              Adjust voice recognition preferences
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            onClick={() => console.log("Open voice settings")}
          >
            Configure
          </Button>
        </div>
      </div>
      {/* Browser Support Warning */}
      {!(
        "webkitSpeechRecognition" in window || "SpeechRecognition" in window
      ) && (
        <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <p className="text-sm text-warning">
              Voice recognition is not supported in this browser. Please use
              Chrome or Edge for the best experience.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistantPanel;
