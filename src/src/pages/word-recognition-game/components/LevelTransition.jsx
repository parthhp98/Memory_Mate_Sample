import React, { useEffect, useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/button";

const LevelTransition = ({
  currentLevel = 1,
  nextLevel = 2,
  score = 0,
  totalQuestions = 5,
  isVisible = false,
  onContinue = () => {},
  isVoiceEnabled = false,
  className = "",
}) => {
  const [countdown, setCountdown] = useState(5);
  const [autoAdvance, setAutoAdvance] = useState(true);

  useEffect(() => {
    if (!isVisible) return;

    let interval = null;
    if (autoAdvance && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            onContinue();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVisible, countdown, autoAdvance, onContinue]);

  useEffect(() => {
    if (isVisible) {
      setCountdown(5);
    }
  }, [isVisible]);

  const handleContinueNow = () => {
    setAutoAdvance(false);
    onContinue();
  };

  const handlePauseAutoAdvance = () => {
    setAutoAdvance(false);
  };

  const accuracy =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return "Excellent work!";
    if (accuracy >= 75) return "Great job!";
    if (accuracy >= 60) return "Good effort!";
    return "Keep trying your best!";
  };

  const getPerformanceIcon = () => {
    if (accuracy >= 90) return "Trophy";
    if (accuracy >= 75) return "Star";
    if (accuracy >= 60) return "ThumbsUp";
    return "Heart";
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${className}`}
    >
      <div className="bg-card border border-border rounded-xl shadow-soft max-w-md w-full p-8 text-center">
        {/* Level Completion Icon */}
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircle" size={32} color="white" />
        </div>

        {/* Level Complete Message */}
        <h2 className="text-2xl font-bold text-card-foreground mb-2">
          Level {currentLevel} Complete!
        </h2>

        <p className="text-text-secondary mb-6">{getPerformanceMessage()}</p>

        {/* Performance Stats */}
        <div className="bg-surface border border-border rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{score}</div>
              <div className="text-xs text-text-secondary">Correct Answers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{accuracy}%</div>
              <div className="text-xs text-text-secondary">Accuracy</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center space-x-2">
            <Icon
              name={getPerformanceIcon()}
              size={16}
              className="text-success"
            />
            <span className="text-sm text-success font-medium">
              {getPerformanceMessage()}
            </span>
          </div>
        </div>

        {/* Next Level Preview */}
        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h3 className="font-semibold text-primary mb-2">
            Next: Level {nextLevel}
          </h3>
          <p className="text-sm text-text-secondary">
            {nextLevel <= 5
              ? `Get ready for more challenging words and patterns.`
              : `Preparing your comprehensive assessment report.`}
          </p>
        </div>

        {/* Auto-advance Countdown */}
        {autoAdvance && countdown > 0 && (
          <div className="mb-6 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">
                Auto-advancing in {countdown} seconds
              </span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="default"
            size="lg"
            onClick={handleContinueNow}
            iconName="ArrowRight"
            iconPosition="right"
            fullWidth
          >
            {nextLevel <= 5 ? `Continue to Level ${nextLevel}` : "View Results"}
          </Button>

          {autoAdvance && (
            <Button
              variant="outline"
              size="default"
              onClick={handlePauseAutoAdvance}
              iconName="Pause"
              iconPosition="left"
              fullWidth
            >
              Take a Break
            </Button>
          )}
        </div>

        {/* Voice Feedback */}
        {isVoiceEnabled && (
          <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Volume2" size={14} className="text-accent" />
              <span className="text-xs text-accent">
                Voice feedback: Level completed successfully
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelTransition;
