import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import ChatbotSidebar from "../../components/ui/ChatbotSidebar";
import GameHeader from "./components/GameHeader";
import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import GameFeedback from "./components/GameFeedback";
import VoiceInstructions from "./components/VoiceInstructions";

const MemoryPatternGame = () => {
  const navigate = useNavigate();

  // Game State
  const [gameState, setGameState] = useState("waiting"); // waiting, playing, showingSequence, userTurn, levelComplete, gameComplete
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentSequence, setCurrentSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [score, setScore] = useState(0);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [canReplay, setCanReplay] = useState(true);
  const [replayCount, setReplayCount] = useState(0);

  // UI State
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
    visible: false,
  });

  // Assessment Data Capture
  const [assessmentData, setAssessmentData] = useState({
    startTime: null,
    levelData: [],
    totalErrors: 0,
    totalHesitations: 0,
    responsePatterns: [],
  });

  const TOTAL_LEVELS = 6;
  const BASE_SEQUENCE_LENGTH = 3;

  // Initialize game
  useEffect(() => {
    setAssessmentData((prev) => ({
      ...prev,
      startTime: new Date()?.toISOString(),
    }));
  }, []);

  // Generate random sequence for current level
  const generateSequence = (length) => {
    const sequence = [];
    for (let i = 0; i < length; i++) {
      sequence?.push(Math.floor(Math.random() * 6));
    }
    return sequence;
  };

  // Start game
  const handleStartGame = () => {
    const sequence = generateSequence(BASE_SEQUENCE_LENGTH + currentLevel - 1);
    setCurrentSequence(sequence);
    setUserSequence([]);
    setGameState("playing");
    showSequence();
  };

  // Show sequence to user
  const showSequence = () => {
    setIsShowingSequence(true);
    setGameState("showingSequence");

    const sequenceTime = (BASE_SEQUENCE_LENGTH + currentLevel - 1) * 800 + 1000;
    setTimeout(() => {
      setIsShowingSequence(false);
      setGameState("userTurn");
    }, sequenceTime);
  };

  // Handle button press
  const handleButtonPress = (colorId) => {
    if (isShowingSequence) return;

    const newUserSequence = [...userSequence, colorId];
    setUserSequence(newUserSequence);

    // Record response data
    const responseTime = Date.now();
    const isCorrect = colorId === currentSequence?.[userSequence?.length];

    setAssessmentData((prev) => ({
      ...prev,
      responsePatterns: [
        ...prev?.responsePatterns,
        {
          level: currentLevel,
          position: userSequence?.length,
          expected: currentSequence?.[userSequence?.length],
          actual: colorId,
          correct: isCorrect,
          timestamp: responseTime,
          hesitationTime: 0, // Would be calculated from actual timing
        },
      ],
    }));

    // Check if sequence is complete
    if (newUserSequence?.length === currentSequence?.length) {
      checkSequence(newUserSequence);
    } else if (!isCorrect) {
      // Handle incorrect button press
      handleIncorrectPress();
    }
  };

  // Check if user sequence matches
  const checkSequence = (userSeq) => {
    const isCorrect = userSeq?.every(
      (color, index) => color === currentSequence?.[index]
    );

    if (isCorrect) {
      handleLevelComplete();
    } else {
      handleIncorrectSequence();
    }
  };

  // Handle correct level completion
  const handleLevelComplete = () => {
    const levelScore = calculateLevelScore();
    setScore((prev) => prev + levelScore);
    setGameState("levelComplete");

    // Record level completion data
    setAssessmentData((prev) => ({
      ...prev,
      levelData: [
        ...prev?.levelData,
        {
          level: currentLevel,
          sequenceLength: currentSequence?.length,
          completed: true,
          attempts: 1,
          score: levelScore,
          replayUsed: replayCount > 0,
          completionTime: Date.now() - new Date(prev.startTime)?.getTime(),
        },
      ],
    }));

    showFeedback("success", "Perfect! Level completed successfully!");

    setTimeout(() => {
      if (currentLevel < TOTAL_LEVELS) {
        handleNextLevel();
      } else {
        handleGameComplete();
      }
    }, 2000);
  };

  // Handle incorrect sequence - Modified to continue without restart
  const handleIncorrectSequence = () => {
    setAssessmentData((prev) => ({
      ...prev,
      totalErrors: prev?.totalErrors + 1,
    }));

    showFeedback("info", "Let's continue to the next level.");

    setTimeout(() => {
      if (currentLevel < TOTAL_LEVELS) {
        handleNextLevel();
      } else {
        handleGameComplete();
      }
    }, 2000);
  };

  // Handle incorrect button press - Modified to continue gracefully
  const handleIncorrectPress = () => {
    setAssessmentData((prev) => ({
      ...prev,
      totalErrors: prev?.totalErrors + 1,
    }));
    // Continue with the game, don't interrupt the flow
  };

  // Calculate level score
  const calculateLevelScore = () => {
    const baseScore = currentLevel * 100;
    const replayPenalty = replayCount * 20;
    return Math.max(baseScore - replayPenalty, 50);
  };

  // Handle next level
  const handleNextLevel = () => {
    setCurrentLevel((prev) => prev + 1);
    setUserSequence([]);
    setReplayCount(0);
    setCanReplay(true);
    setGameState("waiting");

    setTimeout(() => {
      handleStartGame();
    }, 1000);
  };

  // Handle game completion
  const handleGameComplete = () => {
    setGameState("gameComplete");
    showFeedback("success", "Congratulations! Memory assessment complete!");

    // Save final assessment data
    const finalData = {
      ...assessmentData,
      endTime: new Date()?.toISOString(),
      totalScore: score,
      levelsCompleted: currentLevel,
      overallAccuracy: calculateOverallAccuracy(),
    };

    // Store in localStorage for next component
    localStorage.setItem("memoryGameData", JSON.stringify(finalData));

    setTimeout(() => {
      navigate("/word-recognition-game");
    }, 3000);
  };

  // Calculate overall accuracy
  const calculateOverallAccuracy = () => {
    const totalResponses = assessmentData?.responsePatterns?.length;
    const correctResponses = assessmentData?.responsePatterns?.filter(
      (r) => r?.correct
    )?.length;
    return totalResponses > 0 ? (correctResponses / totalResponses) * 100 : 0;
  };

  // Handle sequence replay
  const handleReplaySequence = () => {
    if (replayCount >= 2) {
      showFeedback("warning", "Maximum replays reached for this level");
      return;
    }

    setReplayCount((prev) => prev + 1);
    setUserSequence([]);
    showSequence();

    if (replayCount >= 1) {
      setCanReplay(false);
    }
  };

  // Show feedback message
  const showFeedback = (type, message) => {
    setFeedback({ type, message, visible: true });
  };

  // Handle voice toggle
  const handleVoiceToggle = (enabled) => {
    setIsVoiceEnabled(enabled);
  };

  // Handle stage change
  const handleStageChange = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header
        currentStage="memory-game"
        voiceEnabled={isVoiceEnabled}
        onVoiceToggle={handleVoiceToggle}
        onStageChange={handleStageChange}
      />
      {/* Main Content */}
      <main className="flex-1 pt-32 pb-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-8">
          {/* Game Header */}
          <GameHeader
            currentLevel={currentLevel}
            totalLevels={TOTAL_LEVELS}
            sequenceLength={currentSequence?.length || BASE_SEQUENCE_LENGTH}
            score={score}
          />

          {/* Voice Instructions */}
          <VoiceInstructions
            isVoiceEnabled={isVoiceEnabled}
            gameState={gameState}
            currentLevel={currentLevel}
            sequenceLength={currentSequence?.length || BASE_SEQUENCE_LENGTH}
          />

          {/* Game Board */}
          {(gameState === "playing" ||
            gameState === "showingSequence" ||
            gameState === "userTurn") && (
            <GameBoard
              gameState={gameState}
              onButtonPress={handleButtonPress}
              isShowingSequence={isShowingSequence}
              currentSequence={currentSequence}
              userSequence={userSequence}
            />
          )}

          {/* Game Controls */}
          <GameControls
            gameState={gameState}
            onStartGame={handleStartGame}
            onNextLevel={handleNextLevel}
            onReplaySequence={handleReplaySequence}
            isShowingSequence={isShowingSequence}
            canReplay={canReplay}
          />

          {/* Game Complete Message */}
          {gameState === "gameComplete" && (
            <div className="text-center space-y-6 p-8 bg-success/10 border border-success/20 rounded-xl">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-success">
                  Assessment Complete!
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  You have successfully completed the Memory Pattern Game. Your
                  responses have been recorded and will be included in your
                  cognitive assessment report. You will now proceed to the Word
                  Recognition Game.
                </p>
                <div className="flex justify-center space-x-8 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {score}
                    </div>
                    <div className="text-text-secondary">Total Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {currentLevel}
                    </div>
                    <div className="text-text-secondary">Levels Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">
                      {Math.round(calculateOverallAccuracy())}%
                    </div>
                    <div className="text-text-secondary">Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Feedback Messages */}
      <GameFeedback
        feedbackType={feedback?.type}
        message={feedback?.message}
        isVisible={feedback?.visible}
        onClose={() => setFeedback((prev) => ({ ...prev, visible: false }))}
      />
      {/* Chatbot Sidebar */}
      <ChatbotSidebar
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        currentStage="memory-game"
      />
    </div>
  );
};

export default MemoryPatternGame;
