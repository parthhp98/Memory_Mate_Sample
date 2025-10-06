import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import ChatbotSidebar from "../../components/ui/ChatbotSidebar";

import TrustSignalFooter from "../../components/ui/TrustSignalFooter";
import WordDisplay from "./components/WordDisplay";
import MultipleChoiceAnswers from "./components/MultipleChoiceAnswers";
import GameProgress from "./components/GameProgress";
import VoiceInstructions from "./components/VoiceInstructions";
import GameTimer from "./components/GameTimer";
import LevelTransition from "./components/LevelTransition";
import Button from "components/ui/button";
import Icon from "../../components/AppIcon";

const WordRecognitionGame = () => {
  const navigate = useNavigate();

  // Game State
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [gamePhase, setGamePhase] = useState("display"); // 'display', 'question', 'result', 'transition'
  const [score, setScore] = useState(0);
  const [gameStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);

  // Current Question State
  const [currentWord, setCurrentWord] = useState("");
  const [currentOptions, setCurrentOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // UI State
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showLevelTransition, setShowLevelTransition] = useState(false);

  // Assessment Data Collection
  const [assessmentData, setAssessmentData] = useState({
    responses: [],
    responseTimes: [],
    errorPatterns: [],
    hesitationCount: 0,
    totalCorrect: 0,
    levelScores: {},
  });

  // Game Configuration
  const totalLevels = 5;
  const questionsPerLevel = 5;
  const displayTime = 3000; // 3 seconds to study word

  // Word pools by difficulty level
  const wordPools = {
    1: {
      words: ["CAT", "DOG", "SUN", "CAR", "BOOK", "TREE", "FISH", "BIRD"],
      distractors: ["BAT", "LOG", "RUN", "BAR", "COOK", "FREE", "DISH", "WORD"],
    },
    2: {
      words: [
        "HOUSE",
        "WATER",
        "PHONE",
        "CHAIR",
        "APPLE",
        "MUSIC",
        "LIGHT",
        "PAPER",
      ],
      distractors: [
        "MOUSE",
        "LATER",
        "STONE",
        "STAIR",
        "MAPLE",
        "MAGIC",
        "NIGHT",
        "TIGER",
      ],
    },
    3: {
      words: [
        "GARDEN",
        "WINDOW",
        "COFFEE",
        "BRIDGE",
        "FLOWER",
        "MARKET",
        "ORANGE",
        "SILVER",
      ],
      distractors: [
        "GOLDEN",
        "SHADOW",
        "TOFFEE",
        "FRIDGE",
        "SHOWER",
        "BASKET",
        "CHANGE",
        "WINTER",
      ],
    },
    4: {
      words: [
        "COMPUTER",
        "ELEPHANT",
        "MOUNTAIN",
        "HOSPITAL",
        "BIRTHDAY",
        "SANDWICH",
        "UMBRELLA",
        "KEYBOARD",
      ],
      distractors: [
        "COMMUTER",
        "RELEVANT",
        "FOUNTAIN",
        "FESTIVAL",
        "THURSDAY",
        "SANDWICH",
        "UMBRELLA",
        "SEABOARD",
      ],
    },
    5: {
      words: [
        "BUTTERFLY",
        "ADVENTURE",
        "CHOCOLATE",
        "TELEPHONE",
        "NEWSPAPER",
        "BASKETBALL",
        "RESTAURANT",
        "PHOTOGRAPH",
      ],
      distractors: [
        "FLUTTERBY",
        "ADVENTURE",
        "CHARLOTTE",
        "TELEGRAPH",
        "NEWSLETTER",
        "VOLLEYBALL",
        "ASTRONAUT",
        "PARAGRAPH",
      ],
    },
  };

  // Initialize first question
  useEffect(() => {
    generateQuestion();
  }, []);

  // Update total time elapsed
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTimeElapsed(Math.floor((Date.now() - gameStartTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStartTime]);

  const generateQuestion = () => {
    const levelWords = wordPools?.[currentLevel];
    if (!levelWords) return;

    const randomWord =
      levelWords?.words?.[
        Math.floor(Math.random() * levelWords?.words?.length)
      ];
    const distractors = levelWords?.distractors?.filter(
      (d) => d !== randomWord
    );

    // Create 4 options: 1 correct + 3 distractors
    const shuffledDistractors = distractors
      ?.sort(() => 0.5 - Math.random())
      ?.slice(0, 3);
    const options = [randomWord, ...shuffledDistractors]?.sort(
      () => 0.5 - Math.random()
    );

    setCurrentWord(randomWord);
    setCurrentOptions(options);
    setCorrectAnswer(randomWord);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsProcessing(false);
    setGamePhase("display");
    setQuestionStartTime(Date.now());

    // Auto-advance to question phase after display time
    setTimeout(() => {
      setGamePhase("question");
    }, displayTime);
  };

  const handleAnswerSelect = (answer) => {
    if (isProcessing) return;

    setSelectedAnswer(answer);
    setIsProcessing(true);

    const responseTime = Date.now() - questionStartTime;
    const isCorrect = answer === correctAnswer;

    // Record response data
    const responseData = {
      level: currentLevel,
      question: currentQuestion,
      word: currentWord,
      selectedAnswer: answer,
      correctAnswer: correctAnswer,
      isCorrect: isCorrect,
      responseTime: responseTime,
      timestamp: new Date()?.toISOString(),
    };

    setAssessmentData((prev) => ({
      ...prev,
      responses: [...prev?.responses, responseData],
      responseTimes: [...prev?.responseTimes, responseTime],
      totalCorrect: prev?.totalCorrect + (isCorrect ? 1 : 0),
      errorPatterns: isCorrect
        ? prev?.errorPatterns
        : [
            ...prev?.errorPatterns,
            {
              level: currentLevel,
              question: currentQuestion,
              expectedWord: correctAnswer,
              selectedWord: answer,
              confusionType: getConfusionType(correctAnswer, answer),
            },
          ],
    }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Move directly to next question without showing result
    setTimeout(() => {
      setIsProcessing(false);
      handleNextQuestion();
    }, 500);
  };

  const getConfusionType = (correct, selected) => {
    if (correct?.length !== selected?.length) return "length_difference";

    let differences = 0;
    for (let i = 0; i < correct?.length; i++) {
      if (correct?.[i] !== selected?.[i]) differences++;
    }

    if (differences === 1) return "single_letter";
    if (differences === 2) return "double_letter";
    return "multiple_differences";
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questionsPerLevel) {
      setCurrentQuestion((prev) => prev + 1);
      generateQuestion();
    } else {
      // Level completed
      const levelScore =
        score - (assessmentData?.levelScores?.[currentLevel - 1] || 0);
      setAssessmentData((prev) => ({
        ...prev,
        levelScores: {
          ...prev?.levelScores,
          [currentLevel]: levelScore,
        },
      }));

      if (currentLevel < totalLevels) {
        setShowLevelTransition(true);
      } else {
        // Game completed - navigate to results
        handleGameComplete();
      }
    }
  };

  const handleLevelTransition = () => {
    setShowLevelTransition(false);
    setCurrentLevel((prev) => prev + 1);
    setCurrentQuestion(1);
    generateQuestion();
  };

  const handleGameComplete = () => {
    // Store assessment data in localStorage for the report
    const finalAssessmentData = {
      ...assessmentData,
      gameType: "word-recognition",
      totalScore: score,
      totalQuestions: totalLevels * questionsPerLevel,
      accuracy: (score / (totalLevels * questionsPerLevel)) * 100,
      totalTimeElapsed: totalTimeElapsed,
      completedAt: new Date()?.toISOString(),
      levelBreakdown: assessmentData?.levelScores,
    };

    localStorage.setItem(
      "wordRecognitionResults",
      JSON.stringify(finalAssessmentData)
    );

    // Navigate to assessment report
    navigate("/assessment-report");
  };

  const handleVoiceCommand = (command) => {
    const lowerCommand = command?.toLowerCase();

    if (gamePhase === "question" && !showResult) {
      // Handle option selection by voice
      if (
        lowerCommand?.includes("option 1") ||
        lowerCommand?.includes("first")
      ) {
        handleAnswerSelect(currentOptions?.[0]);
      } else if (
        lowerCommand?.includes("option 2") ||
        lowerCommand?.includes("second")
      ) {
        handleAnswerSelect(currentOptions?.[1]);
      } else if (
        lowerCommand?.includes("option 3") ||
        lowerCommand?.includes("third")
      ) {
        handleAnswerSelect(currentOptions?.[2]);
      } else if (
        lowerCommand?.includes("option 4") ||
        lowerCommand?.includes("fourth")
      ) {
        handleAnswerSelect(currentOptions?.[3]);
      }
    }

    if (lowerCommand?.includes("help")) {
      setIsChatbotOpen(true);
    }
  };

  const handleTimeUpdate = (elapsed) => {
    // Track hesitation patterns (long pauses)
    if (gamePhase === "question" && elapsed > 10 && !selectedAnswer) {
      setAssessmentData((prev) => ({
        ...prev,
        hesitationCount: prev?.hesitationCount + 1,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header
        currentStage="word-game"
        voiceEnabled={isVoiceEnabled}
        onVoiceToggle={setIsVoiceEnabled}
        onStageChange={(path) => navigate(path)}
      />
      {/* Main Content */}
      <main className="flex-1 pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Game Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Type" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">
                  Word Recognition Game
                </h1>
                <p className="text-text-secondary">
                  Test your word memory and recognition skills
                </p>
              </div>
            </div>
          </div>

          {/* Game Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Progress & Voice */}
            <div className="lg:col-span-1 space-y-6">
              <GameProgress
                currentLevel={currentLevel}
                totalLevels={totalLevels}
                currentQuestion={currentQuestion}
                totalQuestions={questionsPerLevel}
                score={score}
                timeElapsed={totalTimeElapsed}
              />

              <GameTimer
                isActive={gamePhase === "question"}
                onTimeUpdate={handleTimeUpdate}
                timeLimit={null}
              />

              {isVoiceEnabled && (
                <VoiceInstructions
                  isVoiceEnabled={isVoiceEnabled}
                  currentWord={currentWord}
                  options={currentOptions}
                  gamePhase={gamePhase}
                  gameState={gamePhase}
                  currentLevel={currentLevel}
                  sequenceLength={currentOptions?.length}
                  onVoiceCommand={handleVoiceCommand}
                />
              )}
            </div>

            {/* Main Game Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Word Display or Question */}
              {gamePhase === "display" && (
                <WordDisplay
                  word={currentWord}
                  level={currentLevel}
                  questionNumber={currentQuestion}
                  totalQuestions={questionsPerLevel}
                />
              )}

              {gamePhase === "question" && (
                <div className="space-y-6">
                  {/* Question Header */}
                  <div className="bg-card border border-border rounded-lg shadow-soft p-6 text-center">
                    <h2 className="text-2xl font-semibold text-card-foreground mb-2">
                      Level {currentLevel} - Question {currentQuestion}
                    </h2>
                    <p className="text-text-secondary">
                      Which word did you see displayed above?
                    </p>
                  </div>

                  {/* Multiple Choice Answers */}
                  <MultipleChoiceAnswers
                    options={currentOptions}
                    onAnswerSelect={handleAnswerSelect}
                    selectedAnswer={selectedAnswer}
                    isProcessing={isProcessing}
                    showResult={false}
                    correctAnswer={correctAnswer}
                  />
                </div>
              )}

              {/* Emergency Exit */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => navigate("/assessment-report")}
                  iconName="AlertCircle"
                  iconPosition="left"
                  className="text-sm"
                >
                  Need Help? Exit to Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Level Transition Modal */}
      <LevelTransition
        currentLevel={currentLevel}
        nextLevel={currentLevel + 1}
        score={score}
        totalQuestions={currentQuestion * questionsPerLevel}
        isVisible={showLevelTransition}
        onContinue={handleLevelTransition}
        isVoiceEnabled={isVoiceEnabled}
      />
      {/* Chatbot Sidebar */}
      <ChatbotSidebar
        isOpen={isChatbotOpen}
        onToggle={setIsChatbotOpen}
        currentStage="word-game"
      />
      {/* Footer */}
      <TrustSignalFooter />
    </div>
  );
};

export default WordRecognitionGame;
