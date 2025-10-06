import React from "react";
import Icon from "../../../components/AppIcon";

const GameProgress = ({
  currentLevel = 1,
  totalLevels = 5,
  currentQuestion = 1,
  totalQuestions = 5,
  score = 0,
  timeElapsed = 0,
  className = "",
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, "0")}`;
  };

  const progressPercentage =
    (((currentLevel - 1) * totalQuestions + currentQuestion) /
      (totalLevels * totalQuestions)) *
    100;

  return (
    <div
      className={`bg-card border border-border rounded-lg shadow-soft p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          Game Progress
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            {formatTime(timeElapsed)}
          </span>
        </div>
      </div>
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-card-foreground">
            Overall Progress
          </span>
          <span className="text-sm text-text-secondary">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      {/* Level Progress */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-surface rounded-lg">
          <div className="text-2xl font-bold text-primary">{currentLevel}</div>
          <div className="text-xs text-text-secondary">Current Level</div>
        </div>
        <div className="text-center p-3 bg-surface rounded-lg">
          <div className="text-2xl font-bold text-accent">{score}</div>
          <div className="text-xs text-text-secondary">Correct Answers</div>
        </div>
        <div className="text-center p-3 bg-surface rounded-lg">
          <div className="text-2xl font-bold text-secondary">
            {currentQuestion}
          </div>
          <div className="text-xs text-text-secondary">Question</div>
        </div>
      </div>
      {/* Level Indicators */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-card-foreground">Levels</h4>
        <div className="flex space-x-2">
          {[...Array(totalLevels)]?.map((_, index) => {
            const level = index + 1;
            const isCompleted = level < currentLevel;
            const isCurrent = level === currentLevel;

            return (
              <div
                key={level}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200 ${
                  isCompleted
                    ? "bg-success text-white"
                    : isCurrent
                    ? "bg-primary text-white"
                    : "bg-muted text-text-secondary"
                }`}
              >
                {isCompleted ? (
                  <Icon name="Check" size={12} color="white" />
                ) : (
                  level
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Performance Indicator */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="TrendingUp" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Performance</span>
        </div>
        <p className="text-xs text-text-secondary">
          {score > 0
            ? `You're doing great! ${Math.round(
                (score /
                  ((currentLevel - 1) * totalQuestions + currentQuestion - 1)) *
                  100
              )}% accuracy so far.`
            : "Take your time and focus on each word carefully."}
        </p>
      </div>
    </div>
  );
};

export default GameProgress;
