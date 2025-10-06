import React from "react";

const WordDisplay = ({
  word = "",
  level = 1,
  questionNumber = 1,
  totalQuestions = 5,
  className = "",
}) => {
  return (
    <div
      className={`bg-card border border-border rounded-lg shadow-soft p-8 text-center ${className}`}
    >
      {/* Level and Progress Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{level}</span>
          </div>
          <span className="text-sm font-medium text-text-secondary">
            Level {level}
          </span>
        </div>
        <div className="text-sm text-text-secondary">
          Question {questionNumber} of {totalQuestions}
        </div>
      </div>
      {/* Word Display */}
      <div className="py-12">
        <div className="mb-4">
          <span className="text-lg text-text-secondary font-medium">
            Remember this word:
          </span>
        </div>
        <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-8 mb-6">
          <h2 className="text-6xl lg:text-7xl font-bold text-primary tracking-wide">
            {word?.toUpperCase()}
          </h2>
        </div>
        <p className="text-base text-text-secondary max-w-md mx-auto leading-relaxed">
          Study this word carefully. You'll be asked to identify it from
          multiple choices in a moment.
        </p>
      </div>
      {/* Progress Bar */}
      <div className="mt-8">
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-text-secondary">
          <span>Progress</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
      </div>
    </div>
  );
};

export default WordDisplay;
