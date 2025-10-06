import React, { useEffect, useState, useRef } from "react";
import Icon from "../../../components/AppIcon";

const VoiceInstructions = ({
  isVoiceEnabled,
  gameState,
  currentLevel,
  sequenceLength,
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentInstruction, setCurrentInstruction] = useState("");
  const lastGameStateRef = useRef("");
  const isSpeakingRef = useRef(false);

  const instructions = {
    waiting: `Welcome to the Memory Pattern Game. You will see colored buttons light up in a sequence. Watch carefully, then repeat the pattern by clicking the buttons in the same order. Level 1 will begin with ${sequenceLength} buttons. Are you ready to start?`,

    showingSequence: `Level ${currentLevel}. Watch the sequence of ${sequenceLength} colored buttons. Pay close attention to the order.`,

    userTurn: `Now it's your turn. Click the buttons in the same order you saw them light up. Take your time and trust your memory.`,

    levelComplete: `Excellent! You completed level ${currentLevel} successfully. The next level will have ${
      sequenceLength + 1
    } buttons to remember. Well done!`,

    gameComplete: `Congratulations! You have successfully completed all levels of the Memory Pattern Game. Your memory skills have been thoroughly assessed. Let's continue to the next part of your cognitive evaluation.`,

    encouragement: `You're doing great! Remember, this assessment helps us understand your cognitive abilities. There's no pressure - just do your best.`,
  };

  const speakInstruction = (text) => {
    if (!isVoiceEnabled || !("speechSynthesis" in window)) return;

    // Only cancel if we're starting a NEW instruction, not if currently speaking
    if (isSpeakingRef.current) {
      return; // Don't interrupt ongoing speech
    }

    window.speechSynthesis?.cancel();

    setIsPlaying(true);
    setCurrentInstruction(text);
    isSpeakingRef.current = true;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentInstruction("");
      isSpeakingRef.current = false;
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentInstruction("");
      isSpeakingRef.current = false;
    };

    window.speechSynthesis?.speak(utterance);
  };

  useEffect(() => {
    if (!isVoiceEnabled) return;

    // Only speak if the game state has actually changed
    if (lastGameStateRef.current === gameState) {
      return;
    }

    let instruction = "";
    switch (gameState) {
      case "waiting":
        instruction = instructions?.waiting;
        break;
      case "showingSequence":
        instruction = instructions?.showingSequence;
        break;
      case "userTurn":
        instruction = instructions?.userTurn;
        break;
      case "levelComplete":
        instruction = instructions?.levelComplete;
        break;
      case "gameComplete":
        instruction = instructions?.gameComplete;
        break;
      default:
        return;
    }

    // Update the ref to track state changes
    lastGameStateRef.current = gameState;

    const timer = setTimeout(() => {
      speakInstruction(instruction);
    }, 500);

    return () => clearTimeout(timer);
  }, [gameState, isVoiceEnabled]); // Removed currentLevel and sequenceLength from dependencies

  const handleReplayInstruction = () => {
    // Force stop current speech and replay
    window.speechSynthesis?.cancel();
    isSpeakingRef.current = false;
    setIsPlaying(false);

    let instruction = "";
    switch (gameState) {
      case "waiting":
        instruction = instructions?.waiting;
        break;
      case "userTurn":
        instruction = instructions?.userTurn;
        break;
      case "levelComplete":
        instruction = instructions?.levelComplete;
        break;
      case "gameComplete":
        instruction = instructions?.gameComplete;
        break;
      default:
        instruction = instructions?.encouragement;
    }

    setTimeout(() => {
      speakInstruction(instruction);
    }, 100);
  };

  const handleStopSpeech = () => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
    setCurrentInstruction("");
    isSpeakingRef.current = false;
  };

  if (!isVoiceEnabled) return null;

  return (
    <div
      className={`bg-accent/10 border border-accent/20 rounded-xl p-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <Icon
              name={isPlaying ? "Volume2" : "VolumeX"}
              size={20}
              color="white"
            />
          </div>
          <div>
            <h4 className="font-semibold text-accent">Voice Assistant</h4>
            <p className="text-sm text-text-secondary">
              {isPlaying ? "Speaking instructions..." : "Ready to help"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isPlaying ? (
            <Button
              onClick={handleStopSpeech}
              className="flex items-center space-x-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
            >
              <Icon name="Square" size={16} />
              <span className="text-sm">Stop</span>
            </Button>
          ) : (
            <Button
              onClick={handleReplayInstruction}
              className="flex items-center space-x-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
            >
              <Icon name="RotateCcw" size={16} />
              <span className="text-sm">Replay</span>
            </Button>
          )}
        </div>
      </div>

      {/* Current Instruction Display */}
      {currentInstruction && (
        <div className="mt-4 p-3 bg-background/50 rounded-lg">
          <p className="text-sm text-text-primary italic">
            "{currentInstruction}"
          </p>
        </div>
      )}

      {/* Voice Status Indicator */}
      <div className="mt-3 flex items-center space-x-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isPlaying ? "bg-success animate-pulse" : "bg-muted"
          }`}
        />
        <span className="text-xs text-text-secondary">
          {isPlaying ? "Voice assistant is speaking" : "Voice assistant ready"}
        </span>
      </div>
    </div>
  );
};

export default VoiceInstructions;
