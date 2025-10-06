import React from "react";
import Icon from "../../../components/AppIcon";

const GameHeader = ({
  currentLevel,
  totalLevels,
  sequenceLength,
  score,
  className = "",
}) => {
  const progressPercentage = (currentLevel / totalLevels) * 100;

  return (
    <div
      className={`bg-card border border-border rounded-xl p-6 shadow-soft ${className}`}
    >
      {/* Game Title */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <Icon name="Brain" size={24} color="white" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-card-foreground">
            Memory Pattern Game
          </h1>
          <p className="text-text-secondary">
            Test your memory with colored sequences
          </p>
        </div>
      </div>

      {/* Progress and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Level Progress */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Target" size={20} className="text-primary" />
            <span className="text-lg font-semibold text-card-foreground">
              Level {currentLevel}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 mb-2">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-text-secondary">
            {currentLevel} of {totalLevels} levels
          </p>
        </div>

        {/* Sequence Length */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="List" size={20} className="text-accent" />
            <span className="text-lg font-semibold text-card-foreground">
              Sequence
            </span>
          </div>
          <div className="text-3xl font-bold text-accent mb-1">
            {sequenceLength}
          </div>
          <p className="text-sm text-text-secondary">buttons to remember</p>
        </div>

        {/* Current Score */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Award" size={20} className="text-success" />
            <span className="text-lg font-semibold text-card-foreground">
              Score
            </span>
          </div>
          <div className="text-3xl font-bold text-success mb-1">{score}</div>
          <p className="text-sm text-text-secondary">points earned</p>
        </div>
      </div>

      {/* Level Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {Array.from({ length: totalLevels }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index + 1 < currentLevel
                ? "bg-success"
                : index + 1 === currentLevel
                ? "bg-primary animate-pulse"
                : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default GameHeader;
