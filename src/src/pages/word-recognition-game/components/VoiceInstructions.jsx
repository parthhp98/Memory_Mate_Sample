import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "components/ui/button";

const VoiceInstructions = ({
  isVoiceEnabled = false,
  currentWord = "",
  options = [],
  gamePhase = "display", // 'display', 'question', 'result'
  onVoiceCommand = () => { },
  className = "",
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    setSpeechSupported("speechSynthesis" in window);
  }, []);

  const speak = (text) => {
    if (!speechSupported || !isVoiceEnabled) return;

    // Cancel any ongoing speech
    window.speechSynthesis?.cancel();

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis?.speak(utterance);
  };

  const getInstructionText = () => {
    switch (gamePhase) {
      case "display":
        return `The word displayed is: ${currentWord}. Study it carefully.`;
      case "question":
        return `Now choose the correct word from these options: ${options?.join(
          ", "
        )}. Say the number of your choice, or say "repeat" to hear the options again.`;
      case "result":
        return "Moving to the next question. Get ready for the next word.";
      default:
        return "Welcome to the Word Recognition Game. Listen carefully to the instructions.";
    }
  };

  const handleRepeatInstructions = () => {
    speak(getInstructionText());
  };

  const handleReadWord = () => {
    if (currentWord) {
      speak(`The word is: ${currentWord}`);
    }
  };

  const handleReadOptions = () => {
    if (options?.length > 0) {
      const optionsText = options
        ?.map((option, index) => `Option ${index + 1}: ${option}`)
        ?.join(". ");
      speak(`Your choices are: ${optionsText}`);
    }
  };

  // Auto-speak when phase changes
  useEffect(() => {
    if (isVoiceEnabled && speechSupported) {
      const timer = setTimeout(() => {
        speak(getInstructionText());
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gamePhase, currentWord, options, isVoiceEnabled]);

  if (!isVoiceEnabled) {
    return null;
  }

  return (
    <div
      className={`bg-accent/5 border border-accent/20 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <Icon name="Volume2" size={16} color="white" />
          </div>
          <div>
            <h4 className="font-medium text-accent">Voice Assistant</h4>
            <p className="text-xs text-text-secondary">
              Audio guidance enabled
            </p>
          </div>
        </div>

        {isSpeaking && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-xs text-accent">Speaking...</span>
          </div>
        )}
      </div>
      {/* Voice Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRepeatInstructions}
          iconName="RotateCcw"
          iconPosition="left"
          disabled={isSpeaking}
          className="text-xs"
        >
          Repeat Instructions
        </Button>

        {gamePhase === "display" && currentWord && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleReadWord}
            iconName="Volume2"
            iconPosition="left"
            disabled={isSpeaking}
            className="text-xs"
          >
            Read Word
          </Button>
        )}

        {gamePhase === "question" && options?.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleReadOptions}
            iconName="List"
            iconPosition="left"
            disabled={isSpeaking}
            className="text-xs"
          >
            Read Options
          </Button>
        )}
      </div>
      {/* Voice Commands Help */}
      <div className="mt-4 p-3 bg-surface rounded border border-border">
        <h5 className="text-xs font-medium text-surface-foreground mb-2">
          Voice Commands:
        </h5>
        <div className="text-xs text-text-secondary space-y-1">
          {gamePhase === "question" && (
            <>
              <div>• Say "Option 1", "Option 2", etc. to select</div>
              <div>• Say "Repeat" to hear options again</div>
            </>
          )}
          <div>• Say "Help" for assistance</div>
          <div>• Say "Next" to continue (when available)</div>
        </div>
      </div>
      {!speechSupported && (
        <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded text-xs text-warning">
          Voice synthesis not supported in this browser
        </div>
      )}
    </div>
  );
};

export default VoiceInstructions;
