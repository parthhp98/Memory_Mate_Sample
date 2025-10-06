import React from "react";
import Button from "../../../components/ui/button";

const MultipleChoiceAnswers = ({
  options = [],
  onAnswerSelect = () => {},
  selectedAnswer = null,
  isProcessing = false,
  showResult = false,
  correctAnswer = "",
  className = "",
}) => {
  const getButtonVariant = (option) => {
    if (!showResult) {
      return selectedAnswer === option ? "default" : "outline";
    }

    if (option === correctAnswer) {
      return "success";
    } else if (selectedAnswer === option && option !== correctAnswer) {
      return "destructive";
    }
    return "outline";
  };

  const getButtonIcon = (option) => {
    if (!showResult) return null;

    if (option === correctAnswer) {
      return "CheckCircle";
    } else if (selectedAnswer === option && option !== correctAnswer) {
      return "XCircle";
    }
    return null;
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg shadow-soft p-6 ${className}`}
    >
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold text-card-foreground mb-2">
          Which word did you see?
        </h3>
        <p className="text-sm text-text-secondary">
          Select the word that was displayed above
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options?.map((option, index) => (
          <Button
            key={index}
            variant={getButtonVariant(option)}
            size="xl"
            onClick={() =>
              !isProcessing && !showResult && onAnswerSelect(option)
            }
            disabled={isProcessing || showResult}
            iconName={getButtonIcon(option)}
            iconPosition="right"
            className="h-20 text-lg font-medium justify-center"
            fullWidth
          >
            {option?.toUpperCase()}
          </Button>
        ))}
      </div>
      {showResult && (
        <div className="mt-6 p-4 bg-muted rounded-lg text-center">
          {selectedAnswer === correctAnswer ? (
            <div className="text-success">
              <p className="font-medium">Correct!</p>
              <p className="text-sm mt-1">Great job identifying the word.</p>
            </div>
          ) : (
            <div className="text-destructive">
              <p className="font-medium">Not quite right</p>
              <p className="text-sm mt-1">
                The correct answer was "{correctAnswer?.toUpperCase()}"
              </p>
            </div>
          )}
        </div>
      )}
      {isProcessing && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-text-secondary">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Processing your answer...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleChoiceAnswers;
